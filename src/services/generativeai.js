import { GenerativeaiAxiosInstant } from "../utils/axiosUtils";
import { RefreshToken } from "./UserApi";



const CreateContentai=(data)=>{
    return GenerativeaiAxiosInstant.post("/text_generation/",data,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}


export {
    CreateContentai
}

