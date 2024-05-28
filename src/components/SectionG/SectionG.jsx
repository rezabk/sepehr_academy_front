import "./SectionG.css"
import {
    Link,
} from "react-router-dom";

const SectionG = () => {
    return (
        <div className="container " >
            <div className="row" id="courses">
                <div className="col-md-8">
                    <h2 className="sectionG-title">اخبار و مقالات</h2>

                </div>
                <div className="col-md-4">
                    <Link to="/News">
                        <button to="/News" type="button" class="btn sectionG-btn">همه اخبار</button>
                    </Link>
                </div>

            </div>
        </div>);
}

export default SectionG;