import { zodResolver } from '@hookform/resolvers/zod';

import { useId } from 'react';

import { useForm } from 'react-hook-form';

import './profile.scss';

import { typeOfImage } from '../../components/hooks/typeOfImage';

import { loadingSelector, profileSelector, useActionCreators, useAppSelector } from '../../store';

import { updateUserImgTC, updateUserTC } from '../../store/slices/userReducer';

import { ProfileSchemaType, profileSchema } from '../../utils';

export const Profile = () => {
  const id = useId();
  const user = useAppSelector(profileSelector);
  const loading = useAppSelector(loadingSelector);
  const actions = useActionCreators({ updateUserImgTC, updateUserTC });
console.log(loading);

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

  const uploadImageToCloudinary = async (image: File) => {
    const data: UploadImageData = {
      file: image,
      upload_preset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      folder: 'Cloudinary-admin-users',
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return await actions.updateUserImgTC(formData);
  };
  //два варианта: либо на бэк base64 либо на бэк урл ,а фото на cloudinary
  const onSubmit = async (data: ProfileSchemaType) => {
    if (data.profilePhoto instanceof FileList) {
      const savedPhoto = await uploadImageToCloudinary(data.profilePhoto[0]);

      const updatedUser = { ...data, profilePhoto: savedPhoto.payload };
      await actions.updateUserTC(updatedUser);
    } else {
      await actions.updateUserTC(data);
    }
  };

  return (
    <div className="main">
      <div className="profile">
        {/* <h1>Register</h1> */}
        <form autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
          <div className="formItem">
            <label className="label-img" htmlFor={`${id}-profilePhoto`}>
              <img src={typeOfImage(watch('profilePhoto'))} alt="profile photo" />
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
            <button disabled={loading} type="submit">
              Update
            </button>
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
