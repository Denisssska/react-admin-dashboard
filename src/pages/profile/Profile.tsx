import { zodResolver } from '@hookform/resolvers/zod';

import { useId } from 'react';

import { useForm } from 'react-hook-form';

import './profile.scss';

import { profileSelector, useAppSelector } from '../../store';

import { ProfileSchemaType, profileSchema } from '../../utils';

export const Profile = () => {
  const id = useId();
  const user = useAppSelector(profileSelector);
  console.log(user);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm<ProfileSchemaType>({
    mode: 'onTouched',
    shouldFocusError: true, //параметр определяет, следует ли устанавливать фокус на первое поле с ошибкой после отправки формы.
    resolver: zodResolver(profileSchema),
    defaultValues: {
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      profilePhoto: user.profilePhoto,
    },
  });
  const onSubmit = async (data: ProfileSchemaType) => {
    console.log(data);
  };
  return (
    <div className="main">
      <div className="profile">
        <img src={user.profilePhoto} alt="profile photo" />
        {/* <h1>Register</h1> */}
        <form autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
          <div className="formItem">
            <label htmlFor={`${id}-id`}>ID</label>
            <input readOnly={true} id={`${id}-_id`} type="text" placeholder="id" {...register('_id')} />
            {errors[`_id`] && (
              <p className="errorMessage" id={`${id}-_id`} aria-live="assertive">
                {String(errors._id.message)}
              </p>
            )}
          </div>
          <div className="formItem">
            <label htmlFor={`${id}-username`}>User name</label>
            <input id={`${id}-username`} type="text" placeholder="User name" {...register('username')} />
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
            <label htmlFor={`${id}-profilePhoto`}>Photo</label>
            <input
              id={`${id}-profilePhoto`}
              type="file"
              placeholder="profilePhoto"
              {...register('profilePhoto')}
            />
            {errors[`profilePhoto`] && (
              <p className="errorMessage" id={`${id}-profilePhoto`} aria-live="assertive">
                {String(errors.profilePhoto.message)}
              </p>
            )}
          </div>
          <div className="formItem">
            <button type="submit">Update</button>
          </div>
          <div className="formItem">
            <button className="signup" type="button">
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
