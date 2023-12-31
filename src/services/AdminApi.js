import { AdminAxiosInstant } from "../utils/axiosUtils";
import { RefreshToken } from "./UserApi";

const AdminSignIn=(values)=>{
    return AdminAxiosInstant.post("token/",values,{
        withCredentials:true
    }).catch((error)=>error.response);
}

const ListUser = (searchQuery,filter)=>{
    return AdminAxiosInstant.get(`userlist/?search=${searchQuery}&filter=${filter}`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const ListTopics = (searchQuery,filter,sort)=>{
    return AdminAxiosInstant.get(`topicsList/?search=${searchQuery}&filter=${filter}&sort=${sort}`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}


const BlockUser=(id,values)=>{
    return AdminAxiosInstant.put(`userblockunblock/${id}/`,values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}
const Dashboardstats=()=>{
    return AdminAxiosInstant.get("dashboardStats/",{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}


export {AdminSignIn,ListUser,BlockUser,Dashboardstats,ListTopics}