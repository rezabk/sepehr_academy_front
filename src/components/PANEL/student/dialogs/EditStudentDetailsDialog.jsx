import { useEffect, useState, useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { errorMessage, successMessage } from "./../../../../core/utils/message";

import { updateStudent } from "../../../../core/services/studentsServices";
import { isEmpty } from "lodash";
import { dashContext } from "./../../../context/dashContext";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";

const EditStudentDetailsDialog = ({ showDialog, closeDialog }) => {
 
 
  const context = useContext(dashContext);
  const { student,fetchUser,setFetchUser } = context;

  const [studentId, setStudentId] = useState();
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedDay, setSelectedDay] = useState(null);

  const birthDate = !isEmpty(selectedDay)
    ? selectedDay.year + "/" + selectedDay.month + "/" + selectedDay.day
    : null;

 
  useEffect(() => {
    setStudentId(!isEmpty(student) ? student.id : null);
    setFullName(!isEmpty(student) ? student.fullName : null);
    setNationalId(!isEmpty(student) ? student.nationalId : null);
    setAddress(!isEmpty(student) ? student.address : null);
    setPhoneNumber(!isEmpty(student) ? student.phoneNumber : null);

    return () => {
      setStudentId();
      setFullName();
      setNationalId();
      setAddress();
      setPhoneNumber();
    };
  }, [showDialog, closeDialog, fetchUser == true]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const student = {
      fullName,
      birthDate,
      address,
      nationalId,
      phoneNumber,
    };

    try {
      const { status, data } = await updateStudent(studentId, student);
      if (status === 201) {
        setFetchUser(true);
        successMessage("    اطلاعات شما با موفقیت ویرایش شد.");
        closeDialog();
      }
    } catch (ex) {
      errorMessage("مشکلی در ثبت نام پیش آمده.");
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

            <DatePicker
              value={selectedDay}
              onChange={setSelectedDay}
              inputPlaceholder=" تاریخ  تولد "
              renderInput={renderCustomInput}
              shouldHighlightWeekends
              locale="fa"
            />
            {/* 
            <div className="mx-5 my-1">
              <label for="register-birthday" className="form-label">
                تاریخ تولد
              </label>
              <input
                type="text"
                name="birthDate"
                className="form-control "
                id="register-birthday"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                }}
              />
            </div> */}
            <div className="mx-5 my-1">
              <label for="address" className="form-label ">
                {" "}
                آدرس
              </label>
              <input
                type="text"
                name="address"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>

            {/* 
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


                                }}
                            />
                        </div> */}

            <div className="mx-5 my-1">
              <label for="register-phoneNumber" className="form-label ">
                شماره موبایل
              </label>
              <input
                type="number"
                name="phoneNumber"
                className="form-control"
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
              ویرایش
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

export default EditStudentDetailsDialog;
