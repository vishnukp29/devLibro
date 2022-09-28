import React from "react";
import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { createCategoryAction } from "../../redux/slices/category/categorySlice";

//Form schema
const formSchema = Yup.object({
  title: Yup.string().required("Category is Required"),
});

const AddNewCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //formik
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      //dispath the action
      dispatch(createCategoryAction(values));
      navigate("/category-list");
    },
    validationSchema: formSchema,
  });

  // Get data from Store
  const state = useSelector((state) => state?.category);
  const { loading, appErr, serverErr, category } = state;

  //redirect
  // if (category) {
  //   navigate('/category-list')
  // }

  return (
    <section className="min-h-screen  py-20 2xl:py-40 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-md w-full space-y-8 mx-auto">
          <div>
            <BookOpenIcon className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Add New Category
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <p className="font-medium text-indigo-600 hover:text-indigo-500">
                These are the categories user will select when creating a post
              </p>
              {/* Display error */}
              <div>
                {appErr || serverErr ? (
                  <h2 className="text-red-500 text-center text-lg">
                    {serverErr} {appErr}
                  </h2>
                ) : null}
              </div>
            </p>
          </div>
          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Name
                </label>
                {/* Title */}
                <input
                  value={formik.values.title}
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                  type="text"
                  autoComplete="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                  placeholder="New Category"
                />
                <div className="text-red-400 mb-2">
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>
            </div>

            <div>
              <div>
                {/* Submit */}
                {loading ? (
                  <button
                    disabled
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 "
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <PlusCircleIcon
                        className="h-5 w-5 text-yellow-500 group-hover:text-white"
                        aria-hidden="true"
                      />
                    </span>
                    Loading please wait...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <PlusCircleIcon
                        className="h-5 w-5 text-yellow-500 group-hover:text-white"
                        aria-hidden="true"
                      />
                    </span>
                    Add Category
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddNewCategory;
