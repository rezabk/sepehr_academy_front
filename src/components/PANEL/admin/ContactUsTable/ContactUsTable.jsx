import { useContext } from "react";
import { dashContext } from "./../../../context/dashContext";
import { isEmpty } from "lodash";
import Pagination from "./../../../common/Pagination/Pagination";

import { contactUsDelete, contactUsVerify } from "./../../../../core/services/contactUsServices";
import { toast } from "react-toastify";

const ContactUsTable = () => {

  const context = useContext(dashContext);

  const {
    contactUs,
    employee,
    currentPage,
    perPage,
    handlePageChange,
    filteredContactUs,
    setSearch,
    setFetchContactUs,
  } = context;
  const handleVerify = async () => {
    try {
      const { status } = await contactUsVerify(localStorage.getItem("id"));
      if (status === 201) {
        toast.success("پیغام تایید شد  ", {
          position: "top-right",
          closeOnClick: true,
        });
        setFetchContactUs(true);
        localStorage.removeItem("id");
      }
    } catch (ex) {
      console.log(ex);
      toast.error("مشکلی پیش آمده.", {
        position: "top-right",
        closeOnClick: true,
      });
      localStorage.removeItem("id");
    }
  };

  const handleDelete = async () => {
    try {
      const { status } = await contactUsDelete(localStorage.getItem("id"));
      if (status === 201) {
        toast.success("پیغام حذف شد  ", {
          position: "top-right",
          closeOnClick: true,
        });
        setFetchContactUs(true);
        localStorage.removeItem("id");
      }
    } catch (ex) {
      console.log(ex);
      toast.error("مشکلی پیش آمده.", {
        position: "top-right",
        closeOnClick: true,
      });
      localStorage.removeItem("id");
    }
  };

  return (
    <div
      className="news-section my-5"
      style={{ marginTop: "-3em", marginRight: "15em" }}
    >
      <div style={{ marginTop: "-1000px" }}>
        <div>
          <h3 className="alert alert-info text-center">لیست پیغام ها</h3>
          <div className="row inline-block">
            <input
              type="text"
              className="form-control my-3"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی پیغام"
              style={{ width: "50%", float: "left", marginLeft: "2em" }}
            />
          </div>
          <table className="table news-table">
            <thead>
              <tr>
                <th scope="col">نام فرستنده</th>
                <th scope="col"> ایمیل فرستنده </th>
                <th scope="col"> پیغام </th>
                <th scope="col"> وضعیت تایید </th>
                <th scope="col"> تایید </th>
                <th scope="col">حذف</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(filteredContactUs)
                ? filteredContactUs.map((contact) => (
                    <tr key={!isEmpty(filteredContactUs) ? contact.id : null}>
                      <td>
                        {!isEmpty(filteredContactUs) ? contact.fullName : null}
                      </td>

                      <td>
                        {!isEmpty(filteredContactUs) ? contact.email : null}
                      </td>
                      <td>
                        {!isEmpty(filteredContactUs) ? contact.message : null}
                      </td>
                      <td>
                        {contact.isVerified == true ? (
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
                          className="btn btn-success"
                          onClick={() => {
                            localStorage.setItem("id", contact.id);
                            handleVerify();
                          }}
                        >
                          تایید
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            localStorage.setItem("id", contact.id);
                            handleDelete();
                          }}
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
          {filteredContactUs != null ? (
            <Pagination
              totalCourse={filteredContactUs.length}
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

export default ContactUsTable;
