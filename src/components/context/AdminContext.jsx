import { useState, useEffect } from "react";
import { dashContext } from "./dashContext";
import { paginate } from "./../../core/utils/paginate";
import { orderBy } from "lodash";
import NewTermDialog from "./../PANEL/admin/dialogs/NewTermDialog";
import NewCourseDialog from "./../PANEL/admin/dialogs/NewCourseDialog";
import NewNewsDialog from "./../PANEL/admin/dialogs/NewNewsDialog";
import NewTeacherDialog from "./../PANEL/admin/dialogs/NewTeacherDialog";
import EditCourseDialog from "./../PANEL/admin/dialogs/EditCourseDialog";
import EditTermDialog from "./../PANEL/admin/dialogs/EditTermDialog";
import EditNewsDialog from "./../PANEL/admin/dialogs/EditNewsDialog";
import EditTeacherDialog from "./../PANEL/admin/dialogs/EditTeacherDialog";
import EditAdminDetailsDialog from "./../PANEL/admin/dialogs/EditAdminDetailsDialog";
import DeleteCourseDialog from "./../PANEL/admin/dialogs/DeleteCourseDialog";
import DeleteTermDialog from "./../PANEL/admin/dialogs/DeleteTermDialog";
import DeleteNewsDialog from "./../PANEL/admin/dialogs/DeleteNewsDialog";
import DeleteTeacherDialog from "./../PANEL/admin/dialogs/DeleteTeacherDialog";
import AnswerCommentDialog from "./../PANEL/admin/dialogs/AnswerCommentDialog";
import TermsCommentDialog from "../PANEL/admin/dialogs/TermsCommentDialog";
import NewsCommentDialog from "../PANEL/admin/dialogs/NewsCommentDialog";
import EditStudentDialog from "./../PANEL/admin/dialogs/EditStudentDialog";
import DeleteStudentDialog from "./../PANEL/admin/dialogs/DeleteStudentDialog";
import TermsDetailsDialog from "../PANEL/admin/dialogs/TermsDetailsDialog";
import DeleteStudentFromTermDialog from "./../PANEL/admin/dialogs/DeleteStudentFromTermDialog";
import AddStudentToTermDialog from "./../PANEL/admin/dialogs/AddStudentToTermDialog";
import EditStudentDetailsDialog from "../PANEL/student/dialogs/EditStudentDetailsDialog";

import { getNews } from "./../../core/services/newsServices";
import { getCourses } from "./../../core/services/coursesServices";
import { getTerms } from "./../../core/services/termServices";
import {
  getTeacher,
  getTeachers,
} from "./../../core/services/teachersServices";
import { getStudent } from "../../core/services/studentsServices";
import { decodeToken } from "./../../core/utils/decodeToken";
import { getStudents } from "./../../core/services/studentsServices";
import {
  getComments,
  getCommentsNews,
} from "./../../core/services/commentServices";
import { contactUsGetAll } from "../../core/services/contactUsServices";

