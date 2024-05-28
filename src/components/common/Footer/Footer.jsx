import React, { Component } from 'react';

import "./Footer.css";

const Footer = () => {
    return (
        <React.Fragment>
            <div className="footer d-flex justify-content-center">
                <div className="footer-details">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="footer-support" >
                                <ul>
                                    <h5 className="footer-contactUs">ارتباط با ما </h5>
                                    <li className="footer-location my-4" >
                                        <i class="bi bi-geo-alt location-icon ">  </i>

                                        مازندران.ساری.میدان ساعت.آموزشگاه سپهر
                                    </li>
                                    <li className="footer-phoneNumber my-3">
                                        <i class="bi bi-telephone-plus-fill footer-phoneNumber-icon">     </i>
                                        09122111526
                                    </li>
                                    <li className="footer-email" >
                                        <i class="bi bi-envelope footer-email-icon">     </i>
                                        sepehr@gmail.com
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="footer-academy ">
                                <h5 className="footer-academy-title"> آموزشگاه سپهر</h5>
                                <ul>
                                    <li > انجمن های پژوهشگاه </li>
                                    <li > دوره پاییز </li>
                                    <li > دوره ریکت </li>
                                    <li >دکتر بحرالعلومی </li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="footer-news">
                                <h5 className="footer-news-title"> عضویت در خبرنامه</h5>
                                <div className="footer-news-text"> برای اطلاع از آخرین اخبار و دوره های پژوهشگاه، در خبرنامه ما عضو شوید</div>
                                <form>
                                    <label for="footer-email" className="footer-input-label "> لطفا ایمیل خود را وارید کنید :</label>
                                    <input type="email" id="footer-email" placeholder="ایمیل" />
                                    <button type="submit" class="btn btn-primary footer-btn">عضویت در خبرنامه</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="copyRights  ">
                <img src={require("../../../assets/img/logo/avatar-1.png").default} alt="..." />
                <h6 className="copyRights-text">تمامی حقوق مادی و معنوی متعلق به آموزشگاه سپهر میباشد </h6>
            </div>
        </React.Fragment>
    );
}

export default Footer;
