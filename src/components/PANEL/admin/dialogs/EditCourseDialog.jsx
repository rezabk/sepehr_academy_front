import { useEffect, useState, useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { errorMessage, successMessage } from "./../../../../core/utils/message";
import FormData from "form-data";
import { isEmpty } from "lodash";
import { postImage } from "./../../../../core/services/uploadServices";
import {
  updateCourse,
  updateCourseAdmin,
} from "../../../../core/services/coursesServices";

import { dashContext } from "./../../../context/dashContext";

const EditCourseDialog = ({ showDialog, closeDialog, course }) => {


  const context = useContext(dashContext);
  const { employee, teachersData ,setFetchCourse} = context;

  const [courseId, setCourseId] = useState();
  const [courseName, setCourseName] = useState();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [theArray, setTheArray] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [teacherId, setTeacherId] = useState();

  const addEntryClick = () => {
    setTheArray([...theArray, inputValue]);
    setInputValue("");
  };

  const removeTopic = (curVal) => {
    const newArray = [...theArray];
    setTheArray(newArray.filter((value) => value !== curVal));
  };

  useEffect(() => {
    setCourseId(course.id);
    setCourseName(course.courseName);
    setImage(course.image);
    setTheArray(course.topics);
    setDescription(course.description);
    setTeacherId(course.teacherId);

    return () => {
      setCourseId();
      setCourseName();
      setImage();
      setTheArray();
      setDescription();
      setTeacherId();
    };
  }, [showDialog, closeDialog, course]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (employee != null && employee.role == "teacher") {
      try {
        let course = {};

        let data = new FormData();
        if (event.target.image.files[0]) {
          data.append("image", event.target.image.files[0]);
          const Data = await postImage(data);
          course = {
            courseName,
            topics: theArray,
            description,
            image: Data.data.result,
          };
        } else
          course = {
            courseName,
            topics: theArray,
            description,
            image,
          };

        const { status } = await updateCourse(courseId, course);

        if (status === 201) {
          setFetchCourse(true);
          successMessage("   دوره با موفقیت ویرایش شد");
          closeDialog();
        }
      } catch (ex) {
        console.log(ex);
        errorMessage("مشکلی پیش آمده.");
      }
    }
    if (employee != null && employee.role == "admin") {
      try {
        let course = {};

        let data = new FormData();
        if (event.target.image.files[0]) {
          data.append("image", event.target.image.files[0]);
          const Data = await postImage(data);
          course = {
            courseName,
            topics: theArray,
            description,
            image: Data.data.result,
            teacherId: teacherId,
          };
        } else
          course = {
            courseName,
            topics: theArray,
            description,
            image,
            teacherId: teacherId,
          };

        const { status } = await updateCourseAdmin(courseId, course);

        if (status === 201) {
          setFetchCourse(true);
          successMessage("   دوره با موفقیت ویرایش شد");
          closeDialog();
        }
      } catch (ex) {
        console.log(ex);
        errorMessage("مشکلی پیش آمده.");
      }
    }
  };

  return (
    <DialogOverlay
      isOpen={showDialog}
      onDismiss={closeDialog}
      style={{ background: "hsla(0, 100%, 100%, 0.9)" }}
    >
      <DialogContent
        style={{
          border: "solid 5px hsla(0, 0%, 0%, 0.5)",
          borderRadius: "10px",
          boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)",
        }}
      >
        <div className="inner form-layer">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="courseName"
              style={{ marginBottom: 3 }}
              className="form-control"
              placeholder="نام دوره"
              aria-describedby="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            <div className=" d-flex">
              <input
                type="text"
                name="inputValue"
                style={{ marginBottom: 3, width: "80%" }}
                className="form-control"
                placeholder="  تاپیک ها "
                aria-describedby="topics"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={addEntryClick}
                style={{ height: "35px", marginTop: "2px", marginRight: "3px" }}
              >
                افزودن
              </button>
            </div>
            {!isEmpty(theArray)
              ? theArray.map((theArray, index) => (
                  <div
                    type="button"
                    key={index}
                    onClick={() => removeTopic(theArray)}
                    style={{
                      display: "inline-block",
                      height: "30px",
                      fontSize: "14px",
                      marginRight: "5px",
                      marginTop: "5px",
                      marginBottom: "5px",
                      padding: "5px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    {theArray}
                  </div>
                ))
              : null}
            <input
              type="file"
              name="image"
              style={{ marginBottom: 3 }}
              className="form-control mb-2"
              aria-describedby="image"
              // onChange={onChangeHandler}
            />

            <textarea
              name="description"
              placeholder="توضیحات دوره"
              className="form-control"
              style={{ marginBottom: 3 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {!isEmpty(employee) ? (
              employee.role == "admin" ? (
                <select
                  style={{ marginTop: "5px" }}
                  class="form-select"
                  aria-label="Default select example"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                >
                  <option selected> انتخاب معلم</option>
                  {!isEmpty(teachersData)
                    ? teachersData.map((teacher) => (
                        <option value={teacher.id}>{teacher.fullName}</option>
                      ))
                    : null}
                </select>
              ) : null
            ) : null}

            <button
              type="submit"
              className="btn btn-success "
              style={{ margin: "1em" }}
            >
              ویرایش دوره
            </button>
            <button
              className="btn btn-warning mr-5"
              style={{ margin: "1em" }}
              onClick={closeDialog}
            >
              انصراف
            </button>
          </form>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default EditCourseDialog;
