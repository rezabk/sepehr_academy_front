import { useState, useRef, useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { errorMessage, successMessage } from "./../../../../core/utils/message";
import { registerEmployee } from "../../../../core/services/userService";
import SimpleReactValidator from "simple-react-validator";
import { isEmpty } from "lodash";

import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";

import { dashContext } from "./../../../context/dashContext";
const NewTeacherDialog = ({ showDialog, closeDialog }) => {
  const context = useContext(dashContext);
  const { setFetchTeachers } = context;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const birthDate = !isEmpty(selectedDay)
    ? selectedDay.year + "/" + selectedDay.month + "/" + selectedDay.day
    : null;

  const [, forceUpdate] = useState();

  const registerValidator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی میباشد",
        min: "کمتر از 8 کاراکتر نباید باشد",
        email: "ایمیل نوشته شده صحیح نمی باشد",
        max: "کد ملی باید 10 رقم باشد",
        numeric: "تنها اعداد مورد قبول است",
      },
      element: (message) => <div className="validator">{message}</div>,
    })
  );

  const reset = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setSelectedDay("");
    setAddress("");
    setNationalId("");
    setPhoneNumber("");
    closeDialog();
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const user = {
      fullName: firstname + " " + lastname,
      email,
      password,
      birthDate,
      address,
      nationalId,
      phoneNumber,
      role: "teacher",
    };

    try {
      if (registerValidator.current.allValid()) {
        const { status } = await registerEmployee(user);
        if (status === 201) {
          setFetchTeachers(true);
          successMessage("معلم با موفقیت ساخته شد.");
          reset();
        }
      } else {
        registerValidator.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      errorMessage("مشکلی در ثبت نام پیش آمده.");
      console.log(ex);
    }
  };

  return (
    <DialogOverlay
      isOpen={showDialog}
      onDismiss={closeDialog}
      style={{ background: "hsla(0, 100%, 100%, 0.9)" }}
    >
      <DialogContent
        style={{
          border: "solid 5px hsla(0, 0%, 0%, 0.5)",
          borderRadius: "10px",
          boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)",
        }}
      >
        <div className="inner form-layer">
          <form onSubmit={handleRegister}>
            <div className="mx-5">
              <input
                type="text"
                name="firstname"
                className="form-control"
                placeholder="نام"
                id="register-name"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                  registerValidator.current.showMessageFor("firstname");
                }}
              />
              {registerValidator.current.message(
                "firstname",
                firstname,
                "required"
              )}
            </div>

            <div className="mx-5 my-1">
              <input
                type="text"
                name="lastname"
                className="form-control"
                placeholder="نام خانوادگی"
                id="register-lastName"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                  registerValidator.current.showMessageFor("lastname");
                }}
              />
              {registerValidator.current.message(
                "lastname",
                lastname,
                "required"
              )}
            </div>

            <div className="mx-5 my-1">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="email"
                id="register-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  registerValidator.current.showMessageFor("email");
                }}
              />
              {registerValidator.current.message(
                "email",
                email,
                "required|email"
              )}
            </div>

            <div className="mx-5 my-1">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="پسوورد"
                id="register-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  registerValidator.current.showMessageFor("password");
                }}
              />
              {registerValidator.current.message(
                "password",
                password,
                "required|min:8"
              )}
            </div>

            <div style={{ marginRight: "6%" }}>
              <DatePicker
                value={selectedDay}
                onChange={setSelectedDay}
                inputPlaceholder=" تاریخ  تولد "
                shouldHighlightWeekends
                locale="fa"
              />
            </div>
            <div className="mx-5 my-1">
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="آدرس"
                id="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  registerValidator.current.showMessageFor("address");
                }}
              />
              {registerValidator.current.message(
                "address",
                address,
                "required"
              )}
            </div>

            <div className="mx-5 my-1">
              <input
                type="number"
                name="nationalId"
                className="form-control"
                placeholder="کد ملی"
                id="nationalId"
                value={nationalId}
                onChange={(e) => {
                  setNationalId(e.target.value);
                  registerValidator.current.showMessageFor("nationalId");
                }}
              />
              {registerValidator.current.message(
                "nationalId",
                nationalId,
                "required|max:10"
              )}
            </div>

            <div className="mx-5 my-1">
              <input
                type="number"
                name="phoneNumber"
                className="form-control"
                placeholder="شماره موبایل"
                id="register-phoneNumber"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  registerValidator.current.showMessageFor("phoneNumber");
                }}
              />
              {registerValidator.current.message(
                "phoneNumber",
                phoneNumber,
                "required"
              )}
            </div>
            <button
              type="submit"
              className="btn btn-success mx-5"
              style={{ margin: "1em" }}
            >
              ساخت معلم
            </button>
            <button
              className="btn btn-warning mr-5"
              style={{ margin: "1em" }}
              onClick={closeDialog}
            >
              انصراف
            </button>
          </form>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default NewTeacherDialog;
