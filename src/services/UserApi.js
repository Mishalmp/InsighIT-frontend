import { UserAxiosInstant } from "../utils/axiosUtils";



const RefreshToken = async () => {
    
    let authToken = localStorage.getItem("token");
    const refreshtoken = JSON.parse(authToken);
    try {
        const res = await UserAxiosInstant.post(
            "accounts/token/refresh/",
            { refresh: refreshtoken.refresh },
            { withCredentials: true }
          );
          if (res.status === 200) {
            const token = JSON.stringify(res.data);
            localStorage.setItem("token", token);
          }
    } catch (error) {
        console.error(error);
    }
  };


const UserSignin=(values)=>{
    return UserAxiosInstant.post("accounts/token/",values,{
        withCredentials:true
    }).catch((error)=>error.response);
};

const Logout = () => {
    const authToken = localStorage.getItem("token");
    const refreshToken = JSON.parse(authToken).refresh;
  
    return UserAxiosInstant
      .post(
        "accounts/logout/",
        { refresh: refreshToken },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Logout successful", response);
        localStorage.removeItem("token");
        return response; // Return the response to indicate success
      })
      .catch((error) => {
        console.error("Error during logout: ", error.response);
        throw error; // Propagate the error to the caller
      });
  };


const UserGoogleSignup=(value)=>{
    const values={
        email:value.email,
        first_name:value.given_name,
        last_name:value.family_name,
        password:value.id,
        // profile_img:value.picture,
    }
    return UserAxiosInstant.post("accounts/GoogleUser/",values,{
        withCredentials:true
    })//.catch((error=>error.response))
}

const UserGoogleSignin=(value)=>{
    const values={
        email:value.email,
        password:value.id,
    }
    return UserAxiosInstant.post("accounts/token/",values,{
        withCredentials:true
    })//.catch((error)=>error.response);
}

const GetUserInfo =(id)=>{
    return UserAxiosInstant.get(`accounts/userinfo/${id}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const UpdateUser=(id,value)=>{
    return UserAxiosInstant.patch(
        `accounts/updateuser/${id}/`,value,{
            withCredentials:true
        }
    ).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}
const ChangeUserPassword =(data)=>{
    return UserAxiosInstant.put(
        "accounts/changePassword/",data,{
            withCredentials:true
        }
    ).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}


const CreateSkill=(values)=>{
    return UserAxiosInstant.post("accounts/skills/",values,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const ListSkills=(user_id)=>{
    return UserAxiosInstant.get(`accounts/listskills/${user_id}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const EditSkill=(id,value)=>{
    return UserAxiosInstant.patch(`accounts/skillview/${id}/`,value,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });

}

const DeleteSkill=(id)=>{
    return UserAxiosInstant.delete(`accounts/skillview/${id}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}



const Checkoutsession=(data)=>{
    return UserAxiosInstant.post(`accounts/create-checkout-session/`,data,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });

}

const NotificationCreate=(values)=>{
    return UserAxiosInstant.post("accounts/notifications/",values,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}



const Notificationsbyuser=(user_id)=>{
    return UserAxiosInstant.get(`accounts/listnotification/${user_id}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const ClearNotificationbyuser=(user_id)=>{
    return UserAxiosInstant.delete(`accounts/clearallnotifications/${user_id}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const CreateSubscription=(data)=>{
    return UserAxiosInstant.post("accounts/subscriptions/",data,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const IsSubscriber=(user_id,blog_author)=>{
    return UserAxiosInstant.get(`accounts/isSubscriber/${user_id}/${blog_author}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const IsStandardSubscriber=(user_id,author_id)=>{
  return UserAxiosInstant.get(`accounts/isstandardSubscriber/${user_id}/${author_id}/`,{
      withCredentials:true
  }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}


const CreateFollowing=(values)=>{
    return UserAxiosInstant.post('accounts/followingscreate/',values,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const Unfollow=(follower_id,following_id)=>{
    return UserAxiosInstant.delete(`accounts/unfollow/${follower_id}/${following_id}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const Is_follower=(follower_id,following_id)=>{
    return UserAxiosInstant.get(`accounts/is_follower/${follower_id}/${following_id}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const Followingslist=(user_id)=>{
    return UserAxiosInstant.get(`accounts/followings/${user_id}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const Followerslist=(user_id)=>{
    return UserAxiosInstant.get(`accounts/followers/${user_id}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const SubscriptionsList=(user_id)=>{
    return UserAxiosInstant.get(`accounts/subscriptionslist/${user_id}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const Subscriberslist=(user_id)=>{
    return UserAxiosInstant.get(`accounts/subscriberslist/${user_id}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });

}

const UserWallet=(user_id)=>{
    return UserAxiosInstant.get(`accounts/wallet/${user_id}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const ChatUsersList=(user_id)=>{
    return UserAxiosInstant.get(`accounts/chatusers/${user_id}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const PreviousChat=(user1,user2)=>{
    return UserAxiosInstant.get(`chats/user-previous-chats/${user1}/${user2}/`,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}


const CreateReportIssue=(values)=>{
    return UserAxiosInstant.post(`accounts/reportissuecreate/`,values,{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const ListIssues=()=>{
    return UserAxiosInstant.get("accounts/issuelist/",{
        withCredentials:true
    }).catch((error) => {
        if (error.response.status === 401) {
          RefreshToken();
        } else {
          error.response;
        }
      });
}

const ListIssuesByUser=(user_id)=>{
    return UserAxiosInstant.get(`accounts/issuelistbyuser/${user_id}`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const IssueReportView=(id)=>{
    return UserAxiosInstant.get(`accounts/issueview/${id}`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}
const Updateissue=(id,values)=>{
    return UserAxiosInstant.patch(`accounts/issueview/${id}`,values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const PremiumList=()=>{
    return UserAxiosInstant.get(`accounts/premiumlist/`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const TrendingUsers=()=>{
    return UserAxiosInstant.get(`accounts/trendingUsers/`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}




export {UserSignin,UserGoogleSignin,UserGoogleSignup,GetUserInfo,
    UpdateUser,CreateSkill,ListSkills,EditSkill,DeleteSkill,NotificationCreate,Checkoutsession,
    Notificationsbyuser,CreateSubscription,IsSubscriber,CreateFollowing,Is_follower,Unfollow,Followingslist,Followerslist,
    SubscriptionsList,Subscriberslist,UserWallet,PreviousChat,ChatUsersList,ClearNotificationbyuser,IssueReportView,
    ListIssuesByUser,ListIssues,CreateReportIssue,PremiumList,Updateissue,ChangeUserPassword,TrendingUsers,Logout,RefreshToken,
    IsStandardSubscriber
}
