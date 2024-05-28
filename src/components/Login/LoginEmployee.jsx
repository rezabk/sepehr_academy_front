import React, { useRef, useState } from "react";
import "./Login.css";
import Header from "../common/Header/Header";
import { Helmet } from "react-helmet";
import { isEmpty } from "lodash";
import { Lines } from "react-preloaders2";
import SimpleReactValidator from "simple-react-validator";
import { withRouter, Link, Redirect } from "react-router-dom";
import { successMessage } from "../../core/utils/message";
import ProgressBar from "@ramonak/react-progress-bar";
import { loginEmployee } from "./../../core/services/userService";

const LoginEmployee = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, forceUpdate] = useState();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const loginValidator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی میباشد",
        min: "کمتر از 8 کاراکتر نباید باشید",
        email: "ایمیل نوشته شده صحیح نمی باشد",
      },
      element: (message) => (
        <div style={{ color: "red", marginTop: "5px" }}>{message}</div>
      ),
    })
  );

  const resetStates = () => {
    setEmail("");
    setPassword("");
  };

  const handleLoginEmployee = async (event) => {
    event.preventDefault();
    const user = { email, password };
    try {
      if (loginValidator.current.allValid()) {
        setLoading(true);
        const { status, data } = await loginEmployee(user);
        if (status === 201) {
          successMessage("ورود موفقیت آمیز بود.");
          localStorage.setItem("token", data.result.accessToken);
          setLoading(false);
          history.replace("/");
          resetStates();
        }
      } else {
        loginValidator.current.showMessages();

        forceUpdate(1);
      }
    } catch (ex) {
      console.log(ex);
      setLoading(false);
    }
  };

  const userString = localStorage.getItem("employee");
  const employee = JSON.parse(userString);
  if (!isEmpty(employee)) return <Redirect to="/" />;

  return (
    <React.Fragment>
      <Header />
      <Helmet>
        <title>آموزشگاه سپهر | ورود معلم به سایت</title>
      </Helmet>

      <Lines
        time={1200}
        background="#ff1949"
        color="#ffffff"
        customLoading={loading}
      />

      <div className="container login-container ">
        <div className="row">
          <div className="col-md-6 col-sm-6 ">
            <img
              className="login-img mx-5"
              src={'https://sepehracademystorage.storage.iran.liara.space/218.jpg'}
            />
          </div>
          <div className="col-md-6 col-sm-6">
            <h2 className="login-title"> خوش آمدید</h2>
            <form className="mx-5" onSubmit={handleLoginEmployee}>
              <div className="mb-3">
                <label
                  for="exampleInputEmail1"
                  className="form-label login-email-text "
                >
                  ایمیل
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control login-email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    loginValidator.current.showMessageFor("email");
                  }}
                />
                {loginValidator.current.message(
                  "email",
                  email,
                  "required|email"
                )}
              </div>
              <div className="mb-3">
                <label
                  for="exampleInputPassword1"
                  className="form-label login-password-text"
                >
                  رمز عبور
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control login-password"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    loginValidator.current.showMessageFor("password");
                  }}
                />
                {loginValidator.current.message(
                  "password",
                  password,
                  "required|min:8"
                )}
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input remind-me"
                  id="exampleCheck1"
                />
                <label
                  className="form-check-label remind-me-text"
                  for="exampleCheck1"
                >
                  مرا به خاطر بسپار
                </label>
                <div className="forget-password">
                  <Link to="#">رمز عبور خود را فراموش کرده ام</Link>
                </div>
              </div>
              <button type="submit" className="btn login-button my-3">
                ورود
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(LoginEmployee);
