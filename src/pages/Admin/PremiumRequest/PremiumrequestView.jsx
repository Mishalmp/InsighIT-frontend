import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../components/Admin/AdminNavbar";
import AdminSidebar from "../../../components/Admin/AdminSidebar";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { Loader } from "../../../components/Loading/Loader";
import VerifiedIcon from "@mui/icons-material/Verified";
import { GetPremiuminfo,UpdatePremiuminfo } from "../../../services/PremiumApi";
import { UpdateUser } from "../../../services/UserApi";
import { useLocation, useParams } from "react-router-dom";

function PremiumrequestView() {
    // const {premiumId}=useParams()
    const location = useLocation()
  const premiumId = location.state.premiumId
  const [premiuminfo, setpremiuminfo] = useState(null);
  const [experiences, setExperiences] = useState(null);
  const [qualifications, setqualifications] = useState(null);
  

  const fetchpremiumInfo = async () => {
    try {
      const res = await GetPremiuminfo(premiumId);
      setpremiuminfo(res.data);
      setExperiences(res.data.experience);
      setqualifications(res.data.qualification);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.title="InsighIT | Premium View";
    fetchpremiumInfo();
  }, []);

  if (!premiuminfo) {
    return <Loader />;
  }

  const handleClick=async()=>{

    if(premiuminfo.is_approved){
      var is_block = false
    }else{
        var is_block=true
    }

    try {
        await UpdatePremiuminfo(premiumId,{is_approved:is_block})
        await UpdateUser(premiuminfo.user.id,{is_premium:is_block})
        fetchpremiumInfo();
        
    } catch (error) {
        console.error(error);
        
    }
  }

  console.log(premiuminfo);

  return (
  
    <>
        <div className="w-[63rem] h-[42rem] mt- bg-gray-100">
          <Typography
            variant="h3"
            color="blue-gray"
            className="text-center mt-10"
          >
            Premium Request View
          </Typography>

          <Card className="w-[60rem] h-[34rem] ml-6 mt-6">
            <div
              role="button"
              className="items-center flex justify-center w-full p-3 leading-tight transition-all rounded-lg bg-gray-50 outline-none text-start hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              <div className="grid mr-4 place-items-center">
                <img
                  alt="candice"
                  src={`${
                    premiuminfo.user.profile_img
                      ? premiuminfo.user.profile_img
                      : "https://docs.material-tailwind.com/img/face-1.jpg"
                  }`}
                  className="relative inline-block h-14 w-14 !rounded-full object-cover object-center"
                />
              </div>
              <div className="flex-col">
                <h3 className="block font-sans  text-lg antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  {premiuminfo.user.first_name +
                    " " +
                    premiuminfo.user.last_name}
                  <VerifiedIcon
                    color="primary"
                    fontSize="medium"
                    className="-mt-1 ml-2"
                  />
                </h3>
                <p className="block font-sans  text-sm antialiased text-center font-normal leading-normal text-blue-gray-700">
                  <p className="text-gray-700 text-md text-center font-serif">
                    {premiuminfo.user.email}
                  </p>
                  {premiuminfo.user.tag_name}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 ml-10 max-h-[30rem] overflow-y-auto mr-10 mt-10 gap-5">
              <div className="max-w-[20rem]">
                <Typography variant="h5">About :</Typography>
                <p className="mt-4">{premiuminfo.user.bio} </p>
              </div>
              <div className="max-w-[20rem]">
                <Typography variant="h5">Experiences :</Typography>
                {experiences.map((experience) => (
                  <p>{experience.experience} </p>
                ))}
              </div>
              <div>
                <Typography variant="h5">Qualifications :</Typography>
                {qualifications.map((qualification) => (
                  <p>{qualification.qualifications} </p>
                ))}
              </div>
              <div>
                <Typography variant="h5">Account number :</Typography>
                <p className="mt-4">{premiuminfo.account_number}</p>
              </div>
              <div>
                <Typography variant="h5">Bank name :</Typography>
                <p className="mt-4">{premiuminfo.bank_name}</p>
              </div>
              <div>
                <Typography variant="h5">IFSC Code :</Typography>
                <p className="mt-4">{premiuminfo.ifsc_code}</p>
              </div>
              <div>
                <Typography variant="h5">Linkedin URL :</Typography>
                <p className="font-serif text-blue-800 underline mt-4">
                  {premiuminfo.linkedin_url}
                </p>
              </div>
              <div>
                <Typography variant="h5">Is Approved :</Typography>
                <Chip
                  size="sm"
                  variant="ghost"
                  value={premiuminfo.is_approved ? "Approved" : "Not Approved"}
                  color={premiuminfo.is_approved ? "green" : "red"}
                  className="w-36 h-10 mt-2 text-center hover:cursor-pointer"
                />
              </div>
            </div>
            <Button onClick={handleClick} variant="text" className={` mt-5 float-right ml-[22rem] text-white w-40 ${premiuminfo.is_approved ?"bg-red-600 hover:bg-red-500":"bg-green-600 hover:bg-green-500"}}`}>{premiuminfo.is_approved ?"Block":"Approve" } </Button>
          </Card>
        </div>
</>
  );
}

export default PremiumrequestView;
