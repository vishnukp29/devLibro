import {BrowserRouter as Router, Routes,Route  } from "react-router-dom";
import AddNewCategory from "./pages/Categories/AddNewCategory";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./pages/Navigation/Navbar";
import Login from "./pages/Users/Login/Login";
import Profile from "./pages/Users/Profile/Profile";
import Register from "./pages/Users/Register/Register";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CategoryList from "./pages/Categories/CategoryList";
import UpdateCategory from "./pages/Categories/UpdateCategory"; 
import PrivateProtectRoute from "./pages/Navigation/ProtectedRoutes/PrivateProtectedRoute";
import AdminProtected from './pages/Navigation/ProtectedRoutes/AdminProtected'
import CreatePost from "./pages/Posts/CreatePost";
import PostsList from "./pages/Posts/PostsList";
import PostDetails from "./pages/Posts/PostDetails";
import UpdatePost from "./pages/Posts/UpdatePost";
import UpdateComment from "./pages/Comments/UpdateComment";
import UploadProfilePhoto from "./pages/Users/Profile/UploadProfilePhoto";
import UpdateProfileForm from "./pages/Users/Profile/UpdateProfileForm";
import SendEmail from "./pages/Users/Email/SendEmail";
import AccountVerified from "./pages/Users/AccountVerification/AccountVerified";
import UsersList from "./pages/Users/UsersList/UsersList";
import UpdatePassword from "./pages/Users/PasswordManagement/UpdatePassword";
import ResetPassword from "./pages/Users/PasswordManagement/ResetPassword";
import ResetPasswordForm from "./pages/Users/PasswordManagement/ResetPasswordForm";
import { LoadingUsers } from "./pages/Users/UsersList/LoadingUsers";

function App() {
  return (
    <div >
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgetpasswordtoken' element={<ResetPasswordForm/>}/>
          <Route path='/resetpassword/:token' element={<ResetPassword/>}/>
          
          <Route path='/add-category' element={
            <AdminProtected>
              <AddNewCategory/>
            </AdminProtected>
          }/>
          
          <Route path='/category-list' element={
            <AdminProtected>
              <CategoryList/>
            </AdminProtected>
          }/>
          
          <Route path='/update-category/:id' element={
            <AdminProtected>
              <UpdateCategory/>
            </AdminProtected>
          }/>

          {/* <Route path='/create-post' element={ <CreatePost/>}/> */}
          <Route path='/create-post' element={
            <PrivateProtectRoute>
              <CreatePost/>
            </PrivateProtectRoute>
          }/>

          {/* <Route path='/update-post/:id' element={<UpdatePost/>}/> */}
          <Route path='/update-post/:id' element={
            <PrivateProtectRoute>
              <UpdatePost/>
            </PrivateProtectRoute>
          }/>

          {/* <Route path='/profile/:id' element={<Profile/>}/> */}
          <Route path='/profile/:id' element={
            <PrivateProtectRoute>
              <Profile/>
            </PrivateProtectRoute>
          }/>

          <Route path='/verifyaccount/:token' element={
            <PrivateProtectRoute>
              <AccountVerified/>
            </PrivateProtectRoute>
          }/>

          {/* <Route path='/upload-profile-photo/:id' element={<UploadProfilePhoto/>}/> */}
          <Route path='/upload-profile-photo/:id' element={
            <PrivateProtectRoute>
              <UploadProfilePhoto/>
            </PrivateProtectRoute>
          }/>

          {/* <Route path='/update-profile/:id' element={<UpdateProfileForm/>}/> */}
          <Route path='/update-profile/:id' element={
            <PrivateProtectRoute>
              <UpdateProfileForm/>
            </PrivateProtectRoute>
          }/>

          <Route path='/send-email' element={
            <PrivateProtectRoute>
              <SendEmail/>
            </PrivateProtectRoute>
          }/>

          {/* <Route path='update-comment/:id' element={
            <PrivateProtectRoute>
              <CommentModal/>
            </PrivateProtectRoute>
          }/> */}

          <Route path='update-comment/:id' element={
            <PrivateProtectRoute>
              <UpdateComment/>
            </PrivateProtectRoute>
          }/>

          <Route path='updatepassword' element={
            <PrivateProtectRoute>
              <UpdatePassword/>
            </PrivateProtectRoute>
          }/>

          <Route path='/users' element={
            <AdminProtected>
              <UsersList/>
            </AdminProtected>
          }/>

          <Route path='/posts' element={<PostsList/>}/>
          <Route path='/posts/:id' element={<PostDetails/>}/>

        </Routes>
      </Router>
      <ToastContainer toastClassName=" relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer" />
    </div>
  );
}

export default App;
