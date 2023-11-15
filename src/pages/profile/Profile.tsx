import { zodResolver } from '@hookform/resolvers/zod';

import { useId } from 'react';

import { useForm } from 'react-hook-form';

import './profile.scss';

import { userApi } from '../../api/userApi';

import { profileSelector, useAppSelector } from '../../store';

import { ProfileSchemaType, profileSchema } from '../../utils';

export const Profile = () => {
  const id = useId();
  const user = useAppSelector(profileSelector);
  //console.log(user);
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
  const typeOfImage = (data: string | FileList = watch('profilePhoto')) => {
    let image = '';
    if (typeof data === 'string') {
      image = data;
    }
    if (typeof data === 'object' && data[0] instanceof File) {
      const selectedFile = data[0];
      image = URL.createObjectURL(selectedFile);
    }
    return image;
  };
  const convertToBase64 = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = error => {
        reject(error);
      };
    });
  };


  const onSubmit = async (data: ProfileSchemaType) => {
    const formData = new FormData();
    if (data.profilePhoto instanceof FileList) {
      const file = await convertToBase64(data.profilePhoto[0]);
      formData.append('profilePhoto', file);
    } else {
      formData.append('profilePhoto', data.profilePhoto);
    }
    formData.append('username', data.username);
    formData.append('_id', data._id);
    formData.append('email', data.email);

    const val = Object.fromEntries(formData);
    const res = await userApi.updateUser(formData);
console.log(res);

  };
  return (
    <div className="main">
      <div className="profile">
        {/* <h1>Register</h1> */}
        <form autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
          <div className="formItem">
            <label className="label-img" htmlFor={`${id}-profilePhoto`}>
              <img src={typeOfImage()} alt="profile photo" />
            </label>
            <input
              accept="image/*"
              hidden
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
