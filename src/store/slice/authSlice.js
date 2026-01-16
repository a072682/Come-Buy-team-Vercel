

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { createProfile,getProfile } from "./profileSlice";
import { userLoginCounter } from "./userSlice";


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false,  // 是否登入
        username:null,//會員名稱
        email:null,//會員信箱
        auth_provider:null,//登入來源
        avatar_url:null,//會員頭像內容
        avatar_id:null,//會員頭像id
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.user = action.payload; // 儲存登入的使用者資訊
        },
        logout: (state) => {
            state.isLogin = false;
            state.user = null;
        },
        
        //會員名稱資料上傳
        usernameDataUp:(state,action) => {
            state.username = action.payload;
        },
        //會員信箱資料上傳
        emailDataUp:(state,action) => {
            state.email = action.payload;
        },
        //登入來源資料上傳
        auth_providerDataUp:(state,action) => {
            state.auth_provider = action.payload;
        },
        //會員頭像內容資料上傳
        avatarDataUp:(state,action) => {
            state.avatar_url = action.payload;
        },
        //會員頭像id資料上傳
        avatarIdDataUp:(state,action) => {
            state.avatar_id = action.payload;
        },
    },
  });

  export const { 
    login, 
    logout, 
    usernameDataUp,
    emailDataUp, 
    auth_providerDataUp,
    avatarDataUp,
    avatarIdDataUp } = authSlice.actions;

    //#region
    //#endregion

    //#region 建立會員api
        export const createUserData = createAsyncThunk(
            "login/createUserData",
            async (newUserDATA,{ dispatch, rejectWithValue }) => {
                try {
                    const createUserDataRef = await axios.post(`/api/auth/registerUser`,newUserDATA);
                    //console.log("創建會員成功",createUserDataRef.data);
                    dispatch(createProfile());
                    dispatch(logout());
                } catch (error) {
                    console.log("創建會員失敗",error.response.data);
                    dispatch(logout());
                    return rejectWithValue(error.response.data);
                }
            }
        );
    //#endregion

    //#region 會員登入API
        export const loginUser = createAsyncThunk(
            "login/loginUser",
            async (account, { dispatch, rejectWithValue }) => {
                try {
                    const handleLoginRef = await axios.post(`/api/auth/loginUser`, account);
                    //console.log("登入成功",handleLoginRef.data);
                    // 存到 localStorage
                    localStorage.setItem('token', handleLoginRef.data.token);
                    dispatch(login());
                    return({
                        login:handleLoginRef.data,
                    });
                } catch (error) {
                    console.log("登入失敗",error.response.data);
                    dispatch(logout());
                    return rejectWithValue(error.response.data);
                }
            }
        );
    //#endregion
  
    //#region 登入確認
        export const checkLogin = createAsyncThunk(
            "auth/checkLogin",
                async (_,{ dispatch }) => {
                try {
                        const checkLoginRef = await axios.post(`/api/auth/loginCheck`);
                        //console.log("登入確認成功",checkLoginRef.data);

                        //更新登入者名稱內容
                        dispatch(usernameDataUp(checkLoginRef?.data.user.username));
                        //更新登入者信箱資料
                        dispatch(emailDataUp(checkLoginRef?.data.user.email));
                        //更新登入者來源
                        dispatch(auth_providerDataUp(checkLoginRef?.data.user.auth_provider));
                        //更新登入者頭像內容
                        dispatch(avatarDataUp(checkLoginRef?.data.user.avatarUrl || 
                        checkLoginRef?.data.user.google_avatar_url || null));
                        //更新登入者頭像圖片id
                        dispatch(avatarIdDataUp(checkLoginRef?.data.user.avatarId || null));
                        //執行登入計數api
                        //dispatch(userLoginCounter());
                        //執行取得會員個人詳細資料api
                        dispatch(getProfile());
                        //執行登陸狀態改變api
                        dispatch(login());
                } catch (error) {
                    console.log("登入確認失敗",error.response.data);
                    dispatch(logout());
                }
            }
        );
    //#endregion

    //#region 登出
        export const logoutUser = createAsyncThunk(
            "login/logoutUser",
            async (_, { dispatch }) => {
                try {
                    const handleLogoutRef = await axios.post(`/api/auth/logoutUser`);
                    //console.log("登出成功",handleLogoutRef.data);
                    dispatch(logout());
                } catch (error) {
                    console.log("登出失敗");
                }
            }
        );
    //#endregion  
    
    //#region google登入api
        // export const userGoogleLogin = createAsyncThunk(
        //     "auth/userGoogleLogin",
        //     async (_,{ dispatch, rejectWithValue }) => {
        //         try {
        //             window.location.href = '/api/auth/google/googleLogin';
        //         } catch (error) {
        //             console.log("google登入失敗");
        //             return rejectWithValue("google登入失敗");
        //         }
        //     }
        // );
    //#endregion

export default authSlice.reducer;