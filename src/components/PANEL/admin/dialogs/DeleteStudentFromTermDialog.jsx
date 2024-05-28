import { useState, useEffect, useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { errorMessage, successMessage } from "../../../../core/utils/message";
import { removeStudentFromTerm } from "../../../../core/services/termServices";
import { dashContext } from './../../../context/dashContext';

const DeleteStudentFromTermDialog = ({
  showDialog,
  closeDialog,
  student,
  term,
}) => {
  const context = useContext(dashContext);
  const { setFetchStudents } = context;

  const [termId, setTermId] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    setStudentId(student.id);
    setTermId(term.id);
    return () => {
      setStudentId();
      setTermId();
    };
  }, [term]);

  const handleDelete = async (event) => {
    event.preventDefault();

    const term = {
      termId,
    };
    try {
      const { status } = await removeStudentFromTerm(student.id, term);

      if (status === 201) {
        setFetchStudents(true);
        closeDialog();
        successMessage("   دانش آموز با موفقیت از ترم حذف شد ");
      
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
          <h3 style={{ fontSize: "2rem" }}>
            حذف {student.fullName} از ترم {term.title}
          </h3>
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

export default DeleteStudentFromTermDialog;
