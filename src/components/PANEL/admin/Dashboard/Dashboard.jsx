import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import AdminTopNav from "./../AdminTopNav/AdminTopNav";
import { Route, Switch } from "react-router-dom";
import TermsTable from "../TermsTable/TermsTable";
import CoursesTable from "../CoursesTable/CoursesTable";
import TeachersTable from "../TeachersTable/TeachersTable";
import NewsTable from "../NewsTable/NewsTable";
import StudentsTable from "./../StudentsTable/StudentsTable";
import AdminDetails from "./../AdminDetails/AdminDetails";
import AdminContext from "./../../../context/AdminContext";
import ContactUsTable from "./../ContactUsTable/ContactUsTable";

const Dashboard = ({ children }) => {
 

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
          <Link className="navbar-brand dashboard-navbar-brand" to="/dashboard">
            داشبورد
          </Link>
        </div>

        <AdminTopNav />
      </nav>
      <AdminContext>
        <AdminSidebar />
      </AdminContext>
      <Switch>
        <Route
          exact
          path="/dashboard/admindetails"
          render={() => (
            <AdminContext>
              <AdminDetails />
            </AdminContext>
          )}
        />
        <Route
          exact
          path="/dashboard/courses"
          render={() => (
            <AdminContext >
              <CoursesTable />
            </AdminContext>
          )}
        />
        <Route
          exact
          path="/dashboard/terms"
          render={() => (
            <AdminContext >
              <TermsTable />
            </AdminContext>
          )}
        />
        <Route
          exact
          path="/dashboard/news"
          render={() => (
            <AdminContext >
              <NewsTable />
            </AdminContext>
          )}
        />
        <Route
          exact
          path="/dashboard/teachers"
          render={() => (
            <AdminContext >
              <TeachersTable />
            </AdminContext>
          )}
        />
        <Route
          exact
          path="/dashboard/students"
          render={() => (
            <AdminContext >
              <StudentsTable />
            </AdminContext>
          )}
        />

        <Route
          exact
          path="/dashboard/contactUs"
          render={() => (
            <AdminContext>
              <ContactUsTable />
            </AdminContext>
          )}
        />
      </Switch>
    </div>
  );
};

export default Dashboard;
