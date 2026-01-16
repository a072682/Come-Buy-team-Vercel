

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const testSlice = createSlice({
    name: "test",
    initialState: {
        linkState:false,//連線狀態
    },
    reducers: {
        linkStateTrue: (state, action) => {
            state.linkState = true;
        },
        linkStateFalse: (state, action) => {
            state.linkState = false;
        },
    },
  });

  export const { linkStateTrue, linkStateFalse, } = testSlice.actions;

    //#region
    //#endregion

    //#region 測試連線
        export const linkTest = createAsyncThunk(
            "login/linkTest",
            async (_,{ dispatch, rejectWithValue }) => {
                dispatch(linkStateFalse()); 
                try {
                    const response = await axios.get(`/api/testLink`);
                    //console.log("連線成功",response.data);
                    dispatch(linkStateTrue()); 
                    return(response.data);
                } catch (error) {
                    console.log("連線失敗",error.response.data);
                    dispatch(linkStateFalse());
                    return rejectWithValue(error.response.data);
                }
            }
        );
    //#endregion

export default testSlice.reducer;