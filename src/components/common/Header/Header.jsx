import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import { isEmpty } from "lodash";
import { BrowserRouter as Router, NavLink, Link } from "react-router-dom";
import { decodeToken } from "./../../../core/utils/decodeToken";
import { getStudent } from "../../../core/services/studentsServices";
import { getElementError } from "@testing-library/react";
import { getTeacher } from "../../../core/services/teachersServices";
import { dashContext } from "./../../context/dashContext";


const Header = ({ history }) => {
  const context = useContext(dashContext);
  const { setFetchUser,fetchUser } = context;
 

  const [user, setUser] = useState();

  const token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);

  useEffect(async () => {
    if (decodedToken != null) {
      if (decodedToken.payload.role == "student")
        await getStudent(decodedToken.payload.name)
          .then((res) => {
            setFetchUser(false);
            setUser(res.data.result);
          })
          .catch((err) => console.log(err));
    }
  }, [fetchUser == true]);

  useEffect(async () => {
    if (decodedToken != null) {
      if (
        decodedToken.payload.role == "teacher" ||
        decodedToken.payload.role == "admin"
      ) {
        await getTeacher(decodedToken.payload.name)
          .then((res) => {
            setFetchUser(false)
            setUser(res.data.result);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [fetchUser== true]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("employee");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light ">
      <div className="container">
        <Link
          className="navbar-brand navbar-title"
          style={{ color: "#fff" }}
          to="/Landing"
        >
          آموزشگاه سپهر
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <div className="social-media navbar-collapse">
            <a href="#">
              {" "}
              <i className="bi bi-telegram"></i>
            </a>
            <a href="#">
              {" "}
              <i className="bi bi-instagram"></i>
            </a>
          </div>

          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
            {!isEmpty(user) ? (
              <li className="clientarena">
                <div className="loggein ">
                  <span style={{ color: "#fff" }}>{user.fullName}</span>{" "}
                  {user.role == "admin" ||
                  ("teacher" && user.role != "student") ? (
                    <>
                      /
                      <a
                        href="/dashboard/admindetails"
                        style={{ color: "#fff" }}
                      >
                        {user.role == "admin" ? "پنل ادمین" : null}
                        {user.role == "teacher" ? "پنل معلم" : null}
                      </a>
                      /
                      <a
                        href="/"
                        style={{ color: "#fff" }}
                        onClick={handleLogOut}
                      >
                        خروج
                      </a>
                    </>
                  ) : (
                    <>
                      /
                      <a
                        href="/studentDashboard/studentdetails"
                        style={{ color: "#fff" }}
                      >
                        {" "}
                        پنل دانشجو
                      </a>
                      /
                      <a
                        href="/"
                        style={{ color: "#fff" }}
                        onClick={handleLogOut}
                      >
                        خروج
                      </a>
                    </>
                  )}
                </div>
              </li>
            ) : (
              <>
                <div className="dropdown">
                  <li class="nav-item">
                    <button
                      className="btn btn-secondary dropdown-toggle sign"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ثبت نام
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link
                          class="dropdown-item login-dropdown-item "
                          to="/Register"
                        >
                          <i
                            className="fas fa-user-graduate "
                            style={{ position: "relative", left: "8px" }}
                          >
                            {" "}
                          </i>
                          دانش آموز
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item login-dropdown-item"
                          to="/registerEmployee"
                        >
                          <i
                            class="fas fa-chalkboard-teacher"
                            style={{ position: "relative", left: "7px" }}
                          ></i>
                          معلم
                        </Link>
                      </li>
                    </ul>
                  </li>
                </div>

                <div className="dropdown">
                  <li class="nav-item">
                    <button
                      className="btn btn-secondary dropdown-toggle login"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      وارد شوید
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link
                          class="dropdown-item login-dropdown-item"
                          to="/Login"
                        >
                          <i
                            className="fas fa-user-graduate "
                            style={{ position: "relative", left: "8px" }}
                          >
                            {" "}
                          </i>
                          دانش آموز
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item login-dropdown-item"
                          to="/LoginEmployee"
                        >
                          <i
                            class="fas fa-chalkboard-teacher"
                            style={{ position: "relative", left: "7px" }}
                          ></i>
                          معلم
                        </Link>
                      </li>
                    </ul>
                  </li>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
