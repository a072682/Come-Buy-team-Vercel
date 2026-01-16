import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const messageSlice = createSlice({
    name: "message",
    initialState: {
        
    },
    reducers: {},
  });

  export const {  } = messageSlice.actions;

    //#region
    //#endregion

    //#region 會員留言上傳
    export const messageDataUpLoad = createAsyncThunk(
        "message/messageDataUpLoad",
        async ( {messageData},{ dispatch,rejectWithValue } ) => {
            try {
                const messageDataUpLoadRef = await axios.post(`/api/message/messageUpLoad`,messageData);
                //console.log("會員留言上傳成功:",messageDataUpLoadRef.data);
                return(messageDataUpLoadRef.data);
            } catch (error) {
                console.log("會員留言上傳失敗",error.response.data);
                return rejectWithValue(error.response.data);
            }
        }
    );
    //#endregion


        
export default messageSlice.reducer;