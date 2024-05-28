import React, { useContext } from 'react';
import Header from "../common/Header/Header"
import { Lines } from 'react-preloaders2';
import { withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { context } from "./../context/context";
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";

import "./Register.css";

const Register = () => {


    const registerContext = useContext(context);

    const {
        firstname,
        setFirstname,
        lastname,
        setLastname,
        email,
        setEmail,
        password,
        setPassword,
        selectedDay,
        setSelectedDay,
        nationalId,
        setNationalId,
        phoneNumber,
        setPhoneNumber,
        handleRegister,
        registerValidator,
        loading
    } = registerContext;


    const renderCustomInput = ({ ref }) => (

        <input
            id="birthDate-input"
            readOnly
            ref={ref} // necessary
            placeholder="تاریخ تولد"
            value={selectedDay ? `${selectedDay.day} / ${selectedDay.month} / ${selectedDay.year}` : ''}
            className="my-custom-input-class" // a styling class
        />
    )


    return (
        <React.Fragment>

            <Header />
                    <Helmet>
                <title>آموزشگاه سپهر | عضویت در سایت </title>
            </Helmet>
            <Lines time={1200} background="#ff1949" color="#ffffff" customLoading={loading} />


            <div className="container register-container">

                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <img className="register-img mx-3" src={'https://sepehracademystorage.storage.iran.liara.space/logo1.png'} />

                    </div>
                    <div className="col-md-6 col-sm-6">
                        <h2 className="register-title ">یک قدم تا شروع یادگیری</h2>
                        <form onSubmit={e => handleRegister(e)}>


                            <div className="mx-5">
                                <label for="register-name" className="form-label register-input-label">نام</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    className="form-control register-name"
                                    id="register-name"
                                    value={firstname}
                                    onChange={e => {
                                        setFirstname(e.target.value);
                                        registerValidator.current.showMessageFor("firstname")
                                    }}
                                />
                                {registerValidator.current.message("firstname", firstname, "required")}
                            </div>

                            <div className="mx-5 my-1">
                                <label for="register-lastName" className="form-label register-input-label">نام خانوادگی</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    className="form-control register-lastName"
                                    id="register-lastName"
                                    value={lastname}
                                    onChange={e => {
                                        setLastname(e.target.value);
                                        registerValidator.current.showMessageFor("lastname")
                                    }}
                                />
                                {registerValidator.current.message("lastname", lastname, "required")}
                            </div>

                            <div className="mx-5 my-1">
                                <label for="register-email" className="form-label register-input-label">ایمیل</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control register-email"
                                    id="register-email"
                                    value={email}
                                    onChange={e => {
                                        setEmail(e.target.value);
                                        registerValidator.current.showMessageFor("email")
                                    }}
                                />
                                {registerValidator.current.message("email", email, "required|email")}
                            </div>

                            <div className="mx-5 my-1">
                                <label for="register-password" className="form-label register-input-label">رمز عبور</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control register-password"
                                    id="register-password"
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value);
                                        registerValidator.current.showMessageFor("password")
                                    }}
                                />
                                {registerValidator.current.message("password", password, "required|min:8")}
                            </div>


                            <DatePicker
                                value={selectedDay}
                                onChange={setSelectedDay}
                                inputPlaceholder=" تاریخ  تولد "
                                renderInput={renderCustomInput}
                                shouldHighlightWeekends
                                locale="fa"

                            />

                            {/* <div className="mx-5 my-1">
                                <label for="register-birthday" className="form-label register-input-label">تاریخ تولد</label>
                                <input
                                    type="text"
                                    name="birthDate"
                                    className="form-control register-birthday"
                                    id="register-birthday"
                                    value={birthDate}
                                    onChange={e => {
                                        setBirthDate(e.target.value);
                                        registerValidator.current.showMessageFor("birthDate")
                                    }}
                                />
                                {registerValidator.current.message("birthDate", birthDate, "required")}


                            </div> */}
                            <div className="mx-5 my-1">
                                <label for="register-nationalId" className="form-label register-input-label">کدملی</label>
                                <input
                                    type="number"
                                    name="nationalId"
                                    className="form-control register-nationalId"
                                    id="register-birthday"
                                    value={nationalId}
                                    onChange={e => {
                                        setNationalId(e.target.value);
                                        registerValidator.current.showMessageFor("nationalId");


                                    }}
                                />
                                {registerValidator.current.message("nationalId", nationalId, "required|max:10")}
                            </div>

                            <div className="mx-5 my-1">
                                <label for="register-phoneNumber" className="form-label register-input-label">شماره موبایل</label>
                                <input
                                    type="number"
                                    name="phoneNumber"
                                    className="form-control register-phoneNumber"
                                    id="register-phoneNumber"
                                    value={phoneNumber}
                                    onChange={e => {
                                        setPhoneNumber(e.target.value);
                                        registerValidator.current.showMessageFor("phoneNumber")

                                    }}
                                />
                                {registerValidator.current.message("phoneNumber", phoneNumber, "required")}

                            </div>
                            <button type="submit" className="register-button">ثبت نام</button>

                        </form>
                    </div>

                </div>

            </div>

        </React.Fragment>

    );
}

export default withRouter(Register);


