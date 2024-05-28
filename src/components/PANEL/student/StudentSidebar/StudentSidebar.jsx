import { NavLink, withRouter, } from "react-router-dom";



const StudentSidebar = () => {


    const userString = localStorage.getItem("user")
    const user = JSON.parse(userString)

    return (
        <div>
            <ul className="nav navbar-nav side-nav dashboard-sidebar " >
                <li

                >
                    <NavLink to={`/studentDashboard/studentDetails/`}
                        className="dashboard-text"
                        activeClassName="dashboard-text-active"
                    >
                        <i className="fa fa-fw fa-dashboard"></i> داشبورد
                    </NavLink>
                </li>
                <li

                >
                    <NavLink to={`/studentDashboard/studentCourses/`}
                        className="dashboard-text"
                        activeClassName="dashboard-text-active"
                    >
                        <i className="fa fa-fw fa-graduation-cap"></i> دوره ها
                    </NavLink>
                </li>


            </ul>

        </div>
    );
};

export default withRouter(StudentSidebar);
