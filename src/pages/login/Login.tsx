import { zodResolver } from '@hookform/resolvers/zod';

import useId from '@mui/material/utils/useId';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';

import './login.scss';

import { useActionCreators, useAppSelector } from '../../store/hooks/hooks';

import { loginTC } from '../../store/slices/userReducer';

import { signInSchema, signInSchemaType } from '../../validate/signInSchema';

export const Login = () => {
  const {currentUser, loading, error} = useAppSelector(state => state.user);
   console.log(loading);

  const actions = useActionCreators({ loginTC });
  const id = useId();

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

  const onSubmit = async (data: signInSchemaType) => {
    await actions.loginTC(data);

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
          <button disabled={loading} type="submit">
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
