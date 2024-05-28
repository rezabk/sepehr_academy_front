import { useState } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { successMessage, errorMessage } from "../../../../core/utils/message";
import { answerComment } from "../../../../core/services/commentServices";

const AnswerCommentDialog = ({ showDialog, closeDialog }) => {
  const [answer, setAnswer] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const comment = {
      id: localStorage.getItem("commentId"),
      answer,
    };

    try {
      const { status } = await answerComment(comment);

      if (status === 200) {
        successMessage("       کامنت پاسخ داده شد");
        localStorage.removeItem("commentId");
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
        <div className="inner form-layer">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="answer"
              style={{ marginBottom: 3 }}
              className="form-control"
              placeholder="  پاسخ"
              aria-describedby="courseName"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-success "
              style={{ margin: "1em" }}
            >
              ثبت پاسخ
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

export default AnswerCommentDialog;
