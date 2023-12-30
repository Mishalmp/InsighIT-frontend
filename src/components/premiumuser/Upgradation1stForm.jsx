import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
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
import { useSelector, useDispatch } from "react-redux";
import { CreatepremiumUserinfo } from "../../services/PremiumApi";
import { setPremiumUserInfo } from "../../Redux/UserSlice";



import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


// Define validation schema using Yup
const validationSchema = Yup.object({
  pan_number: Yup.string().required("Pan Card No is required"),
  bank_name: Yup.string().required("Bank Name is required"),
  account_number: Yup.string().required("Account No is required"),
  ifsc_code: Yup.string().required("IFSC is required"),
  linkedin_url: Yup.string().url("Invalid LinkedIn URL").required("LinkedIn URL is required"),
});

function Upgradation1stForm({ onNext}) {
  const { userinfo } = useSelector((state) => state.user);
  const dispatch=useDispatch()


  // const initialValues = {
  //   pan_number: "",
  //   bank_name: "",
  //   account_number: "",
  //   ifsc_code: "",
  //   linkedin_url: "",
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("user", userinfo.id);

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }
    // try {
      // const response = await CreatepremiumUserinfo(formData);
      // console.log(response.data, "resadsa");
      // dispatch(setPremiumUserInfo({
      //   premiumuserinfo:response.data
      // }))

    // } catch (error) {
    //   console.error("error!", error);
    // }

    onNext(formData);
  };

  return (
    <div>
      <Card className="w-[50rem] ml-72 h-auto mt-5 bg-gray-100">
        <Typography variant="h4" className="text-center mt-5">
          Premium Upgrade Form
        </Typography>
        <Typography variant="h5" color="blue" className="text-center mt-5">
          Step 1/2
        </Typography>
        {/* <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      > */}
        <form className="m-16" onSubmit={handleSubmit}>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div className="w-72">
              <Input
                variant="standard"
                name="pan_number"
                size="lg"
                label="Pan Card No:"
              />
            {/* <ErrorMessage name="pan_number" component="div" className="text-red-500" /> */}
            </div>
            <div className="w-72">
              <Input
                label="Bank Name"
                name="bank_name"
                variant="standard"
                size="lg"
              />
              {/* <ErrorMessage name="bank_name" component="div" className="text-red-500" /> */}
            </div>
            <div className="w-72">
              <Input
                label="Account No"
                name="account_number"
                variant="standard"
                size="lg"
              />
              {/* <ErrorMessage name="account_number" component="div" className="text-red-500" /> */}
              
            </div>
            <div className="w-72">
              <Input
                label="IFSC"
                name="ifsc_code"
                variant="standard"
                size="lg"
              />
              {/* <ErrorMessage name="ifsc_code" component="div" className="text-red-500" /> */}

            </div>
            <div className="w-72">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="file_input"
              >
                Aadhar img
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
              />
            </div>
            <div className="w-72">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="file_input"
              >
                Pan Card
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
              />
            </div>
            <div className="w-96 ml-28 mt-10 ">
              <Input
                label="LinkedIn link"
                name="linkedin_url"
                variant="standard"
                size="lg"
              />
              {/* <ErrorMessage name="linkedin_url" component="div" className="text-red-500" /> */}

            </div>
          </div>

          <button
            type="submit"
            class="text-white ml-[40%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Next
          </button>
        </form>
        {/* </Formik> */}
      </Card>
    </div>
  );
}

export default Upgradation1stForm;
