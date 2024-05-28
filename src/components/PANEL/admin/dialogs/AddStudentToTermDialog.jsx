import { useState, useEffect, useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { errorMessage, successMessage } from "../../../../core/utils/message";
import {
  addStudentToTerm,
  removeStudentFromTerm,
} from "../../../../core/services/termServices";

import { isEmpty } from "lodash";
import { dashContext } from "./../../../context/dashContext";


const AddStudentToTermDialog = ({ showDialog, closeDialog, student, term }) => {
  

  const context = useContext(dashContext);

  const { studentsData,setFetchTerm } = context;

  const [studentId, setStudentId] = useState("");
  const [termId, setTermId] = useState("");



  useEffect(() => {
    setStudentId(student.id);
    setTermId(term.id);
    return () => {
      setStudentId();
      setTermId();
    };
  }, [term]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const term = {
      termId,
    };
    try {
      const { status } = await addStudentToTerm(studentId, term);

      if (status === 201) {
        setFetchTerm(true);
        successMessage("   دانشجو  با موفقیت به ترم اضافه شد ");
        closeDialog();
      }
    } catch (ex) {
      console.log(ex);
      errorMessage("مشکلی پیش آمده.");
    }
  };

  const handleDelete = async (event) => {
    const studentIdd = localStorage.getItem("studentId");
    const term = {
      termId,
    };
    try {
      const { status } = await removeStudentFromTerm(studentIdd, term);
      if (status === 201) {
        setFetchTerm(true);
        successMessage("   دانشجو  با موفقیت به از ترم حذف شد ");
        closeDialog();
        localStorage.removeItem("studentId");
      }
    } catch (ex) {
      console.log(ex);
      errorMessage("مشکلی پیش آمده.");
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
        {" "}
        <div>دانشجویان دوره : </div>
        {!isEmpty(term.studentDetails)
          ? term.studentDetails.map((student) => (
              <table className="table">
                <thead>
                  <td>نام و نام خانوادگی</td>
                  <td> ایمیل</td>

                  <td> حذف از ترم </td>
                </thead>
                <tbody>
                  <td>{student.fullName}</td>
                  <td>{student.email}</td>

                  <button
                    className="btn btn-danger"
                    style={{ height: "30px", lineHeight: "5px" }}
                    value={student._id}
                    onClick={(e) => {
                      localStorage.setItem("studentId", student.id);
                      handleDelete(student.id);
                    }}
                  >
                    حذف
                  </button>
                </tbody>
              </table>
            ))
          : "دانشجویی در این دوره ثبت نام نکرده است"}
        <select
          style={{ marginTop: "10px" }}
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => setStudentId(e.target.value)}
        >
          <option selected> انتخاب دانشجو</option>
          {studentsData.map((student) => (
            <option value={student.id}>{student.fullName}</option>
          ))}
        </select>
        <button
          className="btn btn-success "
          style={{ margin: "1em" }}
          onClick={handleSubmit}
        >
          اضافه کردن
        </button>
        <button
          className="btn btn-warning mr-5"
          style={{ margin: "1em" }}
          onClick={closeDialog}
        >
          انصراف
        </button>
      </DialogContent>
    </DialogOverlay>
  );
};

export default AddStudentToTermDialog;
