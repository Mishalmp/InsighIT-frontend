import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import {
  IssueReportView,
  ListIssuesByUser,
  CreateReportIssue,
} from "../../../services/UserApi";
import helpcenter from "../../../assets/chatbg.jpg";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { timeAgo } from "../../../helpers/Timemanage";
import { sendNotificationadmin } from "../../../helpers/NotificationAdmin";
import { useNavigate } from "react-router-dom";
function ReportIssue() {
  const { userinfo } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const [prevreports, setPrevreports] = useState([]);

  const [issue, setissue] = useState("");

  const FetchUserReports = async () => {
    try {
      const res = await ListIssuesByUser(userinfo.id);
      setPrevreports(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    document.title="InsighIT | Report";
    FetchUserReports();
  }, []);



  const handlesubmit = async () => {
    const values = {
      issue: issue,
      user: userinfo.id,
    };

    const notificationMessage = `${userinfo.first_name+" "+userinfo.last_name} reported issue`

    try {
      if (issue.trim()) {
        await CreateReportIssue(values);
        FetchUserReports()
        // sendNotificationadmin(notificationMessage)

        toast.success("Your Issue recorded succussfully");
        setissue("");
      } else {
        toast.error("field empty");
      }
    } catch (error) {
      console.error(error);
      toast.error("failed to submit");
    }
  };

  return (
    <div>
    
      <div className="flex-col">
        <div
          className="w-full h-[25rem] rounded-lg shadow-2xl -mt-10"
          style={{ backgroundImage: `url(${helpcenter})` }}
        >
                <Breadcrumbs className="ml-20 w-44 mt-10">
            <div onClick={() => navigate("/User/Home/")} className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <div className="opacity-60">
              <span>Report Issue</span>
            </div>
          </Breadcrumbs>
          <p className="text-5xl text-center font-serif">Report Issues</p>


          <div className="w-[40rem] h-[6rem] ml-[28rem] mt-28 flex">
            <Input
              label="Write Your Concern..."
              value={issue}
              onChange={(e) => setissue(e.target.value)}
              className="bg-white "
            />

            <div className="ml-5 bg-black text-white h-[2.4rem] w-32 text-center rounded-lg hover:cursor-pointer">
              <p className="mt-2" onClick={handlesubmit}>
                Submit
              </p>
            </div>
          </div>
          <p className="text-center -mt-6 font-serif text-gray-600">
            Write any issue,suggestion to improve website
          </p>
        </div>

        <div className="w-[70rem] rounded-lg mt-10 max-h-[39rem] hidescroll overflow-y-auto min-h-[30rem] bg-white shadow-2xl ml-[12rem]">
          <p className="text-5xl text-center font-serif"> Recent issues</p>

          {prevreports.length > 0 ? (
            prevreports.map((issue)=>(
                <div className="w-[45rem] ml-[12rem] bg-white gap-8 hover:cursor-pointer hover:bg-gray-200 h-24 mt-5 flex rounded-lg shadow-2xl">
                <p className="mt-8 ml-10 w-[20rem] font-semibold text-sm">
                  {" "}
                  {issue.issue}
                </p>
  
                <p className="text-xs mt-10 text-gray-500">{timeAgo(issue.created_at)} </p>
                <p className={`${issue.is_fixed?"bg-green-100  text-blue-800":"bg-red-100 text-red-800"}   w-24 text-md font-semibold  justify-center items-center mt-9 ml-8 h-[1.6rem] flex rounded-md`}>
                  {issue.is_fixed?'Fixed':'Not fixed' }
                </p>
              </div>
            ))
          
          ) : (
            <Typography variant="h3" className="text-center">
              No issues Found
            </Typography>
          )}

    
        </div>
      </div>

   
    </div>
  );
}

export default ReportIssue;
