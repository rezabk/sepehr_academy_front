import React, { useEffect, useState, useRef, useContext } from "react";

import "./singleTerm.css";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { sendComment } from "../../../core/services/commentServices";
import { Helmet } from "react-helmet";
import simpleReactValidator from "simple-react-validator";
import Img from "react-image";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  addStudentToTerm,
  checkLike,
  dislikeTerm,
  getTerm,
  likeTerm,
} from "../../../core/services/termServices";
import { errorMessage, successMessage } from "../../../core/utils/message";
import { dashContext } from "./../../context/dashContext";

const SingleTerm = ({ match }) => {
  const context = useContext(dashContext);
  const { student, comments } = context;

  const [fetch, setFetch] = useState(false);

  const postId = match.params.id;
  const [term, setTerm] = useState();
  const [like, setLike] = useState();

  useEffect(async () => {
    await getTerm(postId)
      .then((res) => {
        setTerm(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const check = {
    termId: postId,
    userId: localStorage.getItem("userId"),
  };
  useEffect(async () => {
    await checkLike(check)
      .then((res) => {
        setFetch(false);
        setLike(res.data.success);
      })
      .catch((err) => console.log(err));
  }, [fetch == true]);
  console.log(like);

  const [comment, setComment] = useState("");
  const [, forceUpdate] = useState();

  const validator = useRef(
    new simpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی میباشد",
        email: "ایمیل نوشته شده صحیح نمی باشد",
      },
      element: (message) => <div className="comment-validator">{message}</div>,
    })
  );

  const reset = () => {
    setComment("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const comments = {
      email: student != null ? student.email : null,
      comment,
      postId,
    };
    if (localStorage.getItem("employee")) {
      return toast.error("شما کارمند هستید و نمی توانید کامنت ثبت کنید");
    }
    if (localStorage.getItem("user")) {
      try {
        if (validator.current.allValid()) {
          const { status } = await sendComment(comments);
          if (status === 201) {
            toast.success("کامنت ثبت شد", {
              position: "top-right",
              closeOnClick: true,
            });
            reset();
          }
        } else {
          validator.current.showMessages();
          forceUpdate(1);
        }
      } catch (ex) {
        console.log(ex);
        toast.error("مشکلی پیش آمده.", {
          position: "top-right",
          closeOnClick: true,
        });
      }
    } else {
      return toast.error("برای ثبت کامنت ابتدا وارد سایت شوید");
    }
  };

  const [studentId, setStudentId] = useState("");

  const termId = match.params.id;
  useEffect(() => {
    setStudentId(localStorage.getItem("userId"));
    return () => {
      setStudentId();
    };
  }, []);

  const handleAddStudent = async (event) => {
    event.preventDefault();
    if (localStorage.getItem("user")) {
      const term = {
        termId,
      };

      try {
        const { status } = await addStudentToTerm(studentId, term);

        if (status === 201) {
          successMessage("   ترم خریداری شد ");
        }
      } catch (ex) {
        console.log(ex);
      }
    } else {
      errorMessage(" برای خرید دوره ابتدا وارد سایت شوید");
    }
  };

  const handleLike = async (event) => {
    event.preventDefault();
    const term = {
      termId,
      userId: studentId,
    };
    if (like === false) {
      try {
        const { status } = await likeTerm(term);

        if (status === 200) {
          setFetch(true);
          successMessage("   ترم لایک شد ");
          console.log(like);
        }
      } catch (ex) {
        console.log(ex);
        errorMessage("مشکلی پیش آمده.");
      }
    } else {
      try {
        const { status } = await dislikeTerm(term);

        if (status === 200) {
          setFetch(true);
          errorMessage("   ترم دیسلایک شد ");
          console.log(like);
        }
      } catch (ex) {
        console.log(ex);
        errorMessage("مشکلی پیش آمده.");
      }
    }
  };
  const changeColor = like ? " red" : "#b3b0b0";

  //   if (!termIdValidator(match.params.id)) return <Redirect to="/404" />;
  return (
    <React.Fragment>
      <Header />
      <Helmet>
        <title>{`${!isEmpty(term) ? term.title : null} دوره`} </title>
      </Helmet>
      <div className="Courses-img"></div>

      <div className="all-container  d-flex justify-content-center">
        <div className="all-container-box">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 title-box">
                <h3 className="item-title">
                  {!isEmpty(term) ? term.courseDetails.courseName : null}
                </h3>
                <p className="item-text">
                  {!isEmpty(term) ? term.courseDetails.description : null}
                </p>
                <div className="details-details-box ">
                  <ul>
                    {!isEmpty(student) ? (
                      <>
                        <li className=" mx-5 my-1">
                          <i
                            className="bi bi-heart-fill like"
                            style={{ color: changeColor }}
                            onClick={handleLike}
                          >
                            {" "}
                          </i>
                        </li>
                      </>
                    ) : null}

                    <li className="latest-update-box">
                      <i class="bi bi-calendar-check calendar"></i>
                      <span className="details-update"> آخرین بروز رسانی</span>
                      <div href="#" className="details-time">
                        {" "}
                        24/4/1400
                      </div>
                    </li>
                    <li className="student-box">
                      <i class="bi bi-person-fill details-person"> </i>
                      <span className="details-student-text"> دانشجویان</span>
                      <div href="#" className="student-number">
                        {" "}
                        23
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="buy-box">
                  <div className="item-stars">
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                  </div>
                  <button
                    type="submit"
                    class="btn buy-item"
                    onClick={handleAddStudent}
                  >
                    خرید دوره{" "}
                  </button>
                  <div className="item-price">
                    {!isEmpty(term) ? term.cost : null} تومان{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-8 ">
                <div className="item-box">
                  <div className="item-img">
                    <Img
                      src={
                        !isEmpty(term)
                          ? [
                              `${term.courseDetails.image}`,
                              "https://via.placeholder.com/150x100",
                            ]
                          : null
                      }
                      loader={
                        <div className="text-center mx-auto">
                          <ScaleLoader loading={true} color={"#4A90E2"} />
                        </div>
                      }
                    />
                  </div>
                  <div className="item-learn">
                    <h3 className="item-learn-title">
                      مواردی که در این دوره یاد می گیرید
                    </h3>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6  right-check">
                          <ul>
                            <li>
                              <i class="bi bi-check item-check-icon"> </i> ساخت
                              RESTful Api
                            </li>
                            <li>
                              <i class="bi bi-check item-check-icon"></i> طراحی
                              سایت با ساختار MVC{" "}
                            </li>
                            <li>
                              <i class="bi bi-check item-check-icon"></i> ارتباط
                              با انواع پایگاه داده{" "}
                            </li>
                            <li>
                              <i class="bi bi-check item-check-icon"></i> کار با
                              Socket.io
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6 left-check">
                          <ul>
                            <li>
                              <i class="bi bi-check item-check-icon"> </i> امنیت
                              در NodeJs{" "}
                            </li>
                            <li>
                              <i class="bi bi-check item-check-icon"></i> احراز
                              هویت{" "}
                            </li>
                            <li>
                              <i class="bi bi-check item-check-icon"></i> Unit
                              Testing{" "}
                            </li>
                            <li>
                              <i class="bi bi-check item-check-icon"></i> آموزش
                              کار با تمام موتور ها
                            </li>
                          </ul>
                        </div>
                        <div className="col-xl-12">
                          <div className="comments">
                            <h4 className="comments-title">نظرات کاربران</h4>
                            <form onSubmit={handleSubmit}>
                              <textarea
                                type="text"
                                name={comment}
                                className="comments-text"
                                placeholder="دیدگاه خود را وارد کنید"
                                value={comment}
                                onChange={(e) => {
                                  setComment(e.target.value);
                                  validator.current.showMessageFor("comment");
                                }}
                              />
                              {validator.current.message(
                                "comment",
                                comment,
                                "required"
                              )}

                              <button
                                type="submit"
                                className="btn btn-comments my-2"
                              >
                                ثبت دیدگاه
                              </button>
                            </form>
                            <hr className="commenst-hr" />
                            <div className="comment">
                              {!isEmpty(comments)
                                ? comments.map((comment) =>
                                    comment.postId == postId &&
                                    comment.isVerified == true ? (
                                      <div key={comment.id} className="row ">
                                        <div className="col-xl-2">
                                          <div className="comment-avatar">
                                            {" "}
                                          </div>
                                        </div>
                                        <div className="col-xl-10 comment-left-col">
                                          <h6 className="comment-name">
                                            {comment.username}{" "}
                                          </h6>
                                          <div className="comment-text">
                                            {comment.comment}
                                          </div>
                                          {/* <div className="comment-answer">پاسخ :
  
                                                                              </div> */}
                                        </div>
                                        <hr className="commenst-hr my-3" />
                                      </div>
                                    ) : null
                                  )
                                : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="item-details-holder">
                  <ul>
                    <li className="item-detials-text">
                      {" "}
                      <span>
                        <i class="bi bi-people-fill item-details-icon"> </i>{" "}
                        ظرفیت دوره :{" "}
                      </span>
                      {!isEmpty(term) ? term.capacity : null}{" "}
                    </li>
                    <li className="item-detials-text">
                      <span>
                        {" "}
                        <i class="bi bi-person-badge item-details-icon">
                          {" "}
                        </i>{" "}
                        مدرس دوره :{" "}
                      </span>
                      {!isEmpty(term) ? term.teacherDetails.fullName : null}{" "}
                    </li>
                    <li className="item-detials-text">
                      <span>
                        {" "}
                        <i class="bi bi bi-tags-fill item-details-icon"> </i>
                        هزینه دوره :{" "}
                      </span>
                      {!isEmpty(term) ? term.cost : null} تومان
                    </li>
                    <li className="item-detials-text">
                      {" "}
                      <span>
                        <i class="bi bi bi-bookmarks item-details-icon"> </i>
                        دسته بندی :
                      </span>
                      {!isEmpty(term)
                        ? term.courseDetails.topics[0]
                        : null} ,{" "}
                      {!isEmpty(term) ? term.courseDetails.topics[1] : null}{" "}
                    </li>
                    <li className="item-detials-text">
                      {" "}
                      <span>
                        <i class="bi bi-calendar-check item-details-icon"> </i>
                        شروع دوره{" "}
                      </span>
                      {!isEmpty(term) ? term.startDate.substr(0, 10) : null}
                    </li>
                    <li className="item-detials-text">
                      <span>
                        {" "}
                        <i class="bi bi-calendar-x item-details-icon"> </i>{" "}
                        پایان دوره{" "}
                      </span>
                      {!isEmpty(term) ? term.endDate.substr(0, 10) : null}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default SingleTerm;
