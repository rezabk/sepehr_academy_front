import { useState, useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { errorMessage, successMessage } from "./../../../../core/utils/message";
import { postImage } from "./../../../../core/services/uploadServices";
import FormData from "form-data";
import { newNews } from "./../../../../core/services/newsServices";
import { dashContext } from './../../../context/dashContext';

const NewNewsDialog = ({ showDialog, closeDialog }) => {
  const context = useContext(dashContext);
  const {setFetchNews} = context;

  const [title, setTitle] = useState();
  const [category, setCategory] = useState([]);
  const [text, setText] = useState();

  const reset = () => {
    setTitle("");
    setCategory("");
    setText("");
    localStorage.removeItem("image");
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = new FormData();
      data.append("image", event.target.image.files[0]);
      const Data = await postImage(data);
      const news = { title, category, text, image: Data.data.result };

      const { status } = await newNews(news);

      if (status === 201) {
        setFetchNews(true);
        successMessage("   خبر با موفقیت اضافه شد");
        reset();
        closeDialog();
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
              placeholder="عنوان خبر "
              aria-describedby="courseName"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              name="category"
              style={{ marginBottom: 3 }}
              className="form-control"
              placeholder=" news یا article "
              aria-describedby="courseName"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <input
              type="file"
              name="image"
              style={{ marginBottom: 3 }}
              className="form-control mb-2"
              aria-describedby="image"
            />

            <textarea
              name="text"
              placeholder="توضیحات خبر"
              className="form-control"
              style={{ marginBottom: 3 }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-success "
              style={{ margin: "1em" }}
            >
              ثبت خبر
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

export default NewNewsDialog;
