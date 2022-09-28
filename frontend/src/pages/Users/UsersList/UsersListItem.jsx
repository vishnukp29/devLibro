import React from "react";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux"
import { MailIcon } from "@heroicons/react/solid";
import {blockUserAction, unBlockUserAction} from '../../../redux/slices/users/userSlices'

const UsersListItem = user => {
  //dispatch
  const dispatch = useDispatch();

  return (
    <section className='p-8 mb-4 bg-white shadow rounded'>
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center -mx-4 ">
          <div className="w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0">
            <img
              className="w-10 h-10 mr-4 object-cover rounded-full"
              src={user?.user?.profilePicture}
              alt="profile "
            />
            <div>
              <p className="text-sm font-medium">
                {user?.user?.firstName} {user?.user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.user?.email}</p>
            </div>
          </div>

          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0 text-center">
            <p className="py-2 px-4 text-xs text-purple-500 bg-purple-50 rounded-full">
              {user?.user?.accountType}
              {/* <span>{user?.user?.isBlocked && "Blocked"}</span> */}
            </p>
          </div>

          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0 text-center">
            <p className="py-2 px-4 text-sm">
              <span className="text-bold mr-2  text-teal-500">
                {user.user?.followers?.length}
              </span>
              Followers
            </p>
          </div>
          
          <div className="w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0 ">

            <p className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-xs border-2 rounded border-gray-500">
              <span className="text-base mr-2  boder-2 text-bold text-slate-700">
                {user.user?.posts?.length} Posts
              </span>
            </p>

            <Link
              to={`/profile/${user?.user?._id}`}
              className=" inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-base border-2 rounded border-yellow-500 text-bold"
            >
              Profile
            </Link>

            {user?.user?.isBlocked ? (
              <button
                onClick={() => dispatch(unBlockUserAction(user?.user?._id))}
                className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-base border-2 rounded border-green-500 text-bold"
              >
                Unblock
              </button>
            ) : (
              <button
                onClick={() => dispatch(blockUserAction(user?.user?._id))}
                className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-base border-2 rounded border-red-500 text-bold"
              >
                Block
              </button>
            )}

            <Link
              to="/send-email"
              state={{
                email: user?.user?.email,
                id: user?.user?._id,
              }}
              className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-base border-2 rounded border-blue-500 text-center">
               <span className="text-bold text-slate-700 ">
                  Message
                </span>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};
export default UsersListItem;
