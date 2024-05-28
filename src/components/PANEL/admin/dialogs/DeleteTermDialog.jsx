import { useState, useEffect, useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { errorMessage, successMessage } from "../../../../core/utils/message";
import { deleteTerm } from "../../../../core/services/termServices";
import { dashContext } from './../../../context/dashContext';


const DeleteTermDialog = ({ showDialog, closeDialog, term }) => {
  const context = useContext(dashContext);
 const {setFetchTerm} = context

  const [termId, setTermId] = useState();

  useEffect(() => {
    setTermId(term.id);

    return () => {
      setTermId();
    };
  }, [term]);

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const { status, data } = await deleteTerm(termId);

      if (status === 201) {
        setFetchTerm(true);
        successMessage("   ترم با موفقیت حذف شد ");
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
          <h3 style={{ fontSize: "2rem" }}>پاک کردن ترم {term.title}</h3>
          <hr />
          <p> مطمئن هستی می خوای ترم {term.title} رو پاک کنی؟</p>
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

export default DeleteTermDialog;
