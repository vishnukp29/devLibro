import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCommentAction,
  fetchCommentAction,
} from "../../redux/slices/comments/commentSlices";

//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const UpdateComment = () => {
  //dispatch
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  //fetch comment
  useEffect(() => {
    dispatch(fetchCommentAction(id));
  }, [dispatch, id]);

  //select comment from store
  const comment = useSelector((state) => state?.comment);
  const { commentDetails, isUpdate } = comment;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: commentDetails?.description,
    },
    onSubmit: (values) => {
      const data = {
        id,
        description: values?.description,
      };
      //dispatch action
      dispatch(updateCommentAction(data));
    },
    validationSchema: formSchema,
  });

  //redirect
  if (isUpdate) {
    navigate(`/posts`);
  }
  return (
    <section className="min-h-screen  py-20 2xl:py-40 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
          <div className="">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={formik.handleSubmit} className="space-y-6">

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <h3 className="mt-6 text-center text-2xl font-semibold text-black">
                    Update this Comment
                  </h3>
                </div>

                <textarea
                  onBlur={formik.handleBlur("description")}
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  type="text"
                  name="text"
                  id="text"
                  className="shadow-sm focus:ring-indigo-500  mr-2 block w-full p-2 border-2 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Add New comment"
                />

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  Update
                </button>
              </form>
            </div>
          </div>

          <div className="text-red-400 mb-2 mt-2">
            {formik.touched.description && formik.errors.description}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateComment;
