import { useState, useEffect, useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { errorMessage, successMessage } from "../../../../core/utils/message";
import { deleteNews } from "../../../../core/services/newsServices";
import { dashContext } from './../../../context/dashContext';


const DeleteNewsDialog = ({ showDialog, closeDialog, singleNews }) => {

const context = useContext(dashContext);
const {setFetchNews} = context;

  const [singleNewsId, setSingleNewsId] = useState();

  useEffect(() => {
    setSingleNewsId(singleNews.id);

    return () => {
      setSingleNewsId();
    };
  }, [singleNews]);

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const { status } = await deleteNews(singleNewsId);
      if (status === 201) {
        setFetchNews(true);
        successMessage("   خبر با موفقیت حذف شد ");
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
          <h3 style={{ fontSize: "2rem" }}>پاک کردن خبر {singleNews.title}</h3>
          <hr />
          <p> مطمئن هستی می خوای خبر {singleNews.title} رو پاک کنی؟</p>
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

export default DeleteNewsDialog;
