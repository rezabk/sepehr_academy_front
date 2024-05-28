import { useContext } from "react";
import Pagination from "./../../../common/Pagination/Pagination";
import { dashContext } from "../../../context/dashContext";
import { isEmpty } from "lodash";

const StudentsTable = () => {
  const context = useContext(dashContext);

  const {
    employee,
    currentPage,
    perPage,
    handlePageChange,
    studentsData,
    setSearch,
    filteredStudents,
    openEditStudentDialog,
    openDeleteStudentDialog,
    openTermsDetailsDialog,
  } = context;
  console.log(filteredStudents);
  return (
    <div
      className="students-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <div>
          <h3 className="alert alert-info text-center">لیست دانش آموزان</h3>
          <div className="row inline-block">
            <input
              type="text"
              className="form-control my-3"
              placeholder="جستجوی دانش آموز"
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "50%", float: "left", marginLeft: "2em" }}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">نام و نام خانوادگی</th>
                <th scope="col"> ایمیل </th>
                <th scope="col"> تاریخ تولد </th>
                <th scope="col"> کدملی </th>
                <th scope="col"> شماره موبایل </th>
                <th scope="col"> ترم ها </th>
                {!isEmpty(employee) ? (
                  employee.role === "admin" ? (
                    <>
                      <th scope="col"> ویرایش </th>
                      <th scope="col">حذف </th>
                    </>
                  ) : null
                ) : null}
              </tr>
            </thead>
            <tbody>
              {studentsData.map((student) => (
                <tr key={student.id}>
                  <td>{student.fullName}</td>
                  <td>{student.email}</td>
                  <td>{student.birthDate}</td>
                  <td>{student.nationalId}</td>
                  <td>{student.phoneNumber}</td>
                  <td>
                    {!isEmpty(student.termDetails)
                      ? student.termDetails.map((term) => (
                          <button
                            key={student.id}
                            className="btn btn-success mx-1"
                            onClick={() => {
                              openTermsDetailsDialog(term, student);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {term.title}
                          </button>
                        ))
                      : "دانش آموز دوره ای را اخذ نکرده"}
                  </td>
                  {!isEmpty(employee) ? (
                    employee.role == "admin" ? (
                      <>
                        <td>
                          <button
                            class="btn btn-warning"
                            onClick={() => openEditStudentDialog(student)}
                          >
                            ویرایش
                          </button>
                        </td>
                        <td>
                          <button
                            class="btn btn-danger"
                            onClick={() => openDeleteStudentDialog(student)}
                          >
                            حذف
                          </button>
                        </td>
                      </>
                    ) : null
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="navbar-fixed-bottom text-center"
          style={{ marginTop: "12%" }}
        >
          {filteredStudents != null ? (
            <Pagination
              totalCourse={filteredStudents.length}
              currentPage={currentPage}
              perPage={perPage}
              onPageChange={handlePageChange}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StudentsTable;
