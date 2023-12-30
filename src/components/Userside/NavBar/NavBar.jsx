import React, { useEffect, useRef, useState } from "react";
import bginsight from "../../../assets/bginsight.png";
import hamburgerMenu from "../../../assets/hamburgerMenu.svg";
import close from "../../../assets/close.svg";

import { Input, Button } from "@material-tailwind/react";

import { Link, useNavigate } from "react-router-dom";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ArticleIcon from "@mui/icons-material/Article";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { LogoutDetails } from "../../../Redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import NotificationDrawer from "../../NotificationDrawer/NotificationDrawer";
import { Loader } from "../../../components/Loading/Loader";
import { Logout } from "../../../services/UserApi";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Badge,
} from "@material-tailwind/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import HelpIcon from "@mui/icons-material/Help";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchUser from "../../searchuser/SearchUser";
import TopicIcon from "@mui/icons-material/Topic";
const profileMenuItems = [
  {
    label: "My Profile",
    description: "Your Profile",
    icon: AccountCircleIcon,
  },
  {
    label: "Blogs",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: ArticleIcon,
  },
  {
    label: "Write Blog",
    description: "Write Your Own thoughts in article",
    icon: NoteAltIcon,
  },
  {
    label: "My Blogs",
    description: "Blogs Posted By You",
    icon: ArticleIcon,
  },

  {
    label: "Topics",
    description: "Tech topics in InsighIT",
    icon: TopicIcon,
  },
  {
    label: "Communtiy",
    description: "Community of InsighIT Users",
    icon: NewspaperIcon,
  },
  {
    label: "Notifications",
    description: "your Unread Notifications",
    icon: NotificationsActiveIcon,
  },
  {
    label: "Saved",
    description: "Your Saved Blogs",
    icon: BookmarksIcon,
  },
  {
    label: "Chat",
    description: "Chat with your connections",
    icon: MoveToInboxIcon,
  },
  {
    label: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    label: "Help",
    description: "Find the perfect solution for your needs.",
    icon: GlobeAmericasIcon,
  },
  {
    label: "Sign Out",
    description: "Log out from the site",
    icon: PowerSettingsNewIcon,
  },
];

