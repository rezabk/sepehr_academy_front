import { useContext } from "react";
import { dashContext } from "../../../context/dashContext";
import { isEmpty } from "lodash";

const StudentCoursesTable = () => {
  const context = useContext(dashContext);

  const { setSearch, sortTermsDes, sortTermsAsc, student } = context;

  return (
    <div
      className="terms-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <div>
          <h3 className="alert alert-info text-center">دوره های دانشجو</h3>
          <div className="row inline-block">
            <input
              type="text"
              className="form-control my-3"
              placeholder="جستجوی ترم"
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "50%", float: "left", marginLeft: "2em" }}
            />
          </div>
          <table className="table terms-table">
            <thead>
              <tr>
                <th scope="col">عنوان ترم</th>
                <th scope="col"> تصویر ترم</th>
                <th scope="col">
                  {" "}
                  قیمت ترم (تومان)
                  <span
                    className="fa fa-long-arrow-up"
                    style={{ marginRight: "0.5em", cursor: "pointer" }}
                    onClick={sortTermsDes}
                  ></span>
                  <span
                    className="fa fa-long-arrow-down"
                    style={{ marginRight: "0.5em", cursor: "pointer" }}
                    onClick={sortTermsAsc}
                  ></span>
                </th>
                <th scope="col"> استاد دوره </th>
                <th scope="col"> تاریخ شروع دوره </th>
                <th scope="col"> تاریخ پایان دوره </th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(student)
                ? student.termDetails.map((term) => (
                    <tr key={term.id}>
                      <td>{term.title}</td>
                      <td>
                        <a
                          href={
                            !isEmpty(term) ? term.courseDetails.image : null
                          }
                          target="_blank"
                          className="btn btn-info btn-sm"
                        >
                          نمایش تصویر
                        </a>
                      </td>
                      <td>{term.cost === 0 ? "رایگان" : `${term.cost}`}</td>
                      <td>{term.teacherDetails.fullName}</td>
                      <td>{term.startDate.substr(0, 10)}</td>
                      <td>{term.endDate.substr(0, 10)}</td>
                    </tr>
                  ))
                : "شما در دوره ای ثبت نام نکرده اید"}
            </tbody>
          </table>
        </div>

        <div
          className="navbar-fixed-bottom text-center"
          style={{ marginTop: "12%" }}
        ></div>
      </div>
    </div>
  );
};

export default StudentCoursesTable;
