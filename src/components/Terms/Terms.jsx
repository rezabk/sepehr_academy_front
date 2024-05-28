import React, { useState, useContext } from "react";
import "./Terms.css";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import { Helmet } from "react-helmet";
import Pagination from "../common/Pagination/Pagination";
import { paginate } from "../../core/utils/paginate";
import { Link } from "react-router-dom";
import Img from "react-image";
import ScaleLoader from "react-spinners/ScaleLoader";
import Scroll from "../common/ScrollToTop/Scroll";
import { dashContext } from "./../context/dashContext";

const Terms = () => {
  const context = useContext(dashContext);
    const {termsData} = context;

  const [perPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const archiveTerms = paginate(termsData, currentPage, perPage);
console.log(termsData)
  return (
    <React.Fragment>
      <Header />
      <Helmet>
        <title>آموزشگاه سپهر | دوره ها</title>
      </Helmet>
      <div className="Courses-img"></div>
      <div className="Courses-title"> دوره ها</div>
      <div className="container">
        <div className="row my-5">
          {archiveTerms.map((term) => (
            <div key={term.id} className="col-xl-4 col-lg-6 ">
              <Link to={`/terms/${term.id}`}>
                <div className="card Courses-card ">
                  {/* <img src={course.course.image} className="card-img-top" alt="..." /> */}

                  <Img
                    src={[
                      `${term.courseDetails.image}  `,
                      "https://via.placeholder.com/150x100",
                    ]}
                    className="card-img-top"
                    loader={
                      <div className="text-center mx-auto">
                        <ScaleLoader loading={true} color={"#4A90E2"} />
                      </div>
                    }
                  />

                  <div className="card-body">
                    <div className=" Courses-teacher rounded-pill bahr-course"></div>
                    <p class="card-text Courses-teacher-text ">
                      {" "}
                      {term.teacherDetails.fullName}{" "}
                    </p>
                    <h5 class="card-title Courses-name">
                      {term.courseDetails.courseName}
                    </h5>
                    <div className="Courses-star">
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                    </div>
                    <div className="rate-score">5 </div>
                    <div className="start-date">
                      تاریخ شروع دوره: {term.startDate.substr(0, 10)}
                    </div>
                    <div className="end-date">
                      تاریخ پایان دوره: {term.startDate.substr(0, 10)}
                    </div>

                    <div className="Courses-box-footer">
                      <ul className="Courses-list ">
                        <li className="Courses-student-number">
                          <i className="bi bi-people Courses-student-icon"> </i>
                          ظرفیت : {term.capacity} دانشجو
                        </li>
                        <li className="Courses-time">
                          <i className="bi bi-clock Courses-clock-icon"> </i>
                          20 ساعت
                        </li>
                        <li className="Courses-price"> {term.cost} تومان</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Scroll />
      </div>
      <Pagination
        totalCourse={termsData.length}
        currentPage={currentPage}
        perPage={perPage}
        onPageChange={handlePageChange}
      />
      <Footer />
    </React.Fragment>
  );
};

export default Terms;
