import { useContext } from "react";

import "./AdminSidebar.css";
import { isEmpty } from "lodash";
import { NavLink, withRouter } from "react-router-dom";
import { dashContext } from "./../../../context/dashContext";

const AdminSidebar = () => {
  const context = useContext(dashContext);

  const { employee } = context;

  return (
    <div>
      <ul className="nav navbar-nav side-nav dashboard-sidebar ">
        <li>
          <NavLink
            to={`/dashboard/admindetails/`}
            className="dashboard-text"
            activeClassName="dashboard-text-active"
          >
            <i className="fa fa-fw fa-dashboard"></i> داشبورد
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/courses"
            className="dashboard-courses-text"
            activeClassName="dashboard-courses-active"
          >
            <i className="fa fa-fw fa-book-open"></i> دوره ها
          </NavLink>
        </li>
        {!isEmpty(employee) ? (
          employee.role == "admin" ? (
            <li>
              <NavLink
                to="/dashboard/terms"
                className="dashboard-courses-text"
                activeClassName="dashboard-courses-active"
              >
                <i className="fa fa-fw fa-graduation-cap"></i> ترم ها
              </NavLink>
            </li>
          ) : null
        ) : null}
        <li>
          <NavLink
            to="/dashboard/news"
            className="dashboard-courses-text"
            activeClassName="dashboard-courses-active"
          >
            <i className="fa fa-fw fa-newspaper"></i> اخبار
          </NavLink>
        </li>
        {!isEmpty(employee) ? (
          employee.role === "admin" ? (
            <li>
              <NavLink
                to="/dashboard/teachers"
                className="dashboard-courses-text"
                activeClassName="dashboard-courses-active"
              >
                <i className="fa fa-fw fa-chalkboard-teacher"></i> معلم ها
              </NavLink>
            </li>
          ) : null
        ) : null}

        {!isEmpty(employee) ? (
          employee.role === "admin" ? (
            <li>
              <NavLink
                to="/dashboard/students"
                className="dashboard-courses-text"
                activeClassName="dashboard-courses-active"
              >
                <i className="fa fa-fw fa-user-graduate"></i> دانش آموزان
              </NavLink>
            </li>
          ) : null
        ) : null}

        {!isEmpty(employee) ? (
          employee.role === "admin" ? (
            <li>
              <NavLink
                to="/dashboard/contactUs"
                className="dashboard-courses-text"
                activeClassName="dashboard-courses-active"
              >
                <i className="fa fa-fw fa-user-graduate"></i> پیغام ها
              </NavLink>
            </li>
          ) : null
        ) : null}
      </ul>
    </div>
  );
};

export default withRouter(AdminSidebar);
