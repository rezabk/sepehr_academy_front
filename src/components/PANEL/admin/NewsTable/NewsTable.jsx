import { useContext } from "react";

import Pagination from "./../../../common/Pagination/Pagination";

import { dashContext } from "../../../context/dashContext";
import { isEmpty } from "lodash";

const NewsTable = () => {

  const context = useContext(dashContext);

  const {
    employee, 
    currentPage,
    perPage,
    handlePageChange,
    openNewNewsDialog,
    openEditNewsDialog,
    openDeleteNewsDialog,
    setSearch,
    filteredNews,
    openNewsCommentDialog,
  } = context;

  return (
    <div
      className="news-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <div>
          <h3 className="alert alert-info text-center">لیست خبر ها</h3>
          <div className="row inline-block">
            <button className="btn btn-primary" onClick={openNewNewsDialog}>
              <span
                className="fa fa-plus"
                style={{ verticalAlign: "middle", marginLeft: "1em" }}
              ></span>
              اضافه کردن خبر جدید
            </button>
            <input
              type="text"
              className="form-control my-3"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی خبر"
              style={{ width: "50%", float: "left", marginLeft: "2em" }}
            />
          </div>
          <table className="table news-table">
            <thead>
              <tr>
                <th scope="col">عنوان خبر</th>
                <th scope="col"> تصویر </th>
                <th scope="col"> دسته </th>
                <th scope="col"> متن خبر </th>
                <th scope="col"> کامنت ها </th>
                <th scope="col">ویرایش </th>
                <th scope="col">حذف</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(filteredNews) && !isEmpty(employee)
                ? filteredNews.map((news) =>
                    employee.role == "teacher" ? (
                      news.writerId == employee.id ? (
                        <tr key={!isEmpty(filteredNews) ? news.id : null}>
                          <td>{!isEmpty(filteredNews) ? news.title : null}</td>
                          <td>
                            <a
                              href={!isEmpty(news) ? news.image : null}
                              target="_blank"
                              className="btn btn-info btn-sm"
                            >
                              نمایش تصویر
                            </a>
                          </td>
                          <td>
                            {!isEmpty(filteredNews) ? news.category : null}
                          </td>
                          <td>{!isEmpty(filteredNews) ? news.text : null}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => openNewsCommentDialog(news)}
                            >
                              کامنت
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() => openEditNewsDialog(news)}
                            >
                              ویرایش
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => openDeleteNewsDialog(news)}
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      ) : null
                    ) : (
                      <tr key={!isEmpty(filteredNews) ? news.id : null}>
                        <td>{!isEmpty(filteredNews) ? news.title : null}</td>
                        <td>
                          <a
                            href={!isEmpty(news) ? news.image : null}
                            target="_blank"
                            className="btn btn-info btn-sm"
                          >
                            نمایش تصویر
                          </a>
                        </td>
                        <td>{!isEmpty(filteredNews) ? news.category : null}</td>
                        <td>{!isEmpty(filteredNews) ? news.text : null}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => openNewsCommentDialog(news)}
                          >
                            کامنت
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => openEditNewsDialog(news)}
                          >
                            ویرایش
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => openDeleteNewsDialog(news)}
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
          {filteredNews != null ? (
            <Pagination
              totalCourse={filteredNews.length}
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

export default NewsTable;
