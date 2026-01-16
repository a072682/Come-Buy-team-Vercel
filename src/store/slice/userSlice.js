

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const userSlice = createSlice({
    name: "user",
    initialState: {
        
    },
    reducers: {
        
    },
  });

  export const {  } = userSlice.actions;

    //#region
    //#endregion

    //#region 會員登入次數統計
    export const userLoginCounter = createAsyncThunk(
        "user/userLoginCounter",
        async (_,{ dispatch, rejectWithValue }) => {
            try {
                const userLoginCounterRef = await axios.post(`/api/user/userLoginCounter`);
                //console.log("登入計數成功",userLoginCounterRef.data.message);
                return(userLoginCounterRef.data.message);
            } catch (error) {
                console.log("登入計數失敗",error.response.data);
                return rejectWithValue(error.response.data);
            }
        }
    );
    //#endregion

    //#region 修改會員密碼
    export const updateUserPassword = createAsyncThunk(
        "user/updateUserPassword",
        async ({ oldPassword, newPassword },{ dispatch, rejectWithValue }) => {
            try {
                const updateUserPasswordRes = await axios.put("/api/user/updatePassword",{ oldPassword,newPassword,});
                //console.log("修改密碼成功",updateUserPasswordRes.data.message);
                return updateUserPasswordRes.data.message;
            } catch (error) {
                console.log("修改密碼失敗",error.response.data);
                return rejectWithValue(error.response?.data || error.message);
            }
        }
    );
    //#endregion

    //#region 更新會員資料
    export const userDataUpChange = createAsyncThunk(
        "user/userDataUpChange",
        async ({ username, email },{ dispatch, rejectWithValue }) => {
            try {
                const userDataUpChangeRes = await axios.put("/api/user/userDataUpChange", {username,email});
                //console.log("更新會員資料成功",userDataUpChangeRes.data.message);
                return userDataUpChangeRes.data;
            } catch (error) {
                console.log("更新會員資料失敗",error.response.data);
                return rejectWithValue(error.response?.data || error.message);
            }
        }
    );
    //#endregion

export default userSlice.reducer;