import React, {useState} from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import { deleteCommentAction } from "../../redux/slices/comments/commentSlices";
import EditComment from "../Modal/EditComment";

export default function CommentsList({comments,postId}) {
  
  const user = useSelector(state => state?.users);
  const { userAuth } = user;
  const isLoginuser = userAuth?._id;

  // Dispatch
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [editId,setEditId]=useState("")
  const [editValue,setEditValue]=useState("")
  const editComment=(id,description)=>{
    setOpen(true)
    setEditId(id)
    setEditValue(description)
  }
 
  return (
    <div>
      <ul className="divide-y bg-gray-700 w-96 divide-gray-200 p-3 mt-5 border rounded-lg">
        <div className="text-gray-400">{comments?.length} Comments</div>
        <>
          {comments?.length <= 0 ? (
            <h1 className="text-white text-lg text-center">No comments</h1>
          ) : (
            comments?.map(comment => (
              <>
                <li key={comment?._id} className="py-4  w-full">
                  <div className="flex space-x-3">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={comment?.user?.profilePicture}
                      alt=""
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        
                        <Link to={`/profile/${comment?.user?._id}`}>
                          <h3 className="text-sm font-medium text-gray-300">
                            {comment?.user?.firstName} {comment?.user?.lastName}
                          </h3>
                        </Link>
                        
                        <p className="text-bold text-gray-300 text-base ml-5">
                          {/* <Moment fromNow ago>
                      {comment?.createdAt}
                    </Moment> */}

                          <Moment fromNow ago>
                            {comment?.createdAt}
                          </Moment>
                        </p>
                      </div>
                      <p className="text-sm text-white">
                        {comment?.description}
                      </p>
                      {/* Check if is the same user created this comment */}

                      {isLoginuser === comment?.user?._id ? (
                        <p class="flex">
                          
                          <button
                            // 
                            onClick={()=>editComment(comment?._id,comment?.description)}
                              class="p-3">
                            <PencilAltIcon class="h-5 mt-3 text-gray-100" />
                          </button>
                          
                          <button
                            onClick={() =>
                              dispatch(deleteCommentAction(comment?._id))
                            }
                            class="ml-3">
                            <TrashIcon class="h-5 mt-3 text-gray-100" />
                          </button>
                        </p>
                      ) : null}
                    </div>
                  </div>
                </li>
              </>
            ))
          )}
        </>
      </ul>
      <div>
        <EditComment open={open} setOpen={setOpen} commentId={editId} value={editValue} />
      </div>
    </div>
  );
}