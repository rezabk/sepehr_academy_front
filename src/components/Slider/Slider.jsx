import "./Slider.css";


const Slider = (props) => {
    return (

        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" className="button3" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" className="button2" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="button1 active" aria-current="true" aria-label="Slide 1"></button>
            </div>
            <div className="carousel-inner" >
                <div className="carousel-item active " data-bs-interval="10000">
                    <img src={'https://sepehracademystorage.storage.iran.liara.space/3.jpg'} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5 className="title justify-content-center">آموزشگاه سپهر</h5>
                        <p className="text">بهترین آکادمی آموزش کامل برنامه نویسی</p>
                        <h5 className="title-2">یادگیری سریع برنامه نویسی در آکادمی سپهر </h5>
                        <a href="#courses" className="btn btn-slider">نمایش دوره ها</a>


                    </div>
                </div>
                <div className="carousel-item " data-bs-interval="10000">
                    <img src={'https://sepehracademystorage.storage.iran.liara.space/2.jpg'} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5 className="title justify-content-center">آموزشگاه سپهر</h5>
                        <p className="text">دوره های آنلاین بدون نیاز به حضور</p>
                        <h5 className="title-2">یادگیری سریع برنامه نویسی در آکادمی سپهر </h5>
                        <a href="#courses" className="btn btn-slider">نمایش دوره ها</a>
                    </div>
                </div>
                <div className="carousel-item " data-bs-interval="10000">
                    <img src={'https://sepehracademystorage.storage.iran.liara.space/1.jpg'} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5 className="title justify-content-center">آموزشگاه سپهر</h5>
                        <p className="text">همین حالا با بهترین استاد ها شروع کنید</p>
                        <h5 className="title-2">یادگیری سریع برنامه نویسی در آکادمی سپهر </h5>
                        <a href="#courses" className="btn btn-slider">نمایش دوره ها</a>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    );
}


export default Slider;

