import { PremiumAxiosInstant } from "../utils/axiosUtils";
import { RefreshToken } from "./UserApi";


const CreatepremiumUserinfo=(values)=>{
    return PremiumAxiosInstant.post("/premiumuserinfo/",values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}
const CreateExperiences=(values)=>{
    return PremiumAxiosInstant.post("/experiences/",values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}
const CreateQualifications=(values)=>{
    return PremiumAxiosInstant.post("/qualifications/",values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const GetPremiuminfolist=(searchQuery,filter)=>{
    return PremiumAxiosInstant.get(`/premiumuserinfolist/?search=${searchQuery}&filter=${filter}`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}


const GetPremiuminfo=(id)=>{
    return PremiumAxiosInstant.get(`/premiumuserinfoview/${id}/`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const GetPremiuminfobyUser=(id)=>{
    return PremiumAxiosInstant.get(`/premiumuserinfouserview/${id}/`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const UpdatePremiuminfo=(id,values)=>{
    return PremiumAxiosInstant.patch(`/premiumuserinfoview/${id}/`,values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}



const createpremiumrequest=(values)=>{
    return PremiumAxiosInstant.post("/premiumrequestcreate/",values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const PremiumReqList=()=>{
    return PremiumAxiosInstant.get("/premiumuserrequestlist/",{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const PremiumReqView=(id)=>{
    return PremiumAxiosInstant.get(`/premiumuserreqview/${id}/`,{
        withCredentials:true

    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const PremiumReqUpdate=(id,values)=>{
    return PremiumAxiosInstant.patch(`/premiumuserreqview/${id}/`,values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

export {CreatepremiumUserinfo,CreateExperiences,CreateQualifications,GetPremiuminfo,
    GetPremiuminfolist,createpremiumrequest,PremiumReqList,PremiumReqView,
    PremiumReqUpdate,UpdatePremiuminfo,GetPremiuminfobyUser


}