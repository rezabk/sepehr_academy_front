import React, { useState,useContext } from "react";
import Header from "./../common/Header/Header";
import Footer from "./../common/Footer/Footer";
import { Helmet } from "react-helmet";
import { paginate } from "./../../core/utils/paginate";
import Pagination from "./../common/Pagination/Pagination";
import { Link } from "react-router-dom";
import Img from "react-image";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./News.css";
import Scroll from "./../common/ScrollToTop/Scroll";
import { dashContext } from './../context/dashContext';

const News = () => {
  const context = useContext(dashContext);
  const {newsData} = context;

  const [perPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
   const archiveNews = paginate(newsData, currentPage, perPage);

  return (
    <React.Fragment>
      <Header />
      <Helmet>
        <title>آموزشگاه سپهر | اخبار و مقالات</title>
      </Helmet>
      <div className="news-img"></div>
      <div className="Courses-title"> اخبار و مقالات</div>

      <div className="container news-container">
        <div className="row d-flex justify-content-center">
          {archiveNews.map((news) => (
            <div className="col-lg-4 col-md-6">
              <div class="card sehctionH-card my-3 mx-4">
                <div className="sehctionH-card-img">
                  <Img
                    src={[
                      `${news.image}  `,
                      "https://via.placeholder.com/150x100",
                    ]}
                    className="card-img-top"
                    loader={
                      <div className="text-center mx-auto">
                        <ScaleLoader loading={true} color={"#4A90E2"} />
                      </div>
                    }
                  />
                </div>
                <div class="card-body sehctionH-card-body">
                  <h5 class="card-title sehctionH-card-title">{news.title}</h5>
                  <div className="card-sehctionH-details my-4">
                    <Link to="" style={{ color: "#252525" }}>
                      اطلاعات بیشتر{" "}
                    </Link>
                    <i class="bi bi-arrow-left"> </i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Scroll />
      </div>
      <Pagination
        totalCourse={newsData.length}
        currentPage={currentPage}
        perPage={perPage}
        onPageChange={handlePageChange}
      />
      <Footer />
    </React.Fragment>
  );
};

export default News;
