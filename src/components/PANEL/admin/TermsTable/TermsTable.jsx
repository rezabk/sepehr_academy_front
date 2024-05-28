import { useContext } from "react";
import Pagination from "./../../../common/Pagination/Pagination";
import { dashContext } from "../../../context/dashContext";
import { isEmpty } from "lodash";

const TermsTable = () => {
  const context = useContext(dashContext);

  const {
    currentPage,
    perPage,
    handlePageChange,
    termsData,
    openNewTermDialog,
    openEditTermDialog,
    openDeleteTermDialog,
    setSearch,
    filteredTerms,
    sortTermsDes,
    sortTermsAsc,
    openTermsCommentDialog,
    openAddStudentToTermDialog,
  } = context;

  return (
    <div
      className="terms-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <div>
          <h3 className="alert alert-info text-center">لیست ترم ها</h3>
          <div className="row inline-block">
            <button className="btn btn-primary" onClick={openNewTermDialog}>
              <span
                className="fa fa-plus"
                style={{ verticalAlign: "middle", marginLeft: "1em" }}
              ></span>
              اضافه کردن ترم جدید
            </button>
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
                <th scope="col"> ظرفیت </th>
                <th scope="col"> استاد دوره </th>
                <th scope="col"> تاریخ شروع دوره </th>
                <th scope="col"> تاریخ پایان دوره </th>
                <th scope="col"> دانشجو </th>
                <th scope="col"> کامنت ها </th>
                <th scope="col">ویرایش </th>
                <th scope="col">حذف</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(filteredTerms)
                ? filteredTerms.map((term) => (
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
                      <td>{term.capacity}</td>
                      <td>
                        {!isEmpty(term.teacherDetails)
                          ? term.teacherDetails.fullName
                          : null}
                      </td>
                      <td>{term.startDate.substr(0, 10)}</td>
                      <td>{term.endDate.substr(0, 10)}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => openAddStudentToTermDialog(term)}
                        >
                          مشاهده
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => openTermsCommentDialog(term)}
                        >
                          کامنت
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => openEditTermDialog(term)}
                        >
                          ویرایش
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => openDeleteTermDialog(term)}
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>

        <div
          className="navbar-fixed-bottom text-center"
          style={{ marginTop: "12%" }}
        >
          {filteredTerms != null ? (
            <Pagination
              totalCourse={filteredTerms.length}
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

export default TermsTable;
