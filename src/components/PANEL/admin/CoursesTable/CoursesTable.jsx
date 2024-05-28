import { useContext } from "react";

import Pagination from "./../../../common/Pagination/Pagination";

import { isEmpty } from "lodash";
import { dashContext } from "../../../context/dashContext";

const CoursesTable = () => {
  
  const context = useContext(dashContext);

  const {
    employee,
    currentPage,
    perPage,
    handlePageChange,
    openEditCourseDialog,
    openNewCourseDialog,
    openDeleteCourseDialog,
    setSearch,
    filteredCourses,
  } = context;

  return (
    <div
      className="courses-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <div>
          <h3 className="alert alert-info text-center">لیست دوره ها</h3>
          <div className="row inline-block">
            <button className="btn btn-primary" onClick={openNewCourseDialog}>
              <span
                className="fa fa-plus"
                style={{ verticalAlign: "middle", marginLeft: "1em" }}
              ></span>
              اضافه کردن دوره جدید
            </button>
            <input
              type="text"
              className="form-control my-3"
              placeholder="جستجوی دوره"
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "50%", float: "left", marginLeft: "2em" }}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">عنوان دوره</th>
                <th scope="col"> تصویر ترم</th>
                <th scope="col"> تاپیک ها</th>
                <th scope="col"> توضیحات دوره </th>
                <th scope="col">ویرایش </th>
                <th scope="col">حذف</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(filteredCourses) && !isEmpty(employee)
                ? filteredCourses.map((course) =>
                    employee.role == "teacher" ? (
                      course.teacherId == employee.id ? (
                        <tr key={course.id}>
                          <td>{course.courseName}</td>
                          <td>
                            <a
                              href={!isEmpty(course) ? course.image : null}
                              target="_blank"
                              className="btn btn-info btn-sm"
                            >
                              نمایش تصویر
                            </a>
                          </td>
                          <td>
                            {course.topics[0]},{course.topics[1]}
                          </td>
                          <td>{course.description}</td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() => openEditCourseDialog(course)}
                            >
                              ویرایش
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => openDeleteCourseDialog(course)}
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      ) : null
                    ) : (
                      <tr key={course.id}>
                        <td>{course.courseName}</td>
                        <td>
                          <a
                            href={!isEmpty(course) ? course.image : null}
                            target="_blank"
                            className="btn btn-info btn-sm"
                          >
                            نمایش تصویر
                          </a>
                        </td>
                        <td>
                          {course.topics[0]},{course.topics[1]}
                        </td>
                        <td>{course.description}</td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => openEditCourseDialog(course)}
                          >
                            ویرایش
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => openDeleteCourseDialog(course)}
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    )
                  )
                : null}
            </tbody>
          </table>
        </div>
        <div
          className="navbar-fixed-bottom text-center"
          style={{ marginTop: "12%" }}
        >
          {filteredCourses != null ? (
            <Pagination
              totalCourse={filteredCourses.length}
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

export default CoursesTable;