function NavBar() {
  const [toggle, setToggle] = useState(false);
  const { userinfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate();

  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] =
    useState(false);

  const dispatch = useDispatch();

  const Signout = async () => {
    try {
      await Logout();

      dispatch(LogoutDetails());

      navigate("/login/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenNotificationDrawer = () => {
    handleLoading();
    setIsNotificationDrawerOpen(true);
    closeMenu();
  };

  const [searchresultopen, setsearchresultopen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setsearchresultopen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <>
      <div className="w-full m-1 mb-0 rounded-lg h-[60px] bg-white border-b flex justify-between items-center">
        <div className="ml-20 flex items-center">
          <Link to="/User/Home/">
            <img src={bginsight} className="h-[70px]" />
          </Link>
          <div
            className="md:w-64  ml-20"
            onClick={() => setsearchresultopen(!searchresultopen)}
          >
            <Input
              label="Search User"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
        <ul className="hidden md:flex space-x-16 mr-[100px]">
          <Link to="/User/usercreateblog/">
            {" "}
            <li className="flex items-center hover:cursor-pointer hover:bg-blue-gray-50 rounded-3xl mt-2">
              <NoteAltIcon fontSize="medium" />
              <span>Write</span>
            </li>
          </Link>
          <Link to="/User/blogs">
            {" "}
            <li className="flex items-center mt-2 hover:cursor-pointer hover:bg-blue-gray-50 rounded-3xl">
              <ArticleIcon fontSize="medium" />
              <span>Blogs</span>
            </li>
          </Link>
          <Link to="/User/topics">
            {" "}
            <li className="flex items-center mt-2 hover:cursor-pointer hover:bg-blue-gray-50 rounded-3xl">
              <TopicIcon fontSize="medium" />
              <span>Topics</span>
            </li>
          </Link>
          <Link to="/User/community/">
            {" "}
            <li className="flex items-center mt-2 hover:cursor-pointer hover:bg-blue-gray-50 rounded-3xl">
              <NewspaperIcon fontSize="medium" />
              <span> Community</span>
            </li>
          </Link>

          <li
            className="flex items-center hover:cursor-pointer hover:bg-blue-gray-50 rounded-3xl"
            onClick={handleOpenNotificationDrawer}
          >
            <Badge>
              {" "}
              <NotificationsActiveIcon fontSize="medium" />
            </Badge>{" "}
            <span>Notifs</span>
          </li>
          {/* <Link to='/User/userprofile/'>
    <li className='flex items-center'><img className='w-[40px] h-[40px] rounded-full' src={userinfo.profile_img} /></li>
    </Link> */}
          <Menu
            open={isMenuOpen}
            handler={setIsMenuOpen}
            placement="bottom-end"
          >
            <MenuHandler>
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
              >
                <Avatar
                  variant="circular"
                  size="sm"
                  alt="tania andrew"
                  className="border border-gray-900 p-0.5"
                  src={userinfo.profile_img}
                />

                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3 w-3 transition-transform ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </MenuHandler>
            <MenuList className="p-1 w-[50rem] mt-2 rounded-xl lg:block">
              <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
                {profileMenuItems.map(({ label, description, icon }, key) => {
                  const isLastItem = key === profileMenuItems.length - 1;

                  const handlemenuitemclick = () => {

                    const userId = userinfo.id
                    closeMenu();

                    if (label === "My Profile") {
                      navigate("/User/userprofile");
                    } else if (label === "My Blogs") {
                      navigate(`/User/myblogs/`,{state:{userId}});
                    } else if (label === "Sign Out") {
                      Signout();
                    } else if (label === "Saved") {
                      navigate(`/User/saved/`,{state:{userId}});
                    } else if (label === "Chat") {
                      navigate(`/User/chat/`);
                    } else if (label === "Help") {
                      navigate(`/User/reportissue/`);
                    } else if (label == "About Us") {
                      navigate(`/User/about/`);
                    } else if (label == "Communtiy") {
                      navigate(`/User/community/`);
                    } else if (label == "Topics") {
                      navigate(`/User/topics`);
                    } else if (label == "Write Blog") {
                      navigate(`/User/usercreateblog`);
                    } else if (label == "Blogs") {
                      navigate(`/User/blogs`);
                    } else if (label == "Notifications") {
                      handleOpenNotificationDrawer();
                    }
                  };
                  return (
                    <MenuItem
                      key={label}
                      onClick={handlemenuitemclick}
                      className={`flex items-center gap-3 rounded-lg ${
                        isLastItem
                          ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
                        {" "}
                        {React.createElement(icon, {
                          strokeWidth: 2,
                          className: `h-6 text-gray-900 w-6 ${
                            isLastItem ? "text-red-500" : ""
                          }`,
                        })}
                      </div>
                      <div>
                        <Typography
                          variant="h6"
                          color={isLastItem ? "red" : "blue-gray"}
                          className="flex items-center text-sm font-bold"
                        >
                          {label}
                        </Typography>
                        <Typography
                          variant="paragraph"
                          className="text-xs !font-medium"
                          color={isLastItem ? "red" : "blue-gray"}
                        >
                          {description}
                        </Typography>
                      </div>
                    </MenuItem>
                  );
                })}
              </ul>
            </MenuList>
            <NotificationDrawer
              isOpen={isNotificationDrawerOpen}
              userinfo={userinfo}
              onClose={() => setIsNotificationDrawerOpen(false)}
            />
          </Menu>
        </ul>

        <div className="md:hidden">
          <img
            src={toggle ? close : hamburgerMenu}
            onClick={() => setToggle(!toggle)}
          />
        </div>
      </div>

      <div
        className={
          toggle ? "absolute z-10 p-4 bg-white w-full px-8 md:hidden" : "hidden"
        }
      >
        {/* <ul>
            <li className='p-5 flex hover:bg-gray-50'><NoteAltIcon fontSize='medium'/><span className='m-auto text-xl font-normal'>Write</span> </li>
            <li className='p-5 flex hover:bg-gray-100'><ArticleIcon fontSize='medium'/><span className='m-auto text-xl font-normal'>Docs</span></li>
            <li className='p-5 flex hover:bg-gray-100'><BookmarksIcon fontSize='medium'/><span className='m-auto text-xl font-normal'>Saved</span></li>
            <li className='p-5 flex hover:bg-gray-100'><img className='w-[60px] h-[60px]' src={userinfo.profile_img} /><span className='m-auto text-xl font-normal'>Profile</span></li>
            <div className='flex flex-col my-4 gap-4'>
            <button className='border border-[20B486] flex justify-center items-center hover:bg-black hover:text-white  bg-transparent  px-6 gap-2 py-4'>
                Sign In
            </button>
          
            </div>

        </ul> */}
      </div>

      <div className="w-full h-[1px] bg-gray-600"></div>

      <SearchUser
        searchresultopen={searchresultopen}
        searchQuery={searchQuery}
        userinfo={userinfo}
        setsearchresultopen={setsearchresultopen}
        ref={searchRef}
      />
    </>
  );
}

export default NavBar;
