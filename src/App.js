import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/Home";
import AddData from "./pages/AddData";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import User from "./pages/User";
import Search from "./pages/Search";
import Messages from "./pages/Messages";

function App() {
  const { userName } = useContext(AuthContext)

  const UserRoute = ({ children }) => {
    if (!userName) {
      return <Navigate to={'/login'} />
    }
    return children;
  }

  return (

    <BrowserRouter>

      <Routes>
        <Route index path="/" element={<UserRoute><Home /></UserRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/add" element={<AddData />} />
        <Route path="/:id" element={<User />} />
        <Route path="/chat/:id" element={<Messages />} />
        <Route path="/search" element={<Search />} />
      </Routes>

    </BrowserRouter >

  );
}

export default App;
