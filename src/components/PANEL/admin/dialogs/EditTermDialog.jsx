import { useState, useEffect, useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { successMessage, errorMessage } from "./../../../../core/utils/message";
import { updateTerm } from "./../../../../core/services/termServices";
import { isEmpty } from "lodash";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { dashContext } from "./../../../context/dashContext";

const EditTermDialog = ({ showDialog, closeDialog, term }) => {


  const context = useContext(dashContext);

  const { coursesData, newsData, termsData, teachersData ,setFetchTerm} = context;

  const [termId, setTermId] = useState();
  const [title, setTitle] = useState();
  const [cost, setCost] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [capacity, setCapacity] = useState();
  const [duration, setDuration] = useState();
  const [courseId, setCourseId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayE, setSelectedDayE] = useState(null);

  const startDatee = !isEmpty(selectedDay)
    ? selectedDay.year + "/" + selectedDay.month + "/" + selectedDay.day
    : null;

  const endDatee = !isEmpty(selectedDayE)
    ? selectedDayE.year + "/" + selectedDayE.month + "/" + selectedDayE.day
    : null;

  useEffect(() => {
    setTermId(term.id);
    setTitle(term.title);
    setCost(term.cost);
    setDuration(term.duration);
    setStartDate(term.startDate);
    setEndDate(term.endDate);
    setCapacity(term.capacity);
    setCourseId(!isEmpty(term.courseDetails) ? term.courseDetails.id : null);
    setTeacherId(!isEmpty(term.teacherDetails) ? term.teacherDetails.id : null);

    return () => {
      setTermId();
      setTitle();
      setCost();
      setStartDate();
      setEndDate();
      setCapacity();
      setCourseId();
      setDuration();
      setTeacherId();
    };
  }, [term]);

  const reset = () => {
    closeDialog();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const term = {
      title,
      cost,
      startDate: `${isEmpty(startDatee) ? startDate : startDatee}`,
      endDate: `${isEmpty(endDatee) ? endDate : endDatee}`,
      capacity,
      duration,
      courseId: courseId,
      teacherId: teacherId,
    };

    try {
      const { status, data } = await updateTerm(termId, term);

      if (status === 201) {
        setFetchTerm(true);
        successMessage("   ترم با موفقیت ویرایش شد");
        reset();
      }
    } catch (ex) {
      console.log(ex);
      errorMessage("مشکلی پیش آمده.");
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
              name="title"
              style={{ marginBottom: 3 }}
              className="form-control"
              placeholder=" عنوان ترم"
              aria-describedby="courseName"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              name="cost"
              style={{ marginBottom: 3 }}
              className="form-control"
              placeholder="  قیمت ترم"
              aria-describedby="courseName"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
            <input
              type="number"
              name="duration"
              style={{ marginBottom: 3, marginTop: "5px" }}
              className="form-control"
              placeholder="  مدت دوره به ساعت"
              aria-describedby="courseName"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />

            <DatePicker
              value={selectedDay}
              onChange={setSelectedDay}
              inputPlaceholder=" تاریخ شروع ترم "
              shouldHighlightWeekends
              locale="fa"
            />
            <DatePicker
              value={selectedDayE}
              onChange={setSelectedDayE}
              inputPlaceholder=" تاریخ پایان ترم "
              shouldHighlightWeekends
              locale="fa"
            />

            <input
              type="number"
              name="capacity"
              style={{ marginBottom: 3, marginTop: "5px" }}
              className="form-control"
              placeholder="  ظرفیت دوره "
              aria-describedby="courseName"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />

            <select
              style={{ marginTop: "5px" }}
              class="form-select"
              aria-label="Default select example"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              <option selected> انتخاب دوره</option>
              {!isEmpty(coursesData)
                ? coursesData.map((course) => (
                    <option value={course.id}>{course.courseName}</option>
                  ))
                : null}
            </select>

            <select
              style={{ marginTop: "5px" }}
              class="form-select"
              aria-label="Default select example"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
            >
              <option selected> انتخاب معلم</option>
              {teachersData.map((teacher) => (
                <option value={teacher.id}> {teacher.fullName}</option>
              ))}
            </select>

            <button
              type="submit"
              className="btn btn-success "
              style={{ margin: "1em" }}
            >
              ویرایش ترم
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

export default EditTermDialog;
