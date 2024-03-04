import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import InstagramIcon from "@mui/icons-material/Instagram";

import "react-toastify/dist/ReactToastify.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import VerifiedIcon from "@mui/icons-material/Verified";

import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Progress } from "@material-tailwind/react";
import { toast } from "react-toastify";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Alert,
  Avatar,
  Slider,
} from "@material-tailwind/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Input, Checkbox } from "@material-tailwind/react";
import { Loader } from "../../../components/Loading/Loader";
import { useSelector, useDispatch } from "react-redux";
import { setUpdateInfo } from "../../../Redux/UserSlice";
import { LogoutDetails } from "../../../Redux/UserSlice";
import {
  UpdateUser,
  CreateSkill,
  ListSkills,
  EditSkill,
  DeleteSkill,
} from "../../../services/UserApi";
import { Link, useNavigate } from "react-router-dom";
import Bloglistinprofile from "../../../components/blogs/bloglistinprofile";
import Followlist from "../../../components/followlist/followlist";
import Subscribelist from "../../../components/subscribelist/Subscribelist";
import Wallet from "../../../components/premiumuser/Wallet/Wallet";
import { FaWallet } from "react-icons/fa6";
import { SlUserFollowing } from "react-icons/sl";
import { MdSubscriptions } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import { GrGroup } from "react-icons/gr";
import ChangeName from "../../../components/Userside/edituser/ChangeName";
import ChangePass from "../../../components/Userside/edituser/ChangePass";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { GetUserInfo } from "../../../services/UserApi";
function UserProfile() {
  const navigate = useNavigate();
  const { userinfo } = useSelector((state) => state.user);
  const { premiumuserinfo } = useSelector((state) => state.user);
  const [skills, setSkills] = useState([]);
  const [follows, setfollows] = useState({
    followers: 0,
    followings: 0,
  });

  const [skillopen, setskillOpen] = useState(false);
  const [skill, setSkill] = useState({ skill: "", rateofskills: 0 });
  const handleskillopen = () => setskillOpen((cur) => !cur);

  const [skilleditopen, setskilleditopen] = useState(false);
  const [selectedskillId, setselectedskillId] = useState(null);

  const fetchskills = async () => {
    try {
      const response = await ListSkills(userinfo.id);
      setSkills(response.data);
    } catch (error) {
      console.error("error ! couldn't fectch skills ", error);
    }
  };

  const fetchfollows = async () => {
    try {
      const ress = await GetUserInfo(userinfo.id);
      setfollows({
        followers: ress.data.followers_count,
        followings: ress.data.followings_count,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    document.title = "InsighIT | Profile";
    fetchskills();
    fetchfollows();
  }, [userinfo]);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleloading = () => setLoading((cur) => !cur);
  const [opencover, setOpencover] = useState(false);
  const handleOpen = () => setOpencover((cur) => !cur);

  const handlecoverimgUpload = async (file) => {
    handleloading();
    try {
      const id = userinfo.id;
      const formData = new FormData();
      formData.append("cover_img", file);
      const res = await UpdateUser(id, formData);
      //   console.log(res.data, "resdaata");

      dispatch(
        setUpdateInfo({
          updatedData: {
            userinfo: { cover_img: res.data.cover_img },
          },
        })
      );
      handleloading();
      //   console.log(res.data, "resdaata2222");
    } catch (error) {
      handleloading();
      console.log(error);
    }
  };

  const handleprofileimgUpload = async (file) => {
    handleloading();
    try {
      const id = userinfo.id;
      const formData = new FormData();
      formData.append("profile_img", file);
      const res = await UpdateUser(id, formData);

      dispatch(
        setUpdateInfo({
          updatedData: {
            userinfo: { profile_img: res.data.profile_img },
          },
        })
      );
      handleloading();
    } catch (error) {
      handleloading();
      console.log(error);
    }
  };

  const [bio, setBio] = useState(userinfo.bio);
  const [aboutopen, setaboutOpen] = useState(false);
  const handleaboutOpen = () => setaboutOpen((cur) => !cur);

  const Handlesavebio = async () => {
    if (bio.trim() && isNaN(bio)) {
      try {
        const response = await UpdateUser(userinfo.id, { bio });

        toast.success("bio updated succussfully");

        dispatch(
          setUpdateInfo({
            updatedData: {
              userinfo: { bio: response.data.bio },
            },
          })
        );
        // handleloading()
        setaboutOpen(false);
      } catch (error) {
        // handleloading()
        console.error(error);
      }
    } else {
      toast.error("Invalid Input");
    }
  };

  const handleSkillEditOpen = () => setskilleditopen(true);

  const [prevskill, setprevskill] = useState("");
  const handleskilledit = (selectedSkill) => {
    setSkill({ ...selectedSkill });
    setprevskill(selectedSkill.skill);
    setselectedskillId(selectedSkill.id);

    handleSkillEditOpen();
  };

  const handleskilleditsubmit = async () => {
    const isSkillExists = skills.some(
      (existingSkill) =>
        existingSkill.skill === skill.skill.trim() &&
        prevskill !== existingSkill.skill
    );

    if (skill.skill.trim() && !isSkillExists && isNaN(skill.skill)) {
      try {
        const res = await EditSkill(selectedskillId, skill);
        fetchskills();
        setSkill({ skill: "", rateofskills: 0 });
        toast.success("Skill edited successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Error occurred during skill edit");
      }
      setskilleditopen(false);
    } else {
      toast.error("Skill already exists or invalid skill name");
    }
  };

  const handleSkilldelete = async () => {
    try {
      const ress = await DeleteSkill(selectedskillId);
      fetchskills();
      toast.success("Skill deleted succussfully!");
    } catch (error) {
      console.error(error);
    }
    setskilleditopen(false);
  };

  const HandleSkillSubmit = async () => {
    const user_id = userinfo.id;
    const skillData = { ...skill, user_id };

    // Check if the skill already exists in the skills array
    const isSkillExists = skills.some(
      (existingSkill) => existingSkill.skill === skill.skill.trim()
    );

    if (skill.skill.trim() && !isSkillExists && isNaN(skill.skill)) {
      try {
        const response = await CreateSkill(skillData);
        fetchskills();
        setSkill({ skill: "", rateofskills: 0 });

        toast.success("Skill created successfully!");
        setskillOpen(false);
      } catch (error) {
        console.error("Error occurred during skill creation", error);
        toast.error("Error occurred during skill creation");
      }
    } else {
      toast.error("Skill already exists or invalid skill name");
    }
  };

  const data = [
    {
      label: "Profile",
      value: "profile",
      icon: UserCircleIcon,
    },
    // {
    //   label: "Blogs",
    //   value: "blogs",
    //   icon: Square3Stack3DIcon,

    // },
    {
      label: "Subscriptions",
      value: "subscriptions",
      icon: MdSubscriptions,
    },
    ...(userinfo.is_premium
      ? [
          {
            label: "Subscribers",
            value: "subscribers",
            icon: HiUserGroup,
          },
        ]
      : []),
    ...(userinfo.is_premium
      ? [
          {
            label: "Wallet",
            value: "wallet",
            icon: FaWallet,
          },
        ]
      : []),

    {
      label: "Followings",
      value: "followings",
      icon: SlUserFollowing,
    },
    {
      label: "Followers",
      value: "followers",
      icon: GrGroup,
    },
    // {
    //   label: "Settings",
    //   value: "settings",
    //   icon: Cog6ToothIcon,

    // },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChangeNameOpen, setChangeNameOpen] = useState(false);
  const [isChangePassOpen, setChangePassOpen] = useState(false);
  const [monetizeopen, setmonetizeopen] = useState(false);

  const handleToggleChangeName = () => setChangeNameOpen((prev) => !prev);
  const handleToggleChangePass = () => setChangePassOpen((prev) => !prev);

  console.log(premiumuserinfo, "is upgradeeddd");
  return (
    <div className="">
      {loading && <Loader />}

      <div className="flex flex-col lg:flex-row md:ml-10 ml-5 lg:ml-auto lg:mx-auto mt-[1rem] h-auto  max-w-6xl ">
        <div className="lg:max-w-3xl max-w-xl min-h-[50rem] mt-8 bg-white shadow-2xl rounded-lg">
          {/* <Alert color="amber">A simple alert for showing message.</Alert> */}
          <Card className="lg:max-w-3xl max-w-xl  m-3 -mt-2.5 bg-gray-100 shadow-2xl">
            <div className="lg:max-w-3xl max-w-xl flex relative">
              {userinfo.cover_img ? (
                <>
                  <img
                    className="absolute top-0 left-0 h-48 w-full rounded-t-lg object-cover object-center"
                    src={userinfo.cover_img}
                    alt="Banner img"
                  />
                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlecoverimgUpload(e.target.files[0])}
                  />
                </>
              ) : (
                <div className="absolute top-0 left-0 mt-0 w-full h-52 flex items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          upload Cover Image
                        </span>{" "}
                      </p>
                    </div>

                    <input
                      id="dropzone-file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlecoverimgUpload(e.target.files[0])}
                    />
                  </label>
                </div>
              )}
              <CameraAltIcon
                color="info"
                className="w-52 z-10 absolute mt-[10.6rem] ml-[22.4rem] md:ml-[25rem] lg:ml-[28.4rem] cursor-pointer hover:text-blue-800"
                onClick={() => document.getElementById("dropzone-file").click()}
              />
            </div>
            <Dialog size="xl" open={opencover} handler={handleOpen}>
              <DialogHeader className="justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    size="sm"
                    variant="circular"
                    alt="username"
                    src={userinfo.profile_img}
                  />
                  <div className="-mt-px flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {userinfo.first_name} {userinfo.last_name}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-xs font-normal"
                    >
                      @{userinfo.first_name}
                    </Typography>
                  </div>
                </div>
              </DialogHeader>
              <DialogBody>
                <img
                  alt="nature"
                  className="h-[30rem] w-full rounded-lg object-cover object-center"
                  src={userinfo.cover_img}
                />
              </DialogBody>
            </Dialog>

            <div className="flex relative">
              <CardHeader
                floated={false}
                className="h-32 w-32 ml-[36%] mt-36 relative z-10"
              >
                {userinfo.profile_img ? (
                  <div>
                    <img
                      className="w-32"
                      src={userinfo.profile_img}
                      alt="profile-picture"
                      onClick={() =>
                        document.getElementById("dropzone-file").click()
                      }
                    />
                    <label
                      htmlFor="pro-file"
                      className="flex flex-col items-center justify-center w-32 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <input
                        id="pro-file"
                        type="file"
                        class="hidden"
                        accept="image/*"
                        onChange={(e) =>
                          handleprofileimgUpload(e.target.files[0])
                        }
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex relative ">
                    <label
                      htmlFor="pro-file"
                      className="flex flex-col items-center justify-center w-32 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      {/* <AccountBoxIcon  /> */}
                      <div class="flex flex-col items-center h-32 w-32 justify-center -mt-20">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
                          <span class=" text-sm">Click to upload dp</span>{" "}
                        </p>
                      </div>
                      <input
                        id="pro-file"
                        type="file"
                        class="hidden"
                        accept="image/*"
                        onChange={(e) =>
                          handleprofileimgUpload(e.target.files[0])
                        }
                      />
                    </label>
                  </div>
                )}
              </CardHeader>
              {/* <div className="ml-24 w-52 h-8 flex text-center gap-2 rounded-full text-green-700 bg-white border-green-700 border-[2px]">
                <p className="ml-3">Request for Upgrade</p>{" "}
                <img className="w-6 h-6" src={Crown} alt="crown" />
              </div> */}
            </div>
            <CameraAltIcon
              color="info"
              className="absolute lg:ml-[17.4rem] ml-[15.5rem] md:ml-[16.4rem] z-10 mt-[15.9rem] cursor-pointer hover:text-blue-800"
              onClick={() => document.getElementById("pro-file").click()}
            />
            <CardBody className="text-center relative">
              <Typography variant="h4" color="blue-gray" className="mb-2 ">
                {userinfo.first_name} {userinfo.last_name}{" "}
                {userinfo.is_premium && (
                  <VerifiedIcon className="-mt-1" color="primary" />
                )}
              </Typography>
              <Typography className="mt-2 font-thin text-lg text-gray-500">
                {userinfo.tag_name}
              </Typography>
              <div className="flex gap-6 ml-24 -mb-4">
                <Typography className="mt-4 font-semibold text-lg text-blue-800">
                  {follows.followers} Followers
                </Typography>
                <Typography className="mt-4  font-semibold text-lg text-blue-800">
                  {follows.followings} Following
                </Typography>
              </div>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 ml-16">
              {/* <span>
            Edit
            </span> */}
              <InstagramIcon
                onClick={handleOpen}
                color="secondary"
                className="cursor-pointer"
              />
              <GitHubIcon />
              <LinkedInIcon color="primary" />
              {userinfo.is_premium && (
                // <Tooltip content="Monetization info">

                <MonetizationOnOutlinedIcon
                  color="success"
                  onClick={() => setmonetizeopen(true)}
                  className="cursor-pointer hover:text-blue-700"
                />
                // </Tooltip>
              )}

              <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                // placement="bottom-end"
              >
                <MenuHandler>
                  <Cog6ToothIcon className="w-6 h-6 cursor-pointer hover:text-blue-700" />
                </MenuHandler>
                <MenuList className="p-1">
                  <div>
                    <MenuItem
                      className="flex items-center gap-2 rounded"
                      onClick={handleToggleChangeName}
                    >
                      <EditIcon fontSize="small" />

                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal"
                        color="inherit"
                      >
                        Change Name
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      className="flex items-center gap-2 rounded"
                      onClick={handleToggleChangePass}
                    >
                      <EditIcon fontSize="small" />

                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal"
                        color="yellow"
                      >
                        Change Password
                      </Typography>
                    </MenuItem>
                  </div>
                </MenuList>
              </Menu>
              <ChangeName
                isOpen={isChangeNameOpen}
                UpdateUser={UpdateUser}
                userinfo={userinfo}
                onClose={handleToggleChangeName}
              />
              <ChangePass
                isOpen={isChangePassOpen}
                userinfo={userinfo}
                onClose={handleToggleChangePass}
              />
            </CardFooter>

            <Dialog
              size="md"
              open={monetizeopen}
              handler={() => setmonetizeopen(false)}
            >
              <DialogHeader>
                <Typography variant="h4" color="blue-gray">
                  Subscription Price Info
                </Typography>
              </DialogHeader>
              <DialogBody divider className="grid grid-cols-1 gap-4">
                <Typography variant="h6" color="blue-gray">
                  Subscription Basic Monthly:
                  {premiumuserinfo?.subscription_price_basic}
                </Typography>
                <Typography variant="h6" color="blue-gray">
                  Subscription Basic Yearly:
                  {premiumuserinfo?.sub_price_basic_yr}
                </Typography>
                <Typography variant="h6" color="blue-gray">
                  Subscription Standard Monthly:
                  {premiumuserinfo?.subscription_price_std}
                </Typography>
                <Typography variant="h6" color="blue-gray">
                  Subscription Standard Yearly:
                  {premiumuserinfo?.sub_price_std_yr}
                </Typography>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button
                  variant="text"
                  color="blue-gray"
                  onClick={() => setmonetizeopen(false)}
                >
                  close
                </Button>
                <Button
                  variant="gradient"
                  onClick={() => setmonetizeopen(false)}
                >
                  Ok, Got it
                </Button>
              </DialogFooter>
            </Dialog>

            {premiumuserinfo && premiumuserinfo.is_approved ? (
              ""
            ) : (
              <Link to="/User/upgradeform/">
                {" "}
                <Button
                  // variant="gradient"
                  size="sm"
                  className="float-right mt-4 mr-5 mb-2 font-thin text-xs "
                >
                  Need to Upgrade?
                </Button>
              </Link>
            )}
          </Card>

          <Card className="lg:max-w-3xl max-w-xl m-3 mt-5 bg-gray-100 shadow-2xl">
            <Typography variant="h5" color="blue-gray" className="m-5 ml-12">
              Skills{" "}
              <EditIcon
                fontSize="small"
                className="-mt-1 hover:cursor-pointer hover:text-blue-700 cursor-pointer"
                onClick={handleskillopen}
              />
            </Typography>

            <CardBody>
              <ul className="grid grid-cols-2 gap-2">
                {skills.map((skill) => (
                  <li
                    className="bg-green-200 w-auto hover:cursor-pointer hover:bg-green-300  h-[2.5rem] flex justify-center items-center text-blue-900  rounded-md"
                    onClick={() => handleskilledit(skill)}
                  >
                    {skill.skill}
                  </li>
                ))}
                <li
                  className="bg-green-200 w-auto  h-[2.5rem] hover:cursor-pointer hover:bg-green-300  flex justify-center items-center text-blue-900 font-semibold  rounded-md"
                  onClick={handleskillopen}
                >
                  <AddIcon /> Add Skill
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
        <Dialog
          size="xs"
          open={skilleditopen}
          // handler={handleaboutOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-[30rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Edit Skill
              </Typography>

              <Typography className="-mb-2" variant="h6">
                Skill Name
              </Typography>
              <Input
                label="skill"
                name="skill"
                value={skill.skill}
                size="lg"
                onChange={(e) => {
                  setSkill({ ...skill, [e.target.name]: e.target.value });
                }}
              />

              <Typography className="-mb-2" variant="h6">
                Skill Rating
              </Typography>
              <div className="w-96 mb-3">
                <Slider
                  color="black"
                  Value={skill.rateofskills}
                  name="rateofskills"
                  onChange={(e) => {
                    setSkill({
                      ...skill,
                      ["rateofskills"]: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                fullWidth
                onClick={handleskilleditsubmit}
              >
                Save
              </Button>
              <Typography
                as="a"
                // href="#signup"
                variant="small"
                color="red"
                className="ml-48 mt-5 font-bold"
                onClick={handleSkilldelete}
              >
                Delete
              </Typography>
              <Typography variant="small" className="mt-6 flex justify-center">
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="black"
                  className="ml-1 font-bold"
                  onClick={() => setskilleditopen(false)}
                >
                  Don't Save
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </Dialog>

        <Dialog
          size="xs"
          open={skillopen}
          // handler={handleaboutOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-[30rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Add Skill
              </Typography>

              <Typography className="-mb-2" variant="h6">
                Skill Name
              </Typography>
              <Input
                label="skill"
                name="skill"
                value={skill.skill}
                size="lg"
                onChange={(e) => {
                  setSkill({ ...skill, [e.target.name]: e.target.value });
                }}
              />

              <Typography className="-mb-2" variant="h6">
                Skill Rating
              </Typography>
              <div className="w-96 mb-3">
                <Slider
                  color="black"
                  Value={skill.rateofskills}
                  name="rateofskills"
                  onChange={(e) => {
                    setSkill({
                      ...skill,
                      ["rateofskills"]: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={HandleSkillSubmit} fullWidth>
                Save
              </Button>
              <Typography variant="small" className="mt-4 flex justify-center">
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="black"
                  className="ml-1 font-bold"
                  onClick={handleskillopen}
                >
                  Don't Save
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </Dialog>

        <div className="md:max-w-6xl w-full m-5 ml-0 lg:ml-5 min-h-[50rem] bg-white shadow-2xl rounded-lg">
          <div className="">
            <Tabs value="profile" className="mt-5 ml-2 mr-2">
              <TabsHeader>
                {data.map(({ label, value, icon }) => (
                  <Tab key={value} value={value}>
                    <div className="flex items-center gap-2">
                      <div className="hidden xl:flex items-center">
                        {/* Show label and icon for md and larger screens */}
                        {React.createElement(icon, { className: "w-5 h-5" })}
                        {label}
                      </div>
                      <div className="xl:hidden flex items-center">
                        {/* Show only icon for screens smaller than md */}
                        {React.createElement(icon, { className: "w-5 h-5" })}
                      </div>
                    </div>
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value }) => (
                  <TabPanel key={value} value={value}>
                    {value === "profile" && (
                      <>
                        <Card className="max-w-6xl  h-auto mt-5 bg-gray-100 shadow-2xl">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="m-5 ml-10"
                          >
                            About Me{" "}
                            <EditIcon
                              fontSize="small"
                              className="-mt-1 hover:text-blue-700 cursor-pointer"
                              onClick={handleaboutOpen}
                            />
                          </Typography>

                          <Typography
                            className="text-md max-w-2xl h-[10rem] ml-10 text-gray-600 container"
                            textGradient
                          >
                            {userinfo.bio}
                          </Typography>
                          {/* <div className="grid grid-cols-2">
                            <div>
                              <Typography
                                variant="h6"
                                className="m-5 ml-10  text-gray-600"
                              >
                                Education :
                              </Typography>
                              <Typography
                                className="font-medium  max-w-2xl ml-10 -mt-2 text-gray-600 container"
                                textGradient
                              >
                                Bachelors in Computer Application
                              </Typography>
                            </div>

                            <div className="mb-10">
                              <Typography
                                variant="h6"
                                className="m-5 ml-10  text-gray-600"
                              >
                                Work Experience :
                              </Typography>
                              <Typography
                                className="font-medium  max-w-2xl ml-10 -mt-2 text-gray-600 container"
                                textGradient
                              >
                                3 years experience in web development
                              </Typography>
                            </div>
                          </div> */}
                        </Card>
                        <Dialog
                          size="xs"
                          open={aboutopen}
                          // handler={handleaboutOpen}
                          className="bg-transparent shadow-none"
                        >
                          <Card className="mx-auto max-w-2xl">
                            <CardBody className="flex flex-col gap-4">
                              <Typography variant="h4" color="blue-gray">
                                About Me
                              </Typography>

                              <Typography className="-mb-2" variant="h6">
                                Your Bio (Max 30 words)
                              </Typography>
                              <textarea
                                name="bio"
                                placeholder={
                                  bio ? { bio } : "write your bio..."
                                }
                                value={bio}
                                // defaultValue={bio}
                                id=""
                                cols="30"
                                rows="5"
                                onChange={(e) => setBio(e.target.value)}
                              ></textarea>

                              {/* <div className="-ml-2.5 -mt-3">
                            <Checkbox label="Remember Me" />
                          </div> */}
                            </CardBody>
                            <CardFooter className="pt-0">
                              <Button
                                variant="gradient"
                                onClick={Handlesavebio}
                                fullWidth
                              >
                                Save
                              </Button>
                              <Typography
                                variant="small"
                                className="mt-4 flex justify-center"
                              >
                                <Typography
                                  variant="small"
                                  color="black"
                                  className="ml-1 font-bold"
                                  onClick={handleaboutOpen}
                                >
                                  Don't Save
                                </Typography>
                              </Typography>
                            </CardFooter>
                          </Card>
                        </Dialog>

                        <Card className="max-w-6xl  mt-5 bg-gray-100 shadow-2xl">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="m-5 ml-10"
                          >
                            Skills Ratings
                          </Typography>
                          {skills && skills.length > 0 ? (
                            skills.map((skill) => (
                              <div className="max-w-5xl ml-10 mb-10">
                                <div className="mb-2 flex items-center justify-between gap-4">
                                  <Typography color="blue-gray" variant="h6">
                                    {skill.skill}
                                  </Typography>
                                  <Typography color="blue-gray" variant="h6">
                                    {skill.rateofskills}%
                                  </Typography>
                                </div>
                                <Progress value={skill.rateofskills} />
                              </div>
                            ))
                          ) : (
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className=" m-1 ml-10 mb-5"
                            >
                              Skills not Added
                            </Typography>
                          )}
                        </Card>
                      </>
                    )}
                    {value === "blogs" && (
                      <Bloglistinprofile userid={userinfo.id} />
                    )}
                    {value === "followings" && (
                      <Followlist user_id={userinfo.id} is_followings={true} />
                    )}
                    {value === "followers" && (
                      <Followlist user_id={userinfo.id} is_followings={false} />
                    )}
                    {value === "subscriptions" && (
                      <Subscribelist
                        user_id={userinfo.id}
                        is_subscription={true}
                      />
                    )}
                    {value === "subscribers" && (
                      <Subscribelist
                        user_id={userinfo.id}
                        is_subscription={false}
                      />
                    )}
                    {value === "wallet" && (
                      <div className="max-h-[50rem] overflow-y-auto">
                        <Wallet user={userinfo} />
                      </div>
                    )}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
