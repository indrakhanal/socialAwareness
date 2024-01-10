import React, { ReactElement, useCallback } from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import FormikValidationError from '../../../components/React/FormikValidationError/FormikValidationError';
import Button from "../../../components/UI/Forms/Buttons";
import "../signup/signup.scss";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store/root-reducer";
import { useNavigate, Link } from "react-router-dom";
import toast from "../../../components/Notifier/Notifier";
import { userRegister } from '../../../store/modules/register/register';
import { addUserDetails } from "../../../store/modules/userDetails";


interface Props extends PropsFromRedux { }
export interface UserRegister {
  email: string;
  phone: string;
  password: string;
  password2: string;
}

function Signup(props: Props): ReactElement {
  const { userRegister } = props;

  const history = useNavigate();
  // const i18nextData = useSelector((state: RootState) => state.i18nextData, shallowEqual);

  const handleRegister = useCallback(
    async (userDetails: UserRegister) => {
      const registeres: any = await userRegister(userDetails);
      if (registeres?.data.message) {
        toast.success(registeres.data.message)
        history("/login");
      } else {
        const errorMessage = registeres?.message?.detail
        toast.error(errorMessage);
        // Configure(errorMessage, loginres?.status)
      }
    },
    [userRegister, history, props]
  );
  

  return (
    <div className="app bg-white">
      <div className="container">
        <div className="auth-wrapper">
          <SignupForm handleRegister={handleRegister} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  registerData: state.registerData,

});

const mapDispatchToProps = {
  userRegister: userRegister,
  addUserDetails: addUserDetails,
};


const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Signup)

interface SignupFormProps {
  handleRegister: (credentials: UserRegister) => void;
  /**Status indicating if login is initiating */
  // authorizing: boolean;
}


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const signupValidationSchema = Yup.object({
  email: Yup.mixed().nullable().required("This field is required"),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("This field is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .required("password is Required"),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password does not match')
    .required("This field is required"),
})


const SignupForm = ({ handleRegister }: SignupFormProps) => {

  const [passwordView, showPassword] = React.useState(false);
  const togglePassword = () => showPassword(!passwordView);

  const [initialValue, setInitialValue] = React.useState({
    email: "",
    phone: "",
    password: "",
    password2: "",
  });


  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched } = useFormik({
      initialValues: initialValue,
      validationSchema: signupValidationSchema,
      onSubmit: (values, { setSubmitting }) => {
        // let response;
        setSubmitting(false);
        handleRegister(values);
      }
    })  

  return (
    <div className='auth-signupbody'>
      <form className='' autoComplete='off' onSubmit={handleSubmit}>
        <p className=''>Plese Sign for your ABC System Portal</p>
        <div className='auth-signupform'>
          <div className='form-group align-vertical'>
            <label htmlFor="" className='mr-4 label'>
              Email
            </label>
            <input
              name='email'
              className='form-control'
              value={values.email}
              onChange={handleChange}
              required
            />
            <FormikValidationError name='email' errors={errors} touched={touched} />
          </div>
          <div className='form-group align-vertical'>
            <label htmlFor="" className='mr-4 label'>
              Phone
            </label>
            <input
              name='phone'
              className='form-control'
              value={values.phone}
              onChange={handleChange}
              required
            />
            <FormikValidationError name='phone' errors={errors} touched={touched} />
          </div>
          <div className='form-group align-vertical'>
            <label htmlFor="" className='mr-4 label'>
              Password
            </label>
            <input type="password"
              name='password'
              className='form-control'
              value={values.password}
              onChange={handleChange}
              required
            />
            <span
              className={`${passwordView ? "ic-view" : "ic-hidden"} text-coolGray600`}
              role="button"
              onClick={togglePassword}
            ></span>
            <FormikValidationError name='password' errors={errors} touched={touched} />
          </div>
          <div className='form-group align-vertical'>
            <label htmlFor="" className='mr-4 label'>
              Confirm Password
            </label>
            <input type="password"
              name='password2'
              className='form-control'
              value={values.password2}
              onChange={handleChange}
              required
            />
            <span
              className={`${passwordView ? "ic-view" : "ic-hidden"} text-coolGray600`}
              role="button"
              onClick={togglePassword}
            ></span>
            <FormikValidationError name='password2' errors={errors} touched={touched} />
          </div>
          <div className="auth-footer">
            <Button
              className="btn btn-outlined-primary"
              // text={t("login:title")}
              text={"Sign In"}
            // disabled={authorizing}
            // loading={authorizing}
            />
          </div>
        </div>
      </form>
      <div className="auth-signup">
          <p className="align-vertical">Already have an account? 
            <Link to="/login">Login</Link>
          </p>
      </div>
    </div>
  )
}