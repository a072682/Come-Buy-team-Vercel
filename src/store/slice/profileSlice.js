

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const profileSlice = createSlice({
        name: "profile",
        initialState: {
            userProfileData:null,
            
        },
        reducers: {
            //會員頭像內容資料上傳
            userProfileDataUp:(state,action) => {
                state.userProfileData = action.payload;
            },
            
        },
    });

    export const { userProfileDataUp,avatarDataUp,avatarIdDataUp } = profileSlice.actions;

    //#region
    //#endregion

    //#region 取得會員個人資料 
    export const getProfile = createAsyncThunk(
        "profile/getProfile",
        async (_, { dispatch,rejectWithValue }) => {
            try {
                const getProfileRes = await axios.get("/api/profile/getProfile");
                //console.log("取得登錄者個人資料成功",getProfileRes.data);
                dispatch(userProfileDataUp(getProfileRes.data.userData));
                return getProfileRes.data.userData;
            } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "取得會員資料失敗" }
            );
            }
        }
    );
    //#endregion

    //#region 建立會員個資
    export const createProfile = createAsyncThunk(
        "profile/createProfile",
        async (_, { dispatch,rejectWithValue }) => {
            try {
                const createProfileRes = await axios.post("/api/profile/createProfile");
                //console.log("建立登錄者個人資料成功",createProfileRes.data);
                return {
                    message:"建立登錄者個人資料成功",
                };
            } catch (error) {
                return rejectWithValue(
                    error.response?.data || { message: "建立會員個資失敗" }
                );
            }
        }
    );
    //#endregion

    //#region 更新會員個資
    export const updateProfile = createAsyncThunk(
        "profile/updateProfile",
        async (profileData, { dispatch,rejectWithValue }) => {
            try {
                const updateProfileRes = await axios.put("/api/profile/updateProfile", profileData);
                //console.log("更新登錄者個人資料成功",updateProfileRes.data);
                return updateProfileRes.data;
            } catch (error) {
                return rejectWithValue(
                    error.response?.data || { message: "更新會員資料失敗" }
                );
            }
        }
    );
    //#endregion

export default profileSlice.reducer;