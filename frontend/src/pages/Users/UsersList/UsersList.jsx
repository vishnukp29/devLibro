import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../../../redux/slices/users/userSlices";
import LoadingComponent from "../../../utils/LoadingComponent";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  //dispatch
  const dispatch = useDispatch();
  //data from store
  const users = useSelector(state => state?.users);
  const { usersList, appErr, serverErr, loading, block, unblock } = users;
  //fetch all users
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [block, unblock]);

  return (
    <>
      <section class="py-8 bg-white min-h-screen">
        {loading ? (
          <LoadingComponent />
        ) : appErr || serverErr ? (
          <h3 className="text-red-600 text-center text-lg">
            {serverErr} {appErr}
          </h3>
        ) : usersList?.length <= 0 ? (
          <h2>No User Found</h2>
        ) : (
          usersList?.map(user => (
            <>
              <UsersListItem user={user} />
            </>
          ))
        )}
      </section>
    </>
  );
};

export default UsersList;
