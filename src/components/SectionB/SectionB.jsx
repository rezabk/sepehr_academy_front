import "./SectionB.css";
import {
    Link,
} from "react-router-dom";

const SectionB = (props) => {
    return (
        <div className="container " >
            <div className="row" id="courses">
                <div className="col-md-8">
                    <h2 className="courses">دوره ها</h2>
                    <p className="courses-text">دوره مورد نظر خود را پیدا کنید </p>
                </div>
                <div className="col-md-4">
                    <Link to="/Terms">
                        <button type="button" class="btn btn-sectionB">همه دوره ها</button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default SectionB;