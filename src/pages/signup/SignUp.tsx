import { zodResolver } from '@hookform/resolvers/zod';

import useId from '@mui/material/utils/useId';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';

import { signupSchema, signupSchemaType } from '../../validate/signupSchema';

import '../login/login.scss';

import './signup.scss';

export const SignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const id = useId();
  const createUser = async (params: signupSchemaType) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`/auth/signup`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }
      return response;
    } catch (error) {
      throw error;
    }
  };
  const mutation = useMutation({
    mutationFn: createUser,
    onError: e => {
      console.log(e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentuser'] }).then(() => navigate('/login'));
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm<signupSchemaType>({
    mode: 'onTouched',
    shouldFocusError: true, //параметр определяет, следует ли устанавливать фокус на первое поле с ошибкой после отправки формы.
    resolver: zodResolver(signupSchema),
    defaultValues: {},
  });
  const onSubmit = (data: signupSchemaType) => {
    mutation.mutateAsync(data);
  };
  console.log(mutation.isPending);

  return (
    <div className="login">
      <h1>Register</h1>
      <form autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
        <div className="formItem">
          <label htmlFor={`${id}-username`}>User name</label>
          <input
            autoComplete="false"
            id={`${id}-username`}
            type="text"
            placeholder="User name"
            {...register('username')}
          />
          {errors[`username`] && (
            <p className="errorMessage" id={`${id}-username`} aria-live="assertive">
              {String(errors.username.message)}
            </p>
          )}
        </div>
        <div className="formItem">
          <label htmlFor={`${id}-email`}>Email</label>
          <input
            autoComplete="false"
            id={`${id}-email`}
            type="text"
            placeholder="Email"
            {...register('email')}
          />
          {errors[`email`] && (
            <p className="errorMessage" id={`${id}-email`} aria-live="assertive">
              {String(errors.email.message)}
            </p>
          )}
        </div>
        <div className="formItem">
          <label htmlFor={`${id}-password`}>Password</label>
          <input id={`${id}-password`} type="password" placeholder="password" {...register('password')} />
          {errors[`password`] && (
            <p className="errorMessage" id={`${id}-password`} aria-live="assertive">
              {String(errors.password.message)}
            </p>
          )}
        </div>
        <div className="formItem">
          <button disabled={mutation.isPending} type="submit">
            Submit
          </button>
        </div>
        <div className="formItem">
          <button type="button">continue with google</button>
          Have an account?
          <Link to={'/login'}>
            <button className="signup" type="button">
              login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
