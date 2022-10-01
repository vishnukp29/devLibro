import React, { Component, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import { updateCommentAction } from "../../redux/slices/comments/commentSlices";

//Form schema
const formSchema = Yup.object({
  description: Yup.string().required(
    "Plese provide a content to submit the comment"
  ),
});

const DeleteCategoryModal = ({ open, setOpen, commentId, value }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");

  useEffect(() => {
    if (value) {
      console.log("123");
      setDescription(value);
    }
  }, [value]);

  // console.log(description,'description is')

  const handleChange = (e) => setDescription(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: commentId,
      description: description,
    };

    dispatch(updateCommentAction(data));
    setOpen(false);
  };
  return (
    <>
      {open ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className=" w-full mx-8 md:mx-0 md:w-1/4 my-6  max-w-7xl ">
              <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                <div className="flex justify-center">
                  <h3>Do you want delete this Category?</h3>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-white bg-green-500 active:bg-green-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-red-500 active:bg-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DeleteCategoryModal;
