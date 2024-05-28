import { useEffect, useState, useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { errorMessage, successMessage } from "./../../../../core/utils/message";
import { updateTeacher } from "../../../../core/services/teachersServices";

import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { isEmpty } from "lodash";
import { postImage } from './../../../../core/services/uploadServices';
import { dashContext } from './../../../context/dashContext';

const EditTeacherDialog = ({ showDialog, closeDialog, teacher }) => {
  const context = useContext(dashContext);
  const { setFetchTeachers} = context;

  const [teacherId, setTeacherId] = useState();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedDay, setSelectedDay] = useState(null);

  const birthDate = !isEmpty(selectedDay)
    ? selectedDay.year + "/" + selectedDay.month + "/" + selectedDay.day
    : null;
console.log(teacher.birthDate)
  useEffect(() => {
    setTeacherId(teacher.id);
    setFullName(teacher.fullName);
    setAddress(teacher.address);
    setNationalId(teacher.nationalId);
    setPhoneNumber(teacher.phoneNumber);

    return () => {
      setTeacherId();
      setFullName();
      setAddress();
      setNationalId();
      setPhoneNumber();
    };
  }, [teacher]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = new FormData();
    data.append("image", event.target.image.files[0]);

    const Data = event.target.image.files[0] ? await postImage(data) : null;

    const teacherr = {
      fullName,
      birthDate: birthDate != null ? birthDate : teacher.birthDate,
      address,
      profile: Data != null ? Data.data.result : teacher.profile,
      nationalId,
      phoneNumber,
    };

    try {
      const { status } = await updateTeacher(teacherId, teacherr);
      if (status === 201) {
        setFetchTeachers(true);
        successMessage("معلم با موفقیت ویرایش شد.");
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

            <DatePicker
              value={selectedDay}
              onChange={setSelectedDay}
              inputPlaceholder=" تاریخ  تولد "
              renderInput={renderCustomInput}
              shouldHighlightWeekends
              locale="fa"
            />
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

            <div className="mx-5 my-1">
              <label for="register-nationalId" className="form-label">
                کدملی
              </label>
              <input
                type="number"
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
            <div className="mx-5 my-1">
              <input
                type="file"
                name="image"
                style={{ marginBottom: 3 }}
                className="form-control mb-2"
                aria-describedby="image"
                // onChange={onChangeHandler}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success mx-5"
              style={{ margin: "1em" }}
            >
              ویرایش معلم
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

export default EditTeacherDialog;
