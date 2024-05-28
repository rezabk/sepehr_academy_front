import React, { useContext, useRef } from "react";
import "./Login.css";
import Header from "../common/Header/Header"
import { Helmet } from "react-helmet";
import { isEmpty } from 'lodash';
import { context } from "./../context/context";
import { Lines } from 'react-preloaders2';
import {
    BrowserRouter as Router,
    withRouter,
    Link,
    Redirect

} from "react-router-dom";




const Login = () => {



    const loginContext = useContext(context)
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        loginValidator,
        loading
    } = loginContext;


    const user = localStorage.getItem("user")

    if (!isEmpty(user == true)) return <Redirect to="/" />
    return (
        <React.Fragment>

            <Header />
                      <Helmet>
                <title>آموزشگاه سپهر | ورود به سایت</title>
            </Helmet>

            <Lines time={1200} background="#ff1949" color="#ffffff" customLoading={loading} />

            <div className="container login-container ">

                <div className="row">
                    <div className="col-md-6 col-sm-6 " >
                        <img className="login-img mx-3" src={'https://sepehracademystorage.storage.iran.liara.space/4905784.jpg'} />

                    </div>
                    <div className="col-md-6 col-sm-6">
                        <h2 className="login-title"> خوش آمدید</h2>
                        <form className="mx-5" onSubmit={e => handleLogin(e)}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label login-email-text ">ایمیل</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control login-email"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    value={email}
                                    onChange={e => {
                                        setEmail(e.target.value);
                                        loginValidator.current.showMessageFor("email")
                                    }}
                                />
                                {loginValidator.current.message("email", email, "required|email")}

                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label login-password-text">رمز عبور</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control login-password"
                                    id="exampleInputPassword1"
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value);
                                        loginValidator.current.showMessageFor("password")
                                    }} />
                                {loginValidator.current.message("password", password, "required|min:8")}
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input remind-me" id="exampleCheck1" />
                                <label className="form-check-label remind-me-text" for="exampleCheck1">مرا به خاطر بسپار</label>
                                <div className="forget-password">
                                    <Link to="#" >رمز عبور خود را فراموش کرده ام</Link>
                                </div>
                            </div>
                            <button type="submit" className="btn login-button my-3">ورود</button>
                        </form>
                    </div>

                </div>
            </div>

        </React.Fragment>
    );
}

export default withRouter(Login);

