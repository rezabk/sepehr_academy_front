import { useEffect, useState, useContext } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { errorMessage, successMessage } from "./../../../../core/utils/message";
import { postImage } from "./../../../../core/services/uploadServices";
import FormData from "form-data";
import { updateNews } from "../../../../core/services/newsServices";
import { dashContext } from "./../../../context/dashContext";


const EditNewsDialog = ({ showDialog, closeDialog, news }) => {
  const context = useContext(dashContext);
  const {setFetchNews} = context;

  const [newsId, setNewsId] = useState();
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();

  const [image, setImage] = useState();
  const [text, setText] = useState([]);

  useEffect(() => {
    setNewsId(news.id);
    setTitle(news.title);
    setCategory(news.category);
    setImage(news.image);
    setText(news.text);

    return () => {
      setNewsId();
      setTitle();
      setCategory();
      setImage();
      setText();
    };
  }, [news]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let news = {};

      let data = new FormData();
      if (event.target.image.files[0]) {
        data.append("image", event.target.image.files[0]);
        const Data = await postImage(data);
        news = {
          title,
          category,
          text,
          image: Data.data.result,
        };
      } else
        news = {
          title,
          category,
          text,
          image,
        };

      const { status } = await updateNews(newsId, news);

      if (status === 200) {
        setFetchNews(true);
        successMessage("   خبر با موفقیت ویرایش شد");
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
              ویرایش خبر
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

export default EditNewsDialog;
