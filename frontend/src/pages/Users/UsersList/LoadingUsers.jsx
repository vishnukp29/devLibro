import { React } from "react";
import UsersListItem from "./UsersListItem";
import { useSelector } from "react-redux";


//data from store
// const users = useSelector(state => state?.users);
// const { usersList, appErr, serverErr, block, unblock } = users;

const LoadingUsers = () => {
    const loadPages = [1, 2, 3]
    return (
        <div className="container px-4 mx-auto">
            {loadPages.map(num => {return <UsersListItem />})}
        </div>
    );
}

export default LoadingUsers