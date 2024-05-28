import { useContext } from "react";
import { dashContext } from "../../../context/dashContext";
import { isEmpty } from "lodash";


const StudentDetailsTable = () => {
 

  const context = useContext(dashContext);

  const { openEditStudentDetailsDialog,student } = context;


  return (
    <div
      className="courses-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <h3 className="alert alert-info text-center">اطلاعات دانشجو</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">نام و نام خانوادگی</th>
              <th scope="col">ایمیل</th>

              <th scope="col">تاریخ تولد</th>
              <th scope="col">شماره موبایل</th>
              <th scope="col"> آدرس</th>
              <th scope="col">ویرایش</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{!isEmpty(student) ? student.fullName : null} </td>
              <td>{!isEmpty(student) ? student.email : null} </td>

              <td>{!isEmpty(student) ? student.birthDate : null} </td>
              <td>{!isEmpty(student) ? student.phoneNumber : null} </td>
              <td>{!isEmpty(student) ? student.address : null} </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => openEditStudentDetailsDialog(student)}
                >
                  ویرایش
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetailsTable;
