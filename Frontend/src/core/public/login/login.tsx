import FormikValidationError from "../../../components/React/FormikValidationError/FormikValidationError";

// import toast from "components/Notifier/Notifier";
import Button from "../../../components/UI/Forms/Buttons";
import { useFormik } from "formik";
import React, { ReactElement, useCallback, useState } from "react";
import { connect, ConnectedProps, shallowEqual, useSelector } from "react-redux";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../../store/modules/login/login";
import { addUserDetails } from "../../../store/modules/userDetails";
import { RootState } from "../../../store/root-reducer";
import { object as YupObject, string as YupString } from "yup";
import { useTranslation } from "react-i18next";
import '../login/login.scss';
// import {Configure} from '../../../components/Notifier/Notifier';
import toast from "../../../components/Notifier/Notifier";
// import {loginGoogle} from '../authSocial/googlelogin'
import TokenService from "../../../services/jwt-token/jwt-token";

import { useGoogleLogin } from '@react-oauth/google';






interface Props extends PropsFromRedux {}
export interface UserCredentials {
  email: string;
  password: string;
}

function Login(props: Props): ReactElement {
  const history = useNavigate(); 
  const { loginData, loginUser } = props;
  const i18nextData = useSelector((state: RootState) => state.i18nextData, shallowEqual);

  const handleLogin = useCallback(
    async (userDetails: UserCredentials) => {
      const loginres: any = await loginUser(userDetails);
      if (loginres?.data?.access) {
        const successMessage = "Logged In Successful"
        // Configure(successMessage, loginres?.status)
        toast.success(successMessage)
        props.addUserDetails(loginres.data);
        history("/home");
      } else {
        const errorMessage = loginres?.message?.detail 
        toast.error(errorMessage);
        // Configure(errorMessage, loginres?.status)
      }
    },
    [loginUser, history]
  );

 

  return (
    <div className="app bg-white">
      <div className="container">
        <div className="auth-wrapper">
          <LoginForm handleLogin={handleLogin} authorizing={loginData.isFetching} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  loginData: state.loginData,
});

const mapDispatchToProps = {
  loginUser: loginUser,
  // switchI18nLanguage: switchI18nLanguage,
  addUserDetails: addUserDetails,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Login);

interface LoginFormProps {
  handleLogin: (credentials: UserCredentials) => void;
  /**Status indicating if login is initiating */
  authorizing: boolean;
}
const LoginForm = ({ authorizing, handleLogin }: LoginFormProps) => {
  const { t } = useTranslation(["login", "register"]);

  const [passwordView, showPassword] = useState(false);
  const togglePassword = () => showPassword(!passwordView);
  const [initialValue] = useState({ email: "", password: "" });

  const loginValidationSchema = YupObject().shape({
    email: YupString().required("This Field id Required"),
    password: YupString().required("This Field id Required"),
  });

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValue,
    validationSchema: loginValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      handleLogin(values);
    },
  });

  const history = useNavigate(); 
  const handleGoogleLogin  = useGoogleLogin({
    onSuccess:(response) =>{
      if(response?.access_token){
        console.log(response, "test");
        TokenService.setToken({"access":response.access_token})
        const successMessage = "Logged In Successful"
        toast.success(successMessage)
        history("/home");
      }
      else{
        toast.error("Error While Login With Google")
      }
    }
  });

  
  const loginGoogle = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse, "token from google login"),
  });

  return (
    <div className="auth-body">
      <form className="" onSubmit={handleSubmit} autoComplete="off">
        {/* <h5 className="mb-2 font-bold">Water</h5> */}
        <p className="">ABC System Login Portal</p>

        <h6 className="mb-2 font-bold">CONFIGURATIONS</h6>

        <div className="auth-form">
          <div className="form-group align-vertical">
            <label htmlFor="" className="mr-4 label">
              username    
              {/* {t("login:input.email.title")} */}
            </label>
            <input
              className="form-control"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
              // style={{ marginLeft:"27px"}}
            />
            <FormikValidationError name="email" errors={errors} touched={touched} />
          </div>

          <div className="form-group align-vertical mt-4">
            <label htmlFor="" className="mr-4 label">
              Password
              {/* {t("login:input.password.title")} */}
            </label>

            <input
              className="form-control"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
            />

            <span
              className={`${passwordView ? "ic-view" : "ic-hidden"} text-coolGray600`}
              role="button"
              onClick={togglePassword}
            ></span>
            <FormikValidationError name="password" errors={errors} touched={touched} />
          </div>

          <div className="auth-footer">
            {/* <div className="flex-grow-1 des">
                    <span className="text-coolGray600">{t("login:dontHaveAnAccount.title")} </span>
                    <Link to="/register" className="text-blue">{t("register:title")}</Link>
                </div> */}
            <Button
              className="btn btn-outlined-primary"
              // text={t("login:title")}
              text={"Login"}
              disabled={authorizing}
              loading={authorizing}
            />
          </div>
        </div>
      </form>
      {/* <div className="auth-signup">
      <Button
      className="btn btn-outlined-primary"
      text={"Sign in with Google"}
      onClick={() => handleGoogleLogin()}>
      </Button>
      </div> */}
      <div className="auth-signup">
          <p className="align-vertical">Dont't have an account? 
            <Link to="/signup">Sign Up</Link>
          </p>
      </div>
    </div>
  );
};
