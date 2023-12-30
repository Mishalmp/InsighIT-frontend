import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";

import ReportIcon from "@mui/icons-material/Report";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import insightimg from "../../assets/insightnew.png";

import { FaWallet } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { LogoutDetails } from "../../Redux/UserSlice";
import TopicIcon from "@mui/icons-material/Topic";
import { Logout } from "../../services/UserApi";

export default function AdminSidebar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const dispatch = useDispatch();
  const Signout = async () => {
    try {
      await Logout();

      dispatch(LogoutDetails());
      navigate("/admin/adminlogin/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="h-[50rem] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img
          src={insightimg}
          alt="brand"
          className="w-[200px] h-[100px] absolute"
        />
        {/* <Typography variant="h5" color="blue-gray">
          InsighIT
        </Typography> */}
      </div>
      <List className="mt-16">
        <ListItem
          onClick={() => navigate("/admin/adminhomepage/")}
          className={
            location.pathname === "/admin/adminhomepage/" ? "bg-gray-200" : ""
          }
        >
          <ListItemPrefix>
            <PresentationChartBarIcon strokeWidth={3} className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem
            onClick={() => navigate("/admin/adminwallet/")}
            className={
              location.pathname === "/admin/adminwallet/" ? "bg-gray-200" : ""
            }
          >
            <ListItemPrefix>
              <FaWallet strokeWidth={3} className="h-5 w-5" />
            </ListItemPrefix>
            Wallet
          </ListItem>
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ReportIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Reports
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                onClick={() => navigate("/admin/blogreports/")}
                className={
                  location.pathname === "/admin/blogreports/"
                    ? "bg-gray-200"
                    : ""
                }
              >
                <ListItemPrefix>
                  <ReportIcon className="h-5 w-5" />
                </ListItemPrefix>
                Blog Reports
              </ListItem>
              <ListItem
                onClick={() => navigate("/admin/reportedissues/")}
                className={
                  location.pathname === "/admin/reportedissues/"
                    ? "bg-gray-200"
                    : ""
                }
              >
                <ListItemPrefix>
                  <ReportIcon className="h-5 w-5" />
                </ListItemPrefix>
                Bug Reports
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem
          onClick={() => navigate("/admin/userlist/")}
          className={
            location.pathname === "/admin/userlist/" ? "bg-gray-200" : ""
          }
        >
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Users
        </ListItem>
        <ListItem
          onClick={() => navigate("/admin/premiumrequests/")}
          className={
            location.pathname === "/admin/premiumrequests/" ? "bg-gray-200" : ""
          }
        >
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Premium Users
        </ListItem>
        <ListItem
          onClick={() => navigate("/admin/topics/")}
          className={
            location.pathname === "/admin/topics/" ? "bg-gray-200" : ""
          }
        >
          <ListItemPrefix>
            <TopicIcon className="h-5 w-5" />
          </ListItemPrefix>
          Topics
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>

        <ListItem
          onClick={Signout}
          className="text-red-800 hover:bg-red-200 hover:text-red-800"
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5 " />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
      <Alert
        open={openAlert}
        className="mb-10 mt-5"
        onClose={() => setOpenAlert(false)}
      >
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          Welcome To InsighIT
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          Welcome Back To InsighIT . Have a Nice day.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
        </div>
      </Alert>
    </Card>
  );
}
