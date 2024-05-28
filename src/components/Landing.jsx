import React, { Component } from "react";
import Header from "./common/Header/Header";
import Slider from "./Slider/Slider";
import SectionA from "./SectionA/SectionA";
import SectionB from "./SectionB/SectionB";
import SectionC from "./SectionC/SectionC";
import SectionD from "./SectionD/SectionD";
import SectionE from "./SectionE/SectionE";
import SectionF from "./SectionF/SectionF";
import ContactUs from "./common/ContactUs/ContactUs";
import Scroll from "./common/ScrollToTop/Scroll";
import Footer from "./common/Footer/Footer";
import SectionG from "./SectionG/SectionG";
import SectionH from "./SectionH/SectionH";
import { Helmet } from "react-helmet";

import "./Landing.css";
import AdminContext from "./context/AdminContext";
class Landing extends Component {
  render() {
    return (
      <React.Fragment>
        <AdminContext>
          <Helmet>
            <title>آموزشگاه سپهر | صفحه اصلی </title>
          </Helmet>
          <Header />
          <Slider />
          <SectionA />
          <SectionB />
          <SectionC />
          <SectionG />
          <SectionH />
          <SectionD />
          <SectionE />
          <SectionF />
          <ContactUs />
          <Scroll />
          <Footer />
        </AdminContext>
      </React.Fragment>
    );
  }
}

export default Landing;
