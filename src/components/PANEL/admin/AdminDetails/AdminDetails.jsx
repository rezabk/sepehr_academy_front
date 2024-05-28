import { useContext } from "react";
import { dashContext } from "./../../../context/dashContext";
import { isEmpty } from "lodash";



const AdminDetails = () => {
  const context = useContext(dashContext);
  const { openEditAdminDetailsDialog, currentCourse ,employee} = context;

  return (
    <div
      className="courses-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <h3 className="alert alert-info text-center">اطلاعات ادمین</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">نام و نام خانوادگی</th>
              <th scope="col">ایمیل</th>
              <th scope="col"> نوع کاربر</th>
              <th scope="col">تاریخ تولد</th>
              <th scope="col">شماره موبایل</th>
              <th scope="col"> آدرس</th>
              <th scope="col">ویرایش</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{!isEmpty(employee) ? employee.fullName : null} </td>
              <td>{!isEmpty(employee) ? employee.email : null} </td>
              <td>
                {!isEmpty(employee)
                  ? employee.role === "admin"
                    ? "ادمین"
                    : "معلم"
                  : null}{" "}
              </td>
              <td>{!isEmpty(employee) ? employee.birthDate : null} </td>
              <td>{!isEmpty(employee) ? employee.phoneNumber : null} </td>
              <td>{!isEmpty(employee) ? employee.address : null} </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => openEditAdminDetailsDialog()}
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

export default AdminDetails;
