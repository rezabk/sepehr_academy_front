import { useEffect, useState, useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { errorMessage, successMessage } from "./../../../../core/utils/message";
import { updateStudent } from "../../../../core/services/studentsServices";

import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { isEmpty } from "lodash";
import { dashContext } from './../../../context/dashContext';

const EditStudentDialog = ({ showDialog, closeDialog, student }) => {
  const context = useContext(dashContext);
  const { setFetchStudents, fetchStudents,setFetchUser} = context;

  const [studentId, setStudentId] = useState();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedDay, setSelectedDay] = useState(null);

  const birthDate = !isEmpty(selectedDay)
    ? selectedDay.year + "/" + selectedDay.month + "/" + selectedDay.day
    : null;

  useEffect(() => {
    setStudentId(student.id);
    setFullName(student.fullName);
    setEmail(student.email);
    setNationalId(student.nationalId);
    setPhoneNumber(student.phoneNumber);

    return () => {
      setStudentId();
      setFullName();
      setEmail();
      setNationalId();
      setPhoneNumber();
    };
  }, [student, fetchStudents == true]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const studentt = {
      fullName,
      email,
      birthDate: birthDate != null ? birthDate : student.birthDate,
      nationalId,
      phoneNumber,
    };

    try {
      const { status } = await updateStudent(studentId, studentt);
      if (status === 201) {
        setFetchStudents(true);
        setFetchUser(true);
        successMessage("دانش آموز با موفقیت ویرایش شد.");
        closeDialog();
      }
    } catch (ex) {
      errorMessage("مشکلی رخ داد");
      console.log(ex);
    }
  };

  const renderCustomInput = ({ ref }) => (
    <input
      id="birthDate-input"
      readOnly
      ref={ref} // necessary
      // style={{width:"120%"}}
      placeholder="تاریخ تولد"
      value={
        selectedDay
          ? `${selectedDay.day} / ${selectedDay.month} / ${selectedDay.year}`
          : ""
      }
      className="my-custom-input-class" // a styling class
    />
  );


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
          <form onSubmit={handleSubmit}>
            <div className="mx-5">
              <label for="register-name" className="form-label">
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                id="register-name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </div>

            <div className="mx-5 my-1">
              <label for="register-email" className="form-label">
                ایمیل
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="register-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
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
              <label for="register-nationalId" className="form-label">
                کدملی
              </label>
              <input
                type="text"
                name="nationalId"
                className="form-control"
                id="nationalId"
                value={nationalId}
                onChange={(e) => {
                  setNationalId(e.target.value);
                }}
              />
            </div>

            <div className="mx-5 my-1">
              <label for="register-phoneNumber" className="form-label">
                شماره موبایل
              </label>
              <input
                type="number"
                name="phoneNumber"
                className="form-control "
                id="register-phoneNumber"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success mx-5"
              style={{ margin: "1em" }}
            >
              ویرایش دانش آموز
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

export default EditStudentDialog;
