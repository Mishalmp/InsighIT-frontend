import React, { useState } from "react";
import bginsight from "../../../assets/bginsight.png";
import hamburgerMenu from "../../../assets/hamburgerMenu.svg";
import close from "../../../assets/close.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LogoutDetails } from "../../../Redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import insightimg from "../../../assets/insightnew.png";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
function NavBar() {
  const [toggle, setToggle] = useState(false);
  const { userinfo } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Signout = () => {
    dispatch(LogoutDetails());
    localStorage.removeItem("token");
    navigate("/login/");
  };

  return (
    <div className="w-full h-[70px] bg-black border-b">
      <div className="md:max-w-[1480px] max-w-[600px]  m-auto w-full h-full flex justify-between items-center">
        <img
          src={bginsight}
          onClick={() => navigate("/User/Home/")}
          className="h-[70px] ml-20"
        />

        <div className="hidden md:flex items-center">
          <ul className="flex gap-10 text-[#039368]">
            <li
              className="font-semibold text-lg font-serif cursor-pointer"
              onClick={() => navigate("/User/Home/")}
            >
              {" "}
              Home
            </li>
            <li
              className="font-semibold text-lg font-serif cursor-pointer"
              onClick={() => navigate("/User/about/")}
            >
              {" "}
              Our Story
            </li>

            <li
              className="font-semibold text-lg font-serif cursor-pointer"
              onClick={() => navigate("/User/userprofile/")}
            >
              {" "}
              Profile
            </li>

            <Link
              to="/User/blogs/"
              className="font-semibold text-lg font-serif cursor-pointer"
            >
              Blogs
            </Link>
          </ul>
        </div>

        <div className="hidden md:flex gap-3">
          {/* <Link to='/login/'>
           <button className='px-6 py-2 rounded-[25px]  text-[#039368] border-[2px] border-[#039368]'>
                Sign In
            </button>
         </Link>  */}
          <Link to="/User/blogs/">
            <button className="px-6 py-2 mr-10 rounded-[25px]  bg-[#039368] text-white">
              Get Started
            </button>
          </Link>
        </div>

        <div className="md:hidden">
          {/* <img src={toggle?close:hamburgerMenu} /> */}
          {toggle ? (
             <CloseIcon
             className="text-gray-500 mr-10"
             onClick={() => setToggle(!toggle)}
           />
          ) : (
          
            <MenuIcon
            className="text-gray-500 mr-10"
            onClick={() => setToggle(!toggle)}
          />
          )}
        </div>
      </div>

      <div
        className={
          toggle
            ? "absolute z-10 p-4 bg-white bg-opacity-80 w-full px-8 md:hidden"
            : "hidden"
        }
      >
        <ul>
          <li
            className="p-4 hover:bg-gray-50"
            onClick={() => navigate("/User/Home/")}
          >
            {" "}
            <HomeIcon /> home
          </li>
          <li
            className="p-4 hover:bg-gray-100"
            onClick={() => navigate("/User/about/")}
          >
            {" "}
            <AutoStoriesIcon /> Our Story
          </li>
          <li
            className="p-4 hover:bg-gray-100"
            onClick={() => navigate("/User/userprofile/")}
          >
            {" "}
            <AccountBoxIcon /> Profile
          </li>

          <div className="flex flex-col my-4 gap-4">
            <Link to="/User/blogs/">
              <button className="px-8 py-5 w-full border hover:bg-[#1f5448] rounded-md bg-[#039368]  text-white font-bold">
                Get Started
              </button>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
