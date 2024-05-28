import { useContext, useEffect } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { dashContext } from "../../../context/dashContext";

import { isEmpty } from "lodash";


const TermsDetailsDialog = ({ showDialog, closeDialog, term, student }) => {
  const context = useContext(dashContext);

  const { openDeleteStudentFromTermDialog, fetchStudents } = context;

  useEffect(() => {
    closeDialog();
  }, [fetchStudents == true]);

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
          <table className="table terms-table">
            <thead>
              <tr>
                <th scope="col">عنوان ترم</th>
                <th scope="col"> تصویر ترم</th>
                <th scope="col"> قیمت ترم (تومان) </th>
                <th scope="col"> استاد دوره </th>
                <th scope="col"> حذف از ترم </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{term.title}</td>
                <td>
                  <a
                    href={!isEmpty(term) ? term.courseDetails.image : null}
                    target="_blank"
                    className="btn btn-info btn-sm"
                  >
                    نمایش تصویر
                  </a>
                </td>
                <td>{term.cost === 0 ? "رایگان" : `${term.cost}`}</td>

                <td>
                  {!isEmpty(term.teacherDetails)
                    ? term.teacherDetails.fullName
                    : null}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => openDeleteStudentFromTermDialog(term)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default TermsDetailsDialog;
