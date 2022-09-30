import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from 'clsx'
import { fetchUsersAction } from "../../../redux/slices/users/userSlices";
import LoadingComponent from "../../../utils/LoadingComponent";
import UsersListItem from "./UsersListItem";
import useLazyLoad from "./useLazyLoad"
import { LoadingUsers } from "./LoadingUsers";

const UsersList = () => {
  //dispatch
  const dispatch = useDispatch();

  //data from store
  const users = useSelector(state => state?.users);
  const { usersList, appErr, serverErr, block, unblock } = users;
  //fetch all users
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [block, unblock]);

  // Lazy loading
  const triggerRef = useRef(null);
  const NUM_PER_PAGE = 5
  const TOTAL_PAGES =  usersList?.length

  const onGrabData = (currentPage) => {
    // This would be where you'll call your API
    return new Promise((resolve) => {
    setTimeout(() => {
        const data = usersList.slice(
        ((currentPage - 1)%TOTAL_PAGES) * NUM_PER_PAGE,
        NUM_PER_PAGE * (currentPage%TOTAL_PAGES)
        );
        console.log(data);
        resolve(data);
    }, 3000);
    });
  };

  const { data, loading } = useLazyLoad({ triggerRef, onGrabData });

  return (
    // <section className="py-8 bg-white min-h-screen">
    //   <div className="container px-4 mx-auto">
    //     {loading ? (
    //       <LoadingComponent />
    //     ) : appErr || serverErr ? (
    //       <h3 className="text-red-600 text-center text-lg">
    //         {serverErr} {appErr}
    //       </h3>
    //     ) : usersList?.length <= 0 ? (
    //       <h2>No User Found</h2>
    //     ) : (
    //       usersList?.map(user => (
    //         <>
    //           <UsersListItem user={user} />
    //         </>
    //       ))
    //     )}
    //   </div>
    // </section>

    <section className="py-8 bg-white min-h-screen">
      <div className="container px-4 mx-auto">
        {usersList?.length <=0 ?(
          <h2>No User Found</h2>
        ): usersList?. map(user => (
          <>
            <UsersListItem user={user} />
          </>
        ))}
      </div>
      <div ref={triggerRef} className={clsx("trigger", { visible: loading })}></div>
    </section>
  );
};

export default UsersList;
