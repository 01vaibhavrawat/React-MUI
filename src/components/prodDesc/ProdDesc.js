import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { productData } from  '../../redux/productSlice';

export const Editor = () => {
  const data = useSelector((state) => state.productReducer.productData);
  const dispatch = useDispatch();

  const handleChange = value => {
    dispatch(productData(['productDesc', value]));
  };
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={data.productDesc}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
