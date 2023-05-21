import { Routes,Route } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import './App.css';
import Home from "./Pages/Home";
import Blog from "./Pages/Blogs/CreateBlog"
import AllBlogs from './Pages/Blogs/AllBlogs';
import Read from './Pages/ReadBlog/Read'
import Error from './Error/Error'
import Recherche from './Pages/Recherche/Researches'
import Contact from './Pages/Contacts/Contact'
import MyProfil from './Pages/Profil/Profil';
import NavbarSearch  from './Components/Navbar/Search/NavbarSearch'
import NotificationFriendRequest from './Pages/Recherche/NotificationFriendRequest/NotificationFriendRequest';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/article" element={<Blog/>} />
      <Route path="/allblogs" element={<AllBlogs/>} />
      <Route path="/read" element={<Read/>} />
      <Route path="profil" element={<MyProfil/>} />
      <Route path="/contacts" element={<Contact/>} />
      <Route path='/search' element={<NavbarSearch/>}>
        <Route path='/search/newContacts' element={<Recherche/>}/>
        <Route path='/search/notification' element={<NotificationFriendRequest/>}/>
      </Route>
      <Route path="*" element={<Error/>} />
    </Routes>
    </>
  );
}

export default App;
