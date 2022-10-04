import React,{useState, useMemo, useRef, useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createpostAction } from "../../redux/slices/posts/postSlices";
import CategoryDropDown from "../Categories/CategoryDropDown";

//Form schema
const formSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
  image: Yup.string().required("Image is required"),
});

// CSS for Dropzone
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  border-color: gray;
  transition: border 0.24s ease-in-out;
`;

export default function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //select store data
  const post = useSelector((state) => state?.post);
  const { isCreated, loading, appErr, serverErr } = post;

  const user=useSelector(state=>state.users)
  const {userAuth}=user
  
  // preview
  const [preview,setPreview]=useState('')

  //formik
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      image: "",
    },
    onSubmit: (values) => {
      //dispath the action
      const data = {
        category: values?.category?.label,
        title: values?.title,
        description: values?.description,
        image: values?.image,
      };
      dispatch(createpostAction(data));    
    },
    validationSchema: formSchema,
  });

  if (isCreated) {
    navigate("/posts");
  } 

  let image = formik?.values?.image;
	useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(image);
		} else {
			setPreview(null);
		}
	}, [image]);
  
  return (
    <section className="min-h-screen  py-20 2xl:py-40 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Post
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-gray-600 hover:text-indigo-500">
              Share your ideas to the word. Your post must be free from
              Profanity
            </p>
          </p>

          {appErr || serverErr ? (
            <p className="mt-2 text-center text-lg text-red-600">
                {serverErr} {appErr}
            </p>
          ) : null}
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 drop-shadow-lg rounded-lg px-10 border border-gray-300 ">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  {/* Title */}
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>
              {/* Category input goes here */}
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 "
              >
                Select Category
              </label>
              <CategoryDropDown
                value={formik.values.category?.label}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.category}
                touched={formik.touched.category}
              />
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                {/* Description */}
                <textarea
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  rows="5"
                  cols="10"
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                ></textarea>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik.touched.description && formik.errors.description}
                </div>

                {/* Image POST */}
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mt-5"
                >
                  Select Image
                </label>

                {
                preview ?<img src={preview} alt='' onClick={()=>{
                  setPreview(null)
                 }}/> :<Container className="container bg-gray-700">
                 <Dropzone
                   onBlur={formik.handleBlur("image")}
                   accept="image/jpeg, image/png"
                   onDrop={acceptedFiles => {
                     formik.setFieldValue("image", acceptedFiles[0]);
                   }}
                 >
                   {({ getRootProps, getInputProps }) => (
                     <div className="container">
                       <div
                         {...getRootProps({
                           className: "dropzone",
                           onDrop: event => event.stopPropagation(),
                         })}
                       >
                         <input {...getInputProps()} />
                         <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                           Click here to select image
                         </p>
                       </div>
                     </div>
                   )}
                 </Dropzone>
               </Container>
              }

              </div>
              <div>
                {/* Submit btn */}
                {loading ? (
                  <button
                    disabled
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Loading Please Wait...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
