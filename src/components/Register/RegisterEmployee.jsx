import React, { useRef, useState } from 'react';
import Header from "../common/Header/Header"
import { Lines } from 'react-preloaders2';
import { withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { isEmpty } from 'lodash'
import { registerEmployee } from './../../core/services/userService';
import { successMessage, errorMessage } from './../../core/utils/message';
import SimpleReactValidator from 'simple-react-validator';



import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";

import "./Register.css";

const RegisterEmployee = ({ history }) => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedDay, setSelectedDay] = useState(null);
    const birthDate =
        !isEmpty(selectedDay) ? selectedDay.year + "/" + selectedDay.month + "/" + selectedDay.day : null

    const [loading, setLoading] = useState(false);

    const [, forceUpdate] = useState();



    const registerValidator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "پر کردن این فیلد الزامی میباشد",
                min: "کمتر از 8 کاراکتر نباید باشد",
                email: "ایمیل نوشته شده صحیح نمی باشد",
                max: "کد ملی باید 10 رقم باشد",
                numeric: "تنها اعداد مورد قبول است"
            },
            element: message => <div className="validator" >{message}</div>
        }));
        
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
    



    const handleRegister = async event => {
        event.preventDefault();
        const user = {
            fullName: firstname + " " + lastname,
            email,
            password,
            birthDate,
            address,
            nationalId,
            phoneNumber,
            role: "teacher"
        };

        try {
            if (registerValidator.current.allValid()) {
                setLoading(true);
        
                const { status } = await registerEmployee(user);
                if (status === 201) {
                    successMessage("معلم با موفقیت ساخته شد.");

                    setLoading(false);
                
                    history.replace("/loginEmployee");

                }
            } else {
                registerValidator.current.showMessages();
                forceUpdate(1);
            }

        } catch (ex) {
            errorMessage("مشکلی در ثبت نام پیش آمده.");
            setLoading(false);
          
            console.log(ex);
        }
    };


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
                        <img className="register-img mx-3" src={'https://sepehracademystorage.storage.iran.liara.space/logo.jpg'} />

                    </div>
                    <div className="col-md-6 col-sm-6">
                        <h2 className="register-title ">معلم آموزشگاه سپهر باشید!    </h2>
                        <form onSubmit={handleRegister}>


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

                            <div className="mx-5 my-1">
                                <label for="address" className="form-label register-input-label"> آدرس</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control register-birthday"
                                    id="address"
                                    value={address}
                                    onChange={e => {
                                        setAddress(e.target.value);
                                        registerValidator.current.showMessageFor("address")
                                    }}
                                />
                                {registerValidator.current.message("address", address, "required")}
                            </div>


                            <div className="mx-5 my-1">
                                <label for="register-nationalId" className="form-label register-input-label">کدملی</label>
                                <input
                                    type="number"
                                    name="nationalId"
                                    className="form-control register-nationalId"
                                    id="nationalId"
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

        </React.Fragment >

    );
}

export default withRouter(RegisterEmployee);


