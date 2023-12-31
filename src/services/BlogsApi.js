import { BlogsAxiosInstant } from "../utils/axiosUtils";
import { RefreshToken } from "./UserApi";



const CreateBlog=(values)=>{
    return BlogsAxiosInstant.post("blogs/",values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const CreateCommunity=(values)=>{
    return BlogsAxiosInstant.post("communitycreate/",values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const ListBlogs=(searchQuery,topic,sort)=>{

        return BlogsAxiosInstant.get(`blogslist/?search=${searchQuery}&topic=${topic}&sort=${sort}`,{
       
            withCredentials:true
        }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
        
}

const TrendingBlogs=()=>{
    return BlogsAxiosInstant.get("trendingblogs/",{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const GetBlogDetail=(blog_id)=>{
    return BlogsAxiosInstant.get(`blogdetail/${blog_id}/`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const UpdateBlog=(blog_id,values)=>{
    return BlogsAxiosInstant.patch(`blogdetail/${blog_id}/`,values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const DeleteBlog=(blog_id)=>{
    return BlogsAxiosInstant.delete(`blogdetail/${blog_id}/`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}



const GetBlogsByUser=(user_id,searchQuery,topic,selectedfilter)=>{
  
        return BlogsAxiosInstant.get(`blogs/by-user/${user_id}/?search=${searchQuery}&topic=${topic}&filter=${selectedfilter}`,{
        
            withCredentials:true
        }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });


}



const ListCommunities=()=>{
    return BlogsAxiosInstant.get("communitylist/",{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const DeleteCommunity=(id)=>{
    return BlogsAxiosInstant.delete(`communityview/${id}/`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });

}

const CommunitiesByUser=(user_id)=>{
    return BlogsAxiosInstant.get(`communitiesbyuser/${user_id}/`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const CreateTopics=(values)=>{

    return BlogsAxiosInstant.post("topics/",values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const GetTopics=()=>{
    return BlogsAxiosInstant.get(`topics/`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}


const UpdateTopic=(id,values)=>{
    return BlogsAxiosInstant.patch(`topicsview/${id}/`,values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const TrendingTopics=()=>{
    return BlogsAxiosInstant.get("trendingtopics/",{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const CreateComment=(values)=>{
    return BlogsAxiosInstant.post("commentslistcreate/",values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const ListComment=(blog_id)=>{
    return BlogsAxiosInstant.get(`commentslist/${blog_id}/`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const DeleteComment=(id)=>{
    return BlogsAxiosInstant.delete(`comment-retrieve-destroy/${id}/`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const LikeBlog=(values)=>{
    return BlogsAxiosInstant.post("likes/",values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });

}

const UnlikeBlog=(values)=>{
    
    return BlogsAxiosInstant.delete(`likeview/`,{ data: values },{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const GetBlogLike=(blogId,userId)=>{
    return BlogsAxiosInstant.get(`likeview/?blog=${blogId}&user=${userId}`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const ReportBlogs=(values)=>{
    return BlogsAxiosInstant.post("reportblogs/",values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}


const ReportBlogList=()=>{
    return BlogsAxiosInstant.get("reportbloglist/",{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const Reportupdate=(id,values)=>{
    return BlogsAxiosInstant.patch(`reportview/${id}/`,values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}


const CreateSaved=(values)=>{
    return BlogsAxiosInstant.post(`createsaved/`,values,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const ListSaved=(user_id,searchQuery)=>{
    return BlogsAxiosInstant.get(`listsaved/${user_id}/?search=${searchQuery}`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const IsSave=(user_id,blog_id)=>{
    return BlogsAxiosInstant.get(`saveview/?user_id=${user_id}&blog_id=${blog_id}`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}

const Unsave=(user_id,blog_id)=>{
    return BlogsAxiosInstant.delete(`saveview/?user_id=${user_id}&blog_id=${blog_id}`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}



export {CreateBlog,GetBlogDetail,ListBlogs,GetBlogsByUser,
    CreateTopics,GetTopics,UpdateTopic,TrendingBlogs,UpdateBlog,DeleteBlog,CreateComment,ListComment,DeleteComment,
    LikeBlog,UnlikeBlog,GetBlogLike,ReportBlogs,ReportBlogList,Reportupdate,CreateSaved,ListSaved,IsSave,Unsave,
    CommunitiesByUser,DeleteCommunity,ListCommunities,CreateCommunity,TrendingTopics

}