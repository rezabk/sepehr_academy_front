import { useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { verifyCommentNews } from "./../../../../core/services/commentServices";
import { isEmpty } from "lodash";
import { errorMessage } from "../../../../core/utils/message";
import { successMessage } from "./../../../../core/utils/message";
import { dashContext } from "./../../../context/dashContext";

const NewsCommentDialog = ({ showDialog, closeDialog, singleNews }) => {
 
  const context = useContext(dashContext);
  const { commentNews,setFetchComments } = context;

  const handleVerify = async () => {
    const commentId = {
      Id: singleNews.id,
    };

    try {
      const { status } = await verifyCommentNews(commentId);
      if (status === 201) {
        setFetchComments(true);
        successMessage("کامنت تایید شد");
        localStorage.removeItem("commentId");
        closeDialog();
      }
    } catch (ex) {
      errorMessage("مشکلی در تایید کانت رخ داد");
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
              {!isEmpty(commentNews)
                ? commentNews.map((comment) =>
                    comment.postId === singleNews.id ? (
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
                            onClick={(e) => {
                              handleVerify();
                            }}
                          >
                            تایید کامنت
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning"
                            // onClick={() => { openAnswerCommentDialog(comments) }}
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

export default NewsCommentDialog;
