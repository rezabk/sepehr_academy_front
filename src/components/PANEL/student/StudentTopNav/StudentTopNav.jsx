import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./StudentTopNav.css";
import { isEmpty } from "lodash";
import { getStudent } from "../../../../core/services/studentsServices";


const StudentTopNav = () => {
  const [user, setUser] = useState();

  const userId = localStorage.getItem("userId");

  useEffect(async () => {
    if (userId != null) {
      {
        await getStudent(userId)
          .then((res) => {
            setUser(res.data.result);
          })
          .catch((err) => console.log(err));
      }
    }
  }, []);

  const handleSubmit = () => {
    localStorage.removeItem("employee");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
  };

  return (
    <div class="dropdown mx-5">
      <button
        class="btn btn-secondary dropdown-toggle dashboard-dropdown"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="fa fa-user mx-1"> </i>{" "}
        {!isEmpty(user) ? user.fullName : null}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li className="dropdown-items mx-2 my-2">
          <Link to="/studentDashboard/studentDetails" style={{ color: "#333" }}>
            <i className="fa fa-fw fa-user"></i> پروفایل
          </Link>
        </li>
        <li className=" dropdown-items mx-2 my-2">
          <a href="/" style={{ color: "#333" }}>
            <i className="fa fa-fw fa-eye"></i>مشاهده سایت
          </a>
        </li>

        <li className="divider"></li>
        <li className="dropdown-items mx-2 my-1">
          <a href="/" style={{ color: "#333" }} onClick={handleSubmit}>
            <i className="fa fa-fw fa-power-off"></i> خروج
          </a>
        </li>
      </ul>
    </div>
  );
};

export default StudentTopNav;
