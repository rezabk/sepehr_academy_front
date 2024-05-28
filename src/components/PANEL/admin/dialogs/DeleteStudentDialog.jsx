import { useState, useEffect, useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { errorMessage, successMessage } from "../../../../core/utils/message";
import { deleteStudent } from "../../../../core/services/studentsServices";
import { dashContext } from './../../../context/dashContext';

const DeleteStudentDialog = ({ showDialog, closeDialog, student }) => {
  const context = useContext(dashContext);
  const { setFetchStudents } = context;

  const [studentId, setStudentId] = useState();

  useEffect(() => {
    setStudentId(student.id);

    return () => {
      setStudentId();
    };
  }, [student]);

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const { status } = await deleteStudent(studentId);

      if (status === 201) {
        setFetchStudents(true);
        successMessage("   دانش آموز با موفقیت حذف شد ");
        closeDialog();
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
        <div className="text-center">
          <h3 style={{ fontSize: "2rem" }}>پاک کردن معلم {student.fullName}</h3>
          <hr />
          <p> مطمئن هستی می خوای معلم {student.fullName} رو پاک کنی؟</p>
        </div>
        <button
          className="btn btn-danger "
          style={{ margin: "1em" }}
          onClick={handleDelete}
        >
          مطمئنم پاک کن
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

export default DeleteStudentDialog;
