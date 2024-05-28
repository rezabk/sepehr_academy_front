import React from 'react';
import Header from './../common/Header/Header';
import Footer from './../common/Footer/Footer';
import { Link } from 'react-router-dom';
import "./404.css"

const NotFound = () => {
    return (
        <React.Fragment>
            <Header />
            <div className="container notFoundContainer ">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12 ">
                        <img src={'https://sepehracademystorage.storage.iran.liara.space/7aqcppklh6bexoa70320.jpg'} alt="404" />
                        <Link to="/" className="btn btn-404 ">صفحه اصلی</Link>

                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}
export default NotFound;