const AdminContext = ({ children }) => {
 

  const [user, setUser] = useState();
  const [employee, setEmployee] = useState();
  const [student, setStudent] = useState();

  const token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);

  const [fetchUser, setFetchUser] = useState(false);
  useEffect(async () => {
    if (decodedToken != null) {
      if (decodedToken.payload.role == "student")
        await getStudent(decodedToken.payload.name)
          .then((res) => {
            setFetchUser(false);
            setStudent(res.data.result);
            setUser(res.data.result);
            localStorage.setItem("user", true);
            localStorage.setItem("userId", res.data.result.id);
          })
          .catch((err) => console.log(err));
    }
  }, [fetchUser == true]);

  useEffect(async () => {
    if (decodedToken != null) {
      if (
        decodedToken.payload.role == "teacher" ||
        decodedToken.payload.role == "admin"
      ) {
        await getTeacher(decodedToken.payload.name)
          .then((res) => {
            setFetchUser(false);
            setEmployee(res.data.result);
            setUser(res.data.result);
            localStorage.setItem("employee", true);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [fetchUser == true]);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  const [search, setSearch] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [termList, setTermList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentNews, setCommentNews] = useState([]);
  const [contactUs, setContactUs] = useState([]);

  const [fetchCourse, setFetchCourse] = useState(false);
  useEffect(async () => {
    await getCourses()
      .then((res) => {
        setFetchCourse(false);
        setCourseList(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [fetchCourse == true]);

  const [fetchTerm, setFetchTerm] = useState(false);
  useEffect(async () => {
    await getTerms()
      .then((res) => {
        setFetchTerm(false);
        setTermList(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [fetchTerm == true]);

  const [fetchNews, setFetchNews] = useState(false);
  useEffect(async () => {
    await getNews()
      .then((res) => {
        setFetchNews(false);
        setNewsList(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [fetchNews == true]);

  const [fetchTeachers, setFetchTeachers] = useState(false);
  useEffect(async () => {
    if (decodedToken != null) {
      if (decodedToken.payload.role == "admin") {
        await getTeachers()
          .then((res) => {
            setFetchTeachers(false);
            setTeachersList(res.data.result);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [fetchTeachers == true]);

  const [fetchStudents, setFetchStudents] = useState(false);
  useEffect(async () => {
    if (decodedToken != null) {
      if (decodedToken.payload.role == "admin") {
        await getStudents()
          .then((res) => {
            setFetchStudents(false);
            setStudentsList(res.data.result);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [fetchStudents == true]);

  const [fetchComments, setFetchComments] = useState(false);
  useEffect(async () => {
    await getComments()
      .then((res) => {
        setFetchComments(false);
        setComments(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [fetchComments == true]);

  useEffect(async () => {
    await getCommentsNews()
      .then((res) => {
        setFetchComments(false);
        setCommentNews(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [fetchComments == true]);

  const [fetchContactUs, setFetchContactUs] = useState(false);
  useEffect(async () => {
    if (decodedToken != null) {
      if (decodedToken.payload.role == "admin") {
        await contactUsGetAll()
          .then((res) => {
            setFetchContactUs(false);
            setContactUs(res.data.result);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [fetchContactUs == true]);


  const [newCourseDialog, setNewCourseDialog] = useState(false);
  const [newTermDialog, setNewTermDialog] = useState(false);
  const [newNewsDialog, setNewNewsDialog] = useState(false);
  const [newTeacherDialog, setNewTeacherDialog] = useState(false);
  const [answerCommentDialog, setAnswerCommentDialog] = useState(false);

  const openNewCourseDialog = () => setNewCourseDialog(true);
  const openNewTermDialog = () => setNewTermDialog(true);
  const openNewNewsDialog = () => setNewNewsDialog(true);
  const openNewTeacherDialog = () => setNewTeacherDialog(true);
  const openAnswerCommentDialog = () => setAnswerCommentDialog(true);

  const closeNewCourseDialog = () => setNewCourseDialog(false);
  const closeNewTermDialog = () => setNewTermDialog(false);
  const closeNewNewsDialog = () => setNewNewsDialog(false);
  const closeNewTeacherDialog = () => setNewTeacherDialog(false);
  const closeAnswerCommentDialog = () => setAnswerCommentDialog(false);

  const [termsCommentDialog, setTermsCommentDialog] = useState(false);

  const openTermsCommentDialog = (term) => {
    setTermsCommentDialog(true);
    setCurrentTerm(term);
  };
  const closeTermsCommentDialog = () => setTermsCommentDialog(false);

  const [newsCommentDialog, setNewsCommentDialog] = useState(false);

  const openNewsCommentDialog = (news) => {
    setNewsCommentDialog(true);
    setCurrentNews(news);
  };
  const closeNewsCommentDialog = () => setNewsCommentDialog(false);

  const [currentCourse, setCurrentCourse] = useState({});
  const [editCourseDialog, setEditCourseDialog] = useState(false);

  const openEditCourseDialog = (course) => {
    setEditCourseDialog(true);
    setCurrentCourse(course);
  };
  const closeEditCourseDialog = () => setEditCourseDialog(false);

  const [currentTerm, setCurrentTerm] = useState({});
  const [editTermDialog, setEditTermDialog] = useState(false);

  const openEditTermDialog = (term) => {
    setEditTermDialog(true);
    setCurrentTerm(term);
  };
  const closeEditTermDialog = () => setEditTermDialog(false);

  const [termsDetailsDialog, setTermsDetailsDialog] = useState(false);

  const openTermsDetailsDialog = (term, student) => {
    setTermsDetailsDialog(true);
    setCurrentTerm(term);
    setCurrentStudent(student);
  };
  const closeTermsDetailsDialog = () => setTermsDetailsDialog(false);

  const [currentNews, setCurrentNews] = useState({});
  const [editNewsDialog, setEditNewsDialog] = useState(false);

  const openEditNewsDialog = (news) => {
    setEditNewsDialog(true);
    setCurrentNews(news);
  };
  const closeEditNewsDialog = () => setEditNewsDialog(false);

  const [currentTeacher, setCurrentTeacher] = useState({});
  const [editTeacherDialog, setEditTeacherDialog] = useState(false);

  const openEditTeacherDialog = (teacher) => {
    setEditTeacherDialog(true);
    setCurrentTeacher(teacher);
  };
  const closeEditTeacherDialog = () => setEditTeacherDialog(false);

  const [currentStudent, setCurrentStudent] = useState({});
  const [editStudentDialog, setEditStudentDialog] = useState(false);

  const openEditStudentDialog = (student) => {
    setEditStudentDialog(true);
    setCurrentStudent(student);
  };
  const closeEditStudentDialog = () => setEditStudentDialog(false);

  const [currentEmployee, setCurrentEmployee] = useState({});
  const [editAdminDetailsDialog, setEditAdminDetailsDialog] = useState(false);

  const openEditAdminDetailsDialog = (employee) => {
    setEditAdminDetailsDialog(true);
    setCurrentEmployee(employee);
  };
  const closeEditAdminDetailsDialog = () => setEditAdminDetailsDialog(false);

  const [editStudentDetailsDialog, setEditStudentDetailsDialog] =
    useState(false);

  const openEditStudentDetailsDialog = (student) => {
    setEditStudentDetailsDialog(true);
    setCurrentStudent(student);
  };
  const closeEditStudentDetailsDialog = () =>
    setEditStudentDetailsDialog(false);

  const [deleteCourseDialog, setDeleteCourseDialog] = useState(false);
  const openDeleteCourseDialog = (course) => {
    setDeleteCourseDialog(true);
    setCurrentCourse(course);
  };
  const closeDeleteCourseDialog = () => setDeleteCourseDialog(false);

  const [deleteTermDialog, setDeleteTermDialog] = useState(false);
  const openDeleteTermDialog = (term) => {
    setDeleteTermDialog(true);
    setCurrentTerm(term);
  };
  const closeDeleteTermDialog = () => setDeleteTermDialog(false);

  const [deleteNewsDialog, setDeleteNewsDialog] = useState(false);
  const openDeleteNewsDialog = (news) => {
    setDeleteNewsDialog(true);
    setCurrentNews(news);
  };

  const sortTermsAsc = () => {
    setTermList(orderBy(termList, "cost", "asc"));
  };
  const sortTermsDes = () => {
    setTermList(orderBy(termList, "cost", "desc"));
  };

  const closeDeleteNewsDialog = () => setDeleteNewsDialog(false);

  const [deleteTeacherDialog, setDeleteTeacherDialog] = useState(false);
  const openDeleteTeacherDialog = (teacher) => {
    setDeleteTeacherDialog(true);
    setCurrentTeacher(teacher);
  };
  const closeDeleteTeacherDialog = () => setDeleteTeacherDialog(false);

  const [deleteStudentDialog, setDeleteStudentDialog] = useState(false);
  const openDeleteStudentDialog = (student) => {
    setDeleteStudentDialog(true);
    setCurrentStudent(student);
  };
  const closeDeleteStudentDialog = () => setDeleteStudentDialog(false);

  const [deleteStudentFromTermDialog, setDeleteStudentFromTermDialog] =
    useState(false);

  const openDeleteStudentFromTermDialog = () => {
    setDeleteStudentFromTermDialog(true);
    // setCurrentTerm(term);
    // setCurrentStudent(student)
  };
  const closeDeleteStudentFromTermDialog = () =>
    setDeleteStudentFromTermDialog(false);

  const [addStudentToTermDialog, setAddStudentToTermDialog] = useState(false);

  const openAddStudentToTermDialog = (term) => {
    setAddStudentToTermDialog(true);
    setCurrentTerm(term);
    // setCurrentStudent(student)
  };
  const closeAddStudentToTermDialog = () => setAddStudentToTermDialog(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredTerms =
    termList != null
      ? termList.filter((term) => term.title.includes(search))
      : null;

  const termsData = paginate(filteredTerms, currentPage, perPage);

  const filteredCourses =
    courseList != null
      ? courseList.filter((course) => course.courseName.includes(search))
      : null;

  const coursesData = paginate(filteredCourses, currentPage, perPage);

  const filteredNews =
    newsList != null
      ? newsList.filter((news) => news.title.includes(search))
      : null;

  const newsData = paginate(filteredNews, currentPage, perPage);

  const filteredTeachers =
    teachersList != null
      ? teachersList.filter((teacher) => teacher.fullName.includes(search))
      : null;

  const teachersData = paginate(filteredTeachers, currentPage, perPage);

  const filteredStudents =
    studentsList != null
      ? studentsList.filter((student) => student.fullName.includes(search))
      : null;

  const studentsData = paginate(filteredStudents, currentPage, perPage);

  const filteredContactUs =
    contactUs != null
      ? contactUs.filter((contact) => contact.message.includes(search))
      : null;

  const contactUsData = paginate(filteredContactUs, currentPage, perPage);
  return (
    <dashContext.Provider
      value={{
        contactUs,
        user,
        student,
        employee,
        fetchUser,
        fetchStudents,
        currentPage,
        perPage,
        handlePageChange,
        termsData,
        coursesData,
        teachersData,
        studentsData,
        newsData,
        setSearch,
        setFetchContactUs,
        setFetchUser,
        setFetchCourse,
        setFetchTerm,
        setFetchNews,
        setFetchTeachers,
        setFetchStudents,
        setFetchComments,
        filteredCourses,
        filteredTerms,
        filteredNews,
        filteredTeachers,
        filteredStudents,
        comments,
        commentNews,
        filteredContactUs,
        contactUsData,
        sortTermsAsc,
        sortTermsDes,
        openNewCourseDialog,
        openNewTermDialog,
        openNewNewsDialog,
        openNewTeacherDialog,
        openEditCourseDialog,
        openEditTermDialog,
        openEditNewsDialog,
        openEditTeacherDialog,
        openEditStudentDialog,
        openEditAdminDetailsDialog,
        openEditStudentDetailsDialog,
        openDeleteCourseDialog,
        openDeleteTermDialog,
        openDeleteNewsDialog,
        openDeleteTeacherDialog,
        openDeleteStudentDialog,
        openDeleteStudentFromTermDialog,
        openTermsCommentDialog,
        openNewsCommentDialog,
        openTermsDetailsDialog,
        openAddStudentToTermDialog,
        openAnswerCommentDialog,
      }}
    >
      <NewCourseDialog
        showDialog={newCourseDialog}
        closeDialog={closeNewCourseDialog}
      />
      <NewTermDialog
        showDialog={newTermDialog}
        closeDialog={closeNewTermDialog}
      />
      <NewNewsDialog
        showDialog={newNewsDialog}
        closeDialog={closeNewNewsDialog}
      />
      <NewTeacherDialog
        showDialog={newTeacherDialog}
        closeDialog={closeNewTeacherDialog}
      />
      <EditCourseDialog
        showDialog={editCourseDialog}
        closeDialog={closeEditCourseDialog}
        course={currentCourse}
      />
      <EditTermDialog
        showDialog={editTermDialog}
        closeDialog={closeEditTermDialog}
        term={currentTerm}
      />
      <EditNewsDialog
        showDialog={editNewsDialog}
        closeDialog={closeEditNewsDialog}
        news={currentNews}
      />
      <EditTeacherDialog
        showDialog={editTeacherDialog}
        closeDialog={closeEditTeacherDialog}
        teacher={currentTeacher}
      />
      <EditStudentDialog
        showDialog={editStudentDialog}
        closeDialog={closeEditStudentDialog}
        student={currentStudent}
      />
      <EditAdminDetailsDialog
        showDialog={editAdminDetailsDialog}
        closeDialog={closeEditAdminDetailsDialog}
        employee={currentEmployee}
      />
      <EditStudentDetailsDialog
        showDialog={editStudentDetailsDialog}
        closeDialog={closeEditStudentDetailsDialog}
        student={currentStudent}
      />
      <DeleteCourseDialog
        showDialog={deleteCourseDialog}
        closeDialog={closeDeleteCourseDialog}
        course={currentCourse}
      />
      <DeleteTermDialog
        showDialog={deleteTermDialog}
        closeDialog={closeDeleteTermDialog}
        term={currentTerm}
      />
      <DeleteNewsDialog
        showDialog={deleteNewsDialog}
        closeDialog={closeDeleteNewsDialog}
        singleNews={currentNews}
      />
      <DeleteTeacherDialog
        showDialog={deleteTeacherDialog}
        closeDialog={closeDeleteTeacherDialog}
        teacher={currentTeacher}
      />
      <DeleteStudentDialog
        showDialog={deleteStudentDialog}
        closeDialog={closeDeleteStudentDialog}
        student={currentStudent}
      />
      <DeleteStudentFromTermDialog
        showDialog={deleteStudentFromTermDialog}
        closeDialog={closeDeleteStudentFromTermDialog}
        student={currentStudent}
        term={currentTerm}
      />
      <AddStudentToTermDialog
        showDialog={addStudentToTermDialog}
        closeDialog={closeAddStudentToTermDialog}
        student={currentStudent}
        term={currentTerm}
      />
      <TermsCommentDialog
        showDialog={termsCommentDialog}
        closeDialog={closeTermsCommentDialog}
        term={currentTerm}
      />
      <NewsCommentDialog
        showDialog={newsCommentDialog}
        closeDialog={closeNewsCommentDialog}
        singleNews={currentNews}
      />
      <TermsDetailsDialog
        showDialog={termsDetailsDialog}
        closeDialog={closeTermsDetailsDialog}
        students={currentStudent}
        term={currentTerm}
      />
      <AnswerCommentDialog
        showDialog={answerCommentDialog}
        closeDialog={closeAnswerCommentDialog}
      />
      {children}
    </dashContext.Provider>
  );
};

export default AdminContext;
