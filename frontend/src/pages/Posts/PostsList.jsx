import { useEffect } from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAction, toggleAddDisLikesToPost, toggleAddLikesToPost } from "../../redux/slices/posts/postSlices";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";

import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from '../../utils/LoadingComponent'


export default function PostsList() {
  //select post from store
  const post = useSelector((state) => state?.post);
  const { postLists, loading, appErr, serverErr,likes, disLikes } = post;

  //select categories from store
  const category = useSelector(state => state?.category);
  const {categoryList,loading: catLoading,appErr: catAppErr,serverErr: catServerErr,} = category;
  console.log(category);
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch,likes, disLikes]);

  // Fetch categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  // const navigate=useNavigate()

  return (
    <>
      <section >
        <div class="py-20 bg-white min-h-screen radius-for-skewed ">
          <div class="container mx-auto px-4">
            <div class="mb-16 flex flex-wrap items-center">
              
              <div class="w-full lg:w-1/2 ">
                <span class="text-slate-700 font-bold">
                  Latest Posts from our awesome Authors
                </span>
                <h2 class="text-4xl text-black lg:text-5xl font-bold font-heading">
                  Latest Posts
                </h2>
              </div>
              
              <div class=" block text-right w-1/2 ">
                {/* View All */}
                <button
                  onClick={() => dispatch(fetchPostsAction())}
                  class="cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-gray-700 "
                 > View All Posts
                </button>
              </div>
              
            </div>
            
            <div class="flex flex-wrap -mx-3">
              <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div class="py-4 px-6 bg-gray-50 shadow rounded border border-gray-300 ">
                  <h4 class="mb-4 text-slate-700 font-bold uppercase flex justify-center">
                    Categories
                  </h4>
                  <ul className='overflow-auto h-72'>
                    {catLoading ? (
                      <LoadingComponent />
                    ) : catAppErr || catServerErr ? (
                      <h1>
                        {catServerErr} {catAppErr}
                      </h1>
                    ) : categoryList?.length <= 0 ? (
                      <h1>No Category Found</h1>
                    ) : (
                      categoryList?.map(category => (
                        <li>
                          <p onClick={()=>dispatch(fetchPostsAction(category.title))}
                          className="cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-gray-700 flex justify-center">
                            {category?.title}
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>

              <div class="w-full lg:w-3/4 px-3 ">
                {/* Post goes here */}

                {  appErr || serverErr ? (
                  <h1>{serverErr} {appErr}</h1>
                ) : postLists?.length <= 0 ? (
                  <h1 className='text-3xl font-bold text-center'>No Posts Found</h1>
                ) : (
                  postLists?.map((post) => (
                    <div key={post.id} 
                      class="flex flex-wrap bg-white -mx-3  lg:mb-6">
                      <div class="mb-10  w-full lg:w-1/4 px-3">
                        <div>
                          {/* Post image */}
                          <img
                            class="w-full h-full object-cover rounded"
                            src={post?.image}
                            alt=""
                          />
                        </div>

                        {/* Likes, views dislikes */}
                        <div className="flex flex-row bg-gray-300 justify-center w-full  items-center ">
                          {/* Likes */}
                          <div className="flex flex-row justify-center items-center ml-4 mr-2 pb-2 pt-1">
                            {/* Togle like  */}
                            <div className="">
                              <ThumbUpIcon onClick={() =>
                                  dispatch(toggleAddLikesToPost(post?._id))
                                } 
                                className="h-7 w-7 text-gray-600 cursor-pointer" />
                            </div>
                            <div className="pl-1 text-gray-600">
                              {post?.likes?.length}
                            </div>
                          </div>
                          {/* Dislike */}
                          <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div>
                              <ThumbDownIcon onClick={() =>
                                  dispatch(toggleAddDisLikesToPost(post?._id))
                                }  
                              className="h-7 w-7 cursor-pointer text-gray-600" />
                            </div>
                            <div className="pl-1 text-gray-600">
                              {post?.disLikes?.length}
                            </div>
                          </div>
                          {/* Views */}
                          <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div>
                              <EyeIcon className="h-7 w-7  text-gray-400" />
                            </div>
                            <div className="pl-1 text-gray-600">
                              {post?.numViews}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-full lg:w-3/4 px-3">
                        <div class="hover:underline">
                          <h3 class="mb-1 text-2xl text-slate-800 font-bold font-heading cursor-pointer">
                            {/* {capitalizeWord(post?.title)} */}
                            {post?.title}
                          </h3>
                        </div>

                        <p class="text-black truncate ">{post?.description}</p>

                        {/* Read more */}
                        <Link to={`/posts/${post.id}`} className="text-indigo-500 hover:underline">
                          Read More..
                        </Link>

                        {/* User Avatar */}
                        <div className="mt-10 flex items-center">
                          <div className="flex-shrink-0">
                            <div>
                              <img
                                className="h-10 w-10 rounded-full"
                                src={post?.user?.profilePicture}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="ml-3">
                            
                            <p className="text-sm font-medium text-gray-900">
                              <div className="text-slate-800 hover:underline ">
                                {post?.user?.firstName} {post?.user?.lastName}
                              </div>
                            </p>
                            
                            <div className="flex space-x-1 text-sm text-gray-500 font-semibold">
                              <time>
                                <DateFormatter date={post?.createdAt} />
                              </time>
                              <span aria-hidden="true">&middot;</span>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
