import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import "./StudentDashboard.css";

import { Route, Switch } from "react-router-dom";
import AdminContext from "../../../context/AdminContext";
import StudentSidebar from "../StudentSidebar/StudentSidebar";
import StudentTopNav from "../StudentTopNav/StudentTopNav";
import StudentDetailsTable from "../StudentDetailsTable/StudentDetailsTable";
import StudentCoursesTable from "./../StudentCoursesTable/StudentCoursesTable";
const StudentDashboard = ({ children }) => {
  return (
    <div id="wrapper">
      <Helmet>
        <title>آموزشگاه سپهر | داشبورد</title>
      </Helmet>
      <nav
        className="navbar navbar-inverse navbar-fixed-top dashboard-navbar"
        role="navigation"
      >
        <div className="navbar-header dashboard-navbar-header">
          <Link
            className="navbar-brand dashboard-navbar-brand"
            to="/studentDashboard"
          >
            داشبورد
          </Link>
        </div>
        <StudentTopNav />
      </nav>
      <StudentSidebar />

      <Switch>
        <Route
          exact
          path="/studentDashboard/studentDetails"
          render={() => (
            <AdminContext>
              <StudentDetailsTable />
            </AdminContext>
          )}
        />
        <Route
          exact
          path="/studentDashboard/studentCourses"
          render={() => (
            <AdminContext>
              <StudentCoursesTable />
            </AdminContext>
          )}
        />
      </Switch>
    </div>
  );
};

export default StudentDashboard;
