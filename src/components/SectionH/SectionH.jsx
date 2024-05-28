import { useContext } from 'react';
import { paginate } from './../../core/utils/paginate';
import { Link } from 'react-router-dom';
import Img from 'react-image'
import ScaleLoader from "react-spinners/ScaleLoader";
import "./SectionH.css";
import { dashContext } from './../context/dashContext';

const SectionH = () => {

    const context = useContext(dashContext)
    const {newsData} = context;


    const indexNews = paginate(newsData, 1, 3)
    return (
        <div className="container sehctionH-container">
            <div className="row d-flex justify-content-center">
                {indexNews.map((news) => (

                    <div className="col-lg-4 col-md-6 ">
                        <Link to={`/News/${news.id}`}>
                            <div class="card sehctionH-card my-3 mx-4" >
                                <div className="sehctionH-card-img">

                                    <Img
                                        src={[`${news.image}  `,
                                            "https://via.placeholder.com/150x100"]}
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

                                        <Link to="/News/Single/news" style={{ color: '#252525' }}  >اطلاعات بیشتر   </Link>
                                        <i class="bi bi-arrow-left">  </i>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}



            </div>
        </div>

    );
}

export default SectionH;