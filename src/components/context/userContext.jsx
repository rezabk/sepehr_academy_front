import { useState, useRef } from "react";
import { context } from "./context";
import { withRouter } from "react-router";
import { registerUser, loginUser } from "./../../core/services/userService";
import { successMessage } from "./../../core/utils/message";
import SimpleReactValidator from "simple-react-validator";
import { isEmpty } from "lodash";

const UserContext = ({ children, history }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  const birthDate = !isEmpty(selectedDay)
    ? selectedDay.year + "/" + selectedDay.month + "/" + selectedDay.day
    : null;

  const [loading, setLoading] = useState(false);

  const [, forceUpdate] = useState();

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

  const resetStates = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setSelectedDay("");
    setNationalId("");
    setPhoneNumber("");
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const user = {
      fullName: firstname + " " + lastname,
      email,
      password,
      birthDate,
      nationalId,
      phoneNumber,
    };

    try {
      if (registerValidator.current.allValid()) {
        setLoading(true);
               const { status, data } = await registerUser(user);
        if (status === 201) {
          successMessage("کاربر با موفقیت ساخته شد.");

          setLoading(false);
                   history.replace("/login");
        }
      } else {
        registerValidator.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      setLoading(false);
          console.log(ex);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = { email, password };
    try {
      if (loginValidator.current.allValid()) {
        setLoading(true);
             const { status, data } = await loginUser(user);
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

  return (
    <context.Provider
      value={{
        firstname,
        setFirstname,
        lastname,
        setLastname,
        email,
        setEmail,
        password,
        setPassword,
        // birthDate,
        // setBirthDate,
        selectedDay,
        setSelectedDay,
        nationalId,
        setNationalId,
        phoneNumber,
        setPhoneNumber,
        handleLogin,
        // handleLoginEmployee,
        handleRegister,
        registerValidator,
        loginValidator,
        loading,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default withRouter(UserContext);
