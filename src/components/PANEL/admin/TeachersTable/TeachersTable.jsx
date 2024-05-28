import { useContext } from "react";
import Pagination from "./../../../common/Pagination/Pagination";

import { dashContext } from "../../../context/dashContext";
import Img from "react-image";

const TeachersTable = () => {
  const context = useContext(dashContext);

  const {
    currentPage,
    perPage,
    handlePageChange,
    teachersData,
    openNewTeacherDialog,
    openEditTeacherDialog,
    openDeleteTeacherDialog,
    setSearch,
    filteredTeachers,
  } = context;

  console.log(teachersData);
  return (
    <section
      className="courses-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <div>
          <h3 className="alert alert-info text-center">لیست معلم ها</h3>
          <div className="row inline-block">
            <button className="btn btn-primary" onClick={openNewTeacherDialog}>
              <span
                className="fa fa-plus"
                style={{ verticalAlign: "middle", marginLeft: "1em" }}
              ></span>
              اضافه کردن معلم جدید
            </button>
            <input
              type="text"
              className="form-control my-3"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی معلم"
              style={{ width: "50%", float: "left", marginLeft: "2em" }}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"> نام معلم</th>
                <th scope="col"> ایمیل معلم</th>
                <th scope="col"> عکس معلم</th>
                <th scope="col">ویرایش </th>
                <th scope="col">حذف</th>
              </tr>
            </thead>
            <tbody>
              {teachersData.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.fullName}</td>
                  <td>{teacher.email}</td>
                  <td>
                    {" "}
                    <Img
                      src={[
                        `${teacher.profile}`,
                        "https://via.placeholder.com/150x100",
                      ]}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      className="card-img-top"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => openEditTeacherDialog(teacher)}
                    >
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => openDeleteTeacherDialog(teacher)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="navbar-fixed-bottom text-center"
          style={{ marginTop: "12%" }}
        >
          {filteredTeachers != null ? (
            <Pagination
              totalCourse={filteredTeachers.length}
              currentPage={currentPage}
              perPage={perPage}
              onPageChange={handlePageChange}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default TeachersTable;
