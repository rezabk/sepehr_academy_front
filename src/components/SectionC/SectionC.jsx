import { useContext } from "react";
import { Link } from "react-router-dom";
import { paginate } from "./../../core/utils/paginate";
import Img from "react-image";
import ScaleLoader from "react-spinners/ScaleLoader";
import { dashContext } from "./../context/dashContext";
import { isEmpty } from 'lodash';

const SectionC = () => {
  const context = useContext(dashContext);
  const { termsData } = context;

  const indexTerms = paginate(termsData, 1, 3);
  console.log(termsData);
  return (
    <div className="container ">
      <div className="row d-flex justify-content-center">
        {indexTerms.map((term) => (
          <div key={term.id} className="col-xl-4 col-lg-6 ">
            <Link to={`/Terms/${term.id}`}>
              <div className="card Courses-card ">
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
                  <div
                    className="rounded-pill Courses-teacher "
                    // style={{
                    //   backgroundImage:
                    //     term.teacherDetails.profile != null
                    //       ? `url("${term.teacherDetails.profile}")`
                    //       : `url("https://via.placeholder.com/150x100")`,
                    // }}
                  >
                    <Img
                      src={
                        !isEmpty(term.teacherDetails)
                          ? `${term.teacherDetails.profile}`
                          : "https://via.placeholder.com/150x100"
                      }
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                      }}
                      className="card-img-top"
                    />
                  </div>
                  <p class="card-text Courses-teacher-text ">
                    {" "}
                    {!isEmpty(term.teacherDetails) ? term.teacherDetails.fullName: null  }{" "}
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
                  <div className="start-date d-flex ">
                    {" "}
                    <div>تاریخ شروع دوره : </div> {term.startDate.substr(0, 10)}
                  </div>
                  <div className="end-date d-flex">
                    <div>تاریخ پایان دوره : </div> {term.endDate.substr(0, 10)}
                  </div>

                  <div className="Courses-box-footer">
                    <ul className="Courses-list ">
                      <li className="Courses-student-number">
                        <i className="bi bi-people Courses-student-icon"> </i>
                        ظرفیت : {term.capacity} دانشجو
                      </li>
                      <li className="Courses-time">
                        <i className="bi bi-clock Courses-clock-icon"> </i>
                        {term.duration} ساعت
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
    </div>
  );
};

export default SectionC;
