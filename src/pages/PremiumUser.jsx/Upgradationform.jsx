import React, { useState } from 'react'

import NavBar from '../../components/Userside/NavBar/NavBar'
import Footer from '../../components/Userside/footer/footer'

import Upgradation1stForm from '../../components/premiumuser/Upgradation1stForm';
import Upgradeformfinal from '../../components/premiumuser/upgradeformfinal';
import { Typography } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
function Upgradationform() {
  const { premiumuserinfo } = useSelector((state) => state.user);
  const [currentStep, setCurrentStep] = useState(1);
  const [premiumUserInfo, setPremiumUserInfo] = useState(null);

  

  const handleNext = (FormData) => {
    setPremiumUserInfo(FormData)

    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
 
  return (
    <div>
    

      {premiumuserinfo ? (
        <>
          <Typography variant='h1' className='text-center mt-20'>Your request is recorded</Typography>
          <Typography variant='h1' className='text-center mt-10 mb-36'>Wait for the confirmation</Typography>
        </>
      ) : (
        <>
          {currentStep === 1 && (
            <Upgradation1stForm onNext={handleNext} />
          )}

          {currentStep === 2 && (
            <Upgradeformfinal onBack={handleBack} formData={premiumUserInfo} />
          )}
        </>
      )}
     

   
    </div>
  );
}

export default Upgradationform
