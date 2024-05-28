import React, { useEffect, useRef, useState, useContext } from "react";
import Header from "./../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import "./singleNews.css";
import { isEmpty } from "lodash";
import simpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { sendCommentNews } from "./../../../core/services/commentServices";
import { dashContext } from "./../../context/dashContext";
import { getNew } from "../../../core/services/newsServices";
const SingleNews = ({ match }) => {
  const context = useContext(dashContext);
  const { student, commentNews } = context;

  const postId = match.params.id;

  const [news, setNews] = useState();

  useEffect(async () => {
    await getNew(postId)
      .then((res) => {
        setNews(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

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
      email: student != null ? student.id : null,
      comment,
      postId,
    };
    if (localStorage.getItem("employee")) {
      return toast.error("شما کارمند هستید و نمی توانید کامنت ثبت کنید");
    }
    if (localStorage.getItem("user")) {
      try {
        if (validator.current.allValid()) {
          const { status } = await sendCommentNews(comments);
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

  return (
    <React.Fragment>
      <Header />
      <div className="news-img"></div>
      <div className="news-all-container d-flex justify-content-center">
        <div className="container">
          <div className="row ">
            <div className=" col-xl-8 ">
              <div className="card singleNews-card">
                <img
                  src={!isEmpty(news) ? news.image : null}
                  class="card-img-top"
                  alt="..."
                />
                <div className="news-details">
                  <ul className="d-flex">
                    <li className="news-category-box">
                      <i class="bi bi-folder folder"></i>
                      <span className="news-category">دسته بندی</span>
                      <div className="news-category-text">
                        {!isEmpty(news) ? news.category : null}
                      </div>
                    </li>

                    <li className="news-category-box">
                      <i class="bi bi-eye eye"></i>
                      <span className="news-view">بازدید</span>
                      <div className="news-view-text">1200</div>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <h5 className="card-title singleNews-card-title">
                    {!isEmpty(news) ? news.title : null}
                  </h5>
                  <p className="card-text singleNews-card-text">
                    {!isEmpty(news) ? news.text : null}
                  </p>
                </div>
              </div>
            </div>

            <div className=" col-xl-12 my-5 mx-auto">
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
                  {validator.current.message("comment", comment, "required")}

                  <button type="submit" className="btn btn-comments my-2">
                    ثبت دیدگاه
                  </button>
                </form>
                <hr className="commenst-hr" />
                <div className="comment">
                  {!isEmpty(commentNews)
                    ? commentNews.map((comment) =>
                        comment.postId == postId &&
                        comment.isVerified == true ? (
                          <div key={comment.id} className="row ">
                            <div className="col-xl-2">
                              <div className="comment-avatar"> </div>
                            </div>
                            <div className="col-xl-10 comment-left-col">
                              <h6 className="comment-name">{comment.email} </h6>
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
      <Footer />
    </React.Fragment>
  );
};

export default SingleNews;
