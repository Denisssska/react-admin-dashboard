import { zodResolver } from '@hookform/resolvers/zod';

import useId from '@mui/material/utils/useId';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';

import { signInSchema, signInSchemaType } from '../../validate/signInSchema';

import './login.scss';
export const Login = () => {
  const id = useId();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm<signInSchemaType>({
    mode: 'onTouched',
    shouldFocusError: true, //параметр определяет, следует ли устанавливать фокус на первое поле с ошибкой после отправки формы.
    resolver: zodResolver(signInSchema),
    defaultValues: {},
  });
  const loginUser = async (params: signInSchemaType) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`/auth/signin`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }
      return data;
    } catch (e) {
      throw e;
    }
  };
  const mutation = useMutation({
    mutationFn: loginUser,
    onError: e => {
      console.log(e);
    },
    onSuccess: async data => {
      console.log(data);
      queryClient.setQueryData(['currentuser'], data);
      navigate('/');
    },
  });
  const onSubmit = (data: signInSchemaType) => {
    mutation.mutateAsync(data);
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
        <div className="formItem">
          <label htmlFor={`${id}-email`}>Email</label>
          <input id={`${id}-email`} type="email" placeholder="Email" {...register('email')} />
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
          Dont have an account?
          <Link to={'/signup'}>
            <button className="signup" type="button">
              Sign up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
