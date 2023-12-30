import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userinfo: {},
  premiumuserinfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userinfo = action.payload.userinfo;
    },
    setPremiumUserInfo: (state, action) => {
      state.premiumuserinfo = action.payload.premiumuserinfo;
    },
    LogoutDetails: (state, action) => {
      state.userinfo = {};
      state.premiumuserinfo=null;
    },
    setUpdateInfo:(state,action)=>{
        state.userinfo={
            ...state.userinfo,
            ...action.payload.updatedData.userinfo
        }
    }
  },
});

export const { setUserInfo, LogoutDetails,setUpdateInfo,setPremiumUserInfo } = userSlice.actions;
export default userSlice.reducer;
