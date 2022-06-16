import BreadcrumbComponent from 'renderer/components/Breadcrumb/components';
import CardComponent from 'renderer/components/Card/components';
import * as Yup from 'yup';
import imageService from 'renderer/services/imageService';
import { Fragment, useState } from 'react';
import { UpdateProfileFormik } from 'renderer/types/profile';
import LoadingComponent from 'renderer/components/Loading/components';
import profileService from 'renderer/services/profileService';
import toastify from 'renderer/helpers/toastify';
import { Image } from 'renderer/types/image';
import FormComponent from 'renderer/components/Form/components';
import { FormikHelpers } from 'formik';
import { errorHandler } from 'renderer/helpers/error';
import useAppSelector from 'renderer/hooks/useAppSelector';
import useAppDispatch from 'renderer/hooks/useAppDispatch';
import {
  selectProfileShow,
  selectProfileUpdate,
} from 'renderer/store/profile/selectors';
import {
  profileShowDataRequestAction,
  profileShowLoadingRequestAction,
  profileUpdateDataRequestAction,
  profileUpdateLoadingRequestAction,
} from 'renderer/store/profile/actions';
import ButtonComponent from 'renderer/components/Button/components';
import useOnceEffect from 'renderer/hooks/useOnceEffect';

type Props = {};

const ProfileComponent: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const profileShow = useAppSelector(selectProfileShow);
  const profileUpdate = useAppSelector(selectProfileUpdate);
  const [imageUpload, setImageUpload] = useState({ loading: false });

  const initialValues: UpdateProfileFormik = {
    first_name: profileShow.data.first_name || '',
    last_name: profileShow.data.last_name || '',
    email: profileShow.data.email || '',
    user_name: profileShow.data.user_name || '',
    password: '',
    password_confirmation: '',
    image: null,
  };

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required('The first name is required.')
      .max(20, 'The first name must not be greater than 20 characters.'),
    last_name: Yup.string()
      .required('The last name is required.')
      .max(20, 'The last name must not be greater than 20 characters.'),
    email: Yup.string().required('Email is required.'),
    user_name: Yup.string()
      .required('The user name is required.')
      .min(3, 'The user name must be at least 3 characters.')
      .max(20, 'The user name must not be greater than 20 characters.'),
    password: Yup.string()
      .min(6, 'The password must be at least 6 characters.')
      .max(66, 'The password must not be greater than 66 characters.'),
    password_confirmation: Yup.string().test(
      'passwords-match',
      'The password confirmation does not match.',
      function (value) {
        return this.parent.password === value;
      }
    ),
  });

  const onSubmit = (
    values: UpdateProfileFormik,
    formikHelpers: FormikHelpers<UpdateProfileFormik>
  ) => {
    new Promise<Image | null>((resolve, reject) => {
      if (!values.image) {
        return resolve(null);
      }
      setImageUpload({ loading: true });
      imageService
        .upload({
          image: values.image,
        })
        .then((response) => {
          return resolve(response.data.data);
        })
        .catch((error) => {
          return reject(error);
        })
        .finally(() => {
          setImageUpload({ loading: false });
        });
    })
      .then((result) => {
        dispatch(profileUpdateLoadingRequestAction(true));
        const payload = {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          user_name: values.user_name,
          ...(values.password && {
            password: values.password,
          }),
          ...(result && {
            avatar: result.image_name,
          }),
        };
        profileService
          .update(payload)
          .then((response) => {
            dispatch(profileUpdateDataRequestAction(response.data.data));
            toastify.success('Profile updated successfully');
          })
          .catch(
            errorHandler(undefined, (validationError) =>
              formikHelpers.setErrors(validationError.data.errors)
            )
          )
          .finally(() => {
            dispatch(profileUpdateLoadingRequestAction(false));
          });
      })
      .catch(
        errorHandler(undefined, (validationError) =>
          formikHelpers.setErrors(validationError.data.errors)
        )
      )
      .finally(() => {});
  };

  useOnceEffect(() => {
    dispatch(profileShowLoadingRequestAction(true));
    profileService
      .show()
      .then((response) => {
        dispatch(profileShowDataRequestAction(response.data.data));
      })
      .catch(errorHandler())
      .finally(() => {
        dispatch(profileShowLoadingRequestAction(false));
      });
  });

  return (
    <Fragment>
      <BreadcrumbComponent className="mb-4">Profile</BreadcrumbComponent>
      <div className="grid grid-cols-1 gap-4">
        <div className="col-span-1 w-full">
          <CardComponent title="Profile">
            {profileShow.loading ? (
              <LoadingComponent />
            ) : !Object.keys(profileShow.data).length ? (
              <div className="flex justify-center">Not found</div>
            ) : (
              <FormComponent<UpdateProfileFormik>
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
              >
                {(props) => (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <FormComponent.Input
                        id="first_name"
                        type="text"
                        label="First name"
                        placeholder="Enter first name"
                        error={props.errors.first_name}
                        touched={props.touched.first_name}
                        {...props.getFieldProps('first_name')}
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <FormComponent.Input
                        id="last_name"
                        type="text"
                        label="Last name"
                        placeholder="Enter last name"
                        error={props.errors.last_name}
                        touched={props.touched.last_name}
                        {...props.getFieldProps('last_name')}
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <FormComponent.Input
                        id="user_name"
                        type="text"
                        label="User name"
                        placeholder="Enter user name"
                        error={props.errors.user_name}
                        touched={props.touched.user_name}
                        autoComplete="username"
                        {...props.getFieldProps('user_name')}
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <FormComponent.Input
                        id="email"
                        type="text"
                        label="Email"
                        placeholder="Enter email"
                        error={props.errors.email}
                        touched={props.touched.email}
                        {...props.getFieldProps('email')}
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <FormComponent.Input
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Enter password"
                        error={props.errors.password}
                        touched={props.touched.password}
                        autoComplete="new-password"
                        {...props.getFieldProps('password')}
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <FormComponent.Input
                        id="password_confirmation"
                        type="password"
                        label="Password confirmation"
                        placeholder="Enter password confirmation"
                        error={props.errors.password_confirmation}
                        touched={props.touched.password_confirmation}
                        autoComplete="new-password"
                        {...props.getFieldProps('password_confirmation')}
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <FormComponent.Image
                        id="image"
                        label="Image"
                        error={props.errors.image}
                        touched={props.touched.image}
                        onChangeFile={props.setFieldValue}
                        onBlurFile={props.setFieldTouched}
                        imgUrl={profileShow.data.avatar_url}
                        {...props.getFieldProps('image')}
                      />
                    </div>
                    <div className="col-span-2 flex flex-row-reverse">
                      <ButtonComponent
                        type="submit"
                        loading={imageUpload.loading || profileUpdate.loading}
                        disabled={imageUpload.loading || profileUpdate.loading}
                      >
                        {imageUpload.loading
                          ? 'Uploading'
                          : profileUpdate.loading
                          ? 'Updating'
                          : 'Update'}
                      </ButtonComponent>
                    </div>
                  </div>
                )}
              </FormComponent>
            )}
          </CardComponent>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileComponent;
