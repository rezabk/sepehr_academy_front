import React from "react";
import { isEmpty } from "lodash";
import UserContext from "./../components/context/userContext";
import SingleNews from "./../components/News/singleNews/singleNews";
import Dashboard from "./../components/PANEL/admin/Dashboard/Dashboard";
import RegisterEmployee from "./../components/Register/RegisterEmployee";
import StudentDashboard from "./../components/PANEL/student/StudentDashboard/StudentDashboard";
import Landing from "./../components/Landing";
import Register from "./../components/Register/Register";
import Login from "./../components/Login/Login";
import LoginEmployee from "./../components/Login/LoginEmployee";
import NotFound from "./../components/404/404";
import SectionB from "./../components/SectionB/SectionB";
import Terms from "./../components/Terms/Terms";
import SingleTerm from "./../components/Terms/Pages/singleTerm";
import News from "./../components/News/News";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AdminContext from "../components/context/AdminContext";
const Routes = () => {
  const user = localStorage.getItem("user");
  const employee = localStorage.getItem("employee");

  return (
    <Router>
      <AdminContext>
      <Switch>
        <Route
          path="/register"
          render={() =>
            isEmpty(user || employee) ? (
             <UserContext>
                <Register />
                </UserContext>
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/registerEmployee"
          render={() =>
            isEmpty(employee || user) ? (
              <RegisterEmployee />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/login"
          render={() =>
            isEmpty(user || employee) ? (
            <UserContext> 
                <Login />
                </UserContext>
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          exact
          path="/loginEmployee"
          render={() =>
            isEmpty(employee || user) ? <LoginEmployee /> : <Redirect to="/" />
          }
        />

        <Route exact path="/" component={Landing} />
        <Route exact path="/404" component={NotFound} />
        <Route exact path="/#courses" component={SectionB} />
       
          <Route exact path="/Terms" component={Terms} />
    
        <Route exact path="/Terms/:id" component={SingleTerm} />
      
          {" "}
          <Route exact path="/News" component={News} />{" "}
      
        <Route exact path="/News/:id" component={SingleNews} />
        <Route
          exact
          path="/dashboard"
          render={() =>
            isEmpty(employee) ? <Redirect to="/" /> : <Dashboard />
          }
        />
        <Route
          exact
          path="/dashboard/admindetails"
          render={() =>
            isEmpty(employee) ? <Redirect to="/" /> : <Dashboard />
          }
        />
        <Route
          exact
          path="/dashboard/terms"
          render={() =>
            isEmpty(employee) ? <Redirect to="/" /> : <Dashboard />
          }
        />
        <Route
          exact
          path="/dashboard/courses"
          render={() =>
            isEmpty(employee) ? <Redirect to="/" /> : <Dashboard />
          }
        />
        <Route
          exact
          path="/dashboard/news"
          render={() =>
            isEmpty(employee) ? <Redirect to="/" /> : <Dashboard />
          }
        />
        <Route
          exact
          path="/dashboard/teachers"
          render={() =>
            isEmpty(employee) ? <Redirect to="/" /> : <Dashboard />
          }
        />
        <Route
          exact
          path="/dashboard/students"
          render={() =>
            isEmpty(employee) ? <Redirect to="/" /> : <Dashboard />
          }
        />
          <Route
          exact
          path="/dashboard/contactUs"
          render={() =>
            isEmpty(employee) ? <Redirect to="/" /> : <Dashboard />
          }
        />
        <Route
          exact
          path="/studentDashboard"
          render={() =>
            isEmpty(user) ? <Redirect to="/" /> : <StudentDashboard />
          }
        />
        <Route
          exact
          path="/studentDashboard/studentDetails"
          render={() =>
            isEmpty(user) ? <Redirect to="/" /> : <StudentDashboard />
          }
        />
        <Route
          exact
          path="/studentDashboard/studentCourses"
          render={() =>
            isEmpty(user) ? <Redirect to="/" /> : <StudentDashboard />
          }
        />

        <Redirect from="/landing" to="/" />
        <Redirect to="/404" />
      </Switch>
      </AdminContext>
    </Router>
  );
};

export default Routes;
