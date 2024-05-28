import { useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { verifyComment } from "../../../../core/services/commentServices";
import { errorMessage, successMessage } from "../../../../core/utils/message";
import { dashContext } from "../../../context/dashContext";
import { isEmpty } from "lodash";


const TermsCommentDialog = ({ showDialog, closeDialog, term }) => {


  const context = useContext(dashContext);

  const { openAnswerCommentDialog, comments ,setFetchComments} = context;

  const handleVerify = async (event) => {
    const verify = {
      id: localStorage.getItem("commentId"),
    };

    try {
      const { status } = await verifyComment(verify);
      if (status === 201) {
        setFetchComments(true)
        successMessage("کامنت تایید شد");
        localStorage.removeItem("commentId");
        closeDialog();
      }
    } catch (ex) {
      errorMessage(" مشکلی پیش آمده");
      console.log(ex);
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
        <div className="inner table-layer">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"> کامنت</th>

                <th scope="col"> فرستنده</th>

                <th scope="col"> وضعیت کامنت </th>
                <th scope="col">تایید کامنت </th>
                <th scope="col">پاسخ</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(comments)
                ? comments.map((comment) =>
                    comment.postId === term.id ? (
                      <tr key={comment.id}>
                        <td>{comment.comment}</td>

                        <td>{comment.email}</td>
                        <td>
                          {comment.isVerified == true ? (
                            <div
                              className="mx-4"
                              style={{ color: "green", fontSize: "20px" }}
                            >
                              <i class="fas fa-check"></i>
                            </div>
                          ) : (
                            <div className="mx-4" style={{ color: "red" }}>
                              <i class="fas fa-times"></i>
                            </div>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            value={comment.id}
                            onClick={(e) => {
                              localStorage.setItem("commentId", comment.id);
                              handleVerify();
                            }}
                          >
                            تایید کامنت
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning"
                            value={comment.id}
                            onClick={() => {
                              localStorage.setItem("commentId", comment.id);
                              openAnswerCommentDialog();
                            }}
                          >
                            پاسخ
                          </button>
                        </td>
                      </tr>
                    ) : null
                  )
                : null}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default TermsCommentDialog;
