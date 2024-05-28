import { createContext } from "react";

export const dashContext = createContext({
  student: {},

  employee: {},

  currentPage: 1,

  setCurrentPage: () => {},

  perPage: 5,

  handlePageChange: () => {},

  currentCourse: {},

  currentTerm: {},

  currentNews: {},

  currentTeacher: {},

  currentStudent: {},

  currentEmployee: {},

  setSearch: () => {},

  setFetchContactUs: () => {},

  setFetchUser: () => {},

  setFetchCourse: () => {},

  setFetchTerm: () => {},

  setFetchNews: () => {},

  setFetchTeachers: () => {},

  setFetchStudents: () => {},

  setFetchComments: () => {},

  openNewCourseDialog: () => {},

  openNewTermDialog: () => {},

  openNewNewsDialog: () => {},

  openNewTeacherDialog: () => {},

  openEditCourseDialog: () => {},

  openEditTermDialog: () => {},

  openEditNewsDialog: () => {},

  openEditTeacherDialog: () => {},

  openEditStudentDialog: () => {},

  openEditAdminDetailsDialog: () => {},

  openEditStudentDetailsDialog: () => {},

  openDeleteCourseDialog: () => {},

  openDeleteTermDialog: () => {},

  openDeleteNewsDialog: () => {},

  openDeleteTeacherDialog: () => {},

  openDeleteStudentDialog: () => {},

  openDeleteStudentFromTermDialog: () => {},

  openAddStudentToTermDialog: () => {},

  openAnswerCommentDialog: () => {},

  openTermsCommentDialog: () => {},

  openNewsCommentDialog: () => {},

  openTermsDetailsDialog: () => {},

  termsData: [],

  coursesData: [],

  newsData: [],

  teachersData: [],

  studentsData: [],

  filteredCourses: [],

  sortTermAsc: () => {},

  sortTermDes: () => {},
});
