import { useEffect } from 'react';
import "./SectionA.css";
import Aos from "aos";
import "aos/dist/aos.css";

const SectionA = (props) => {

    useEffect(() => {
        Aos.init({});
    }, [])






    return (
        <div className="container">
            <div className="row">
                <div className=" col-lg-6 col-md-6 ">
                    <div className="right-column">
                        <div data-aos-duration="2000" data-aos="fade-left" className="services">خدمات</div>
                        <div data-aos-duration="2000" data-aos="fade-left" className="services-text">
                            تمام آنچه برای یک برنامه نویس کامل شدن را نیاز دارید
                            ما در پژوهشگاه سپهر در اختیار شما قرار می دهیم
                        </div>
                        <div className="card right-column-card card-a" >

                            <div className="card-body">
                                <h5 data-aos-duration="2000" data-aos="fade-up" className="card-title">مشاوره</h5>

                            </div>
                        </div>

                        <div className="card right-column-card card-b" >

                            <div className="card-body">
                                <h5 data-aos-duration="2000" data-aos="fade-up" className="card-title">فرصت شغلی</h5>

                            </div>
                        </div>

                        <div className="card right-column-card card-c" >

                            <div className="card-body">
                                <h5 data-aos-duration="2000" data-aos="fade-up" className="card-title">مدرک معتبر</h5>

                            </div>
                        </div>

                        <div className="card right-column-card card-d" >

                            <div className="card-body">
                                <h5 data-aos-duration="2000" data-aos="fade-up" className="card-title">امتحان</h5>

                            </div>
                        </div>

                    </div>


                </div>
                <div className=" col-lg-6 col-md-6 ">
                    <div className="left-column">
                        <img data-aos-duration="2000" data-aos="fade-right" src={require('../../assets/img/6.jpg').default} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SectionA;