import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

 //#region 創建訂單預設資料
const defaultOrderData = {
    imgFileUrl: "",        // 縮圖檔案的 URL
    imgFileId:"",          // 縮圖檔案的id
    imgFile:null,          // 縮圖檔案
    num: 1,                // 數量
    technique:"3D列印",    // 製程
    material:"",           //材料
    color:"",              //顏色
    price:0,               //預設價格

    supportMaterial: 10,   // 支撐材（mm）
    wallThickness: 50,     // 壁厚（% 或 mm，看你定義）
    supportDensity: 10,    // 支撐材密度（% 或 mm）

    orderType: "",   // 工期類型：slow / normal / urgent
    productionTime: "",    // 訂單製作時間
    productionEndTime: "", // 預計訂單製作結束時間
};
//#endregion

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        allOrderData:[],
        orderData:defaultOrderData,
        orderModelCheckMsg:null,
        checkState:false,
        imgLoadState:false,
    },
    reducers: {
        //上傳所有訂單資料內容
        allOrderDataUpLoad: (state, action) => {
            state.allOrderData = action.payload;
        },
        //訂單資料內容
        //訂單資料內容
        orderDataUpLoad: (state, action) => {
            const orderData = action.payload;
            //如果不是字串就回null
            state.orderData = orderData ? orderData : null;
        },
        //訂單資料內容

        //訂單資料內容初始化
        orderDataClean: (state) => {
            state.orderData = defaultOrderData;
        },
        //訂單資料內容初始化

        //上傳檢查狀態
        orderCheckStateUpLoad: (state, action) => {
            state.checkState = action.payload;
        },
        //上傳錯誤狀態

        //上傳檢查訊息
        orderCheckMsgUpLoad: (state, action) => {
            state.orderModelCheckMsg = action.payload;
        },
        //上傳錯誤訊息

        //圖片上傳狀態視窗開啟
        imgLoadStateTrue: (state) => {
            state.imgLoadState = true;
        },
        //圖片上傳狀態視窗開啟

        //圖片上傳狀態視窗關閉
        imgLoadStateFalse: (state) => {
            state.imgLoadState = false;
        },
        //圖片上傳狀態視窗關閉
    },
  });

export  const { 
            allOrderDataUpLoad,
            orderDataUpLoad,
            orderDataClean,
            orderCheckStateUpLoad,
            orderCheckMsgUpLoad,
            imgLoadStateTrue,
            imgLoadStateFalse 
        } = orderSlice.actions;

    //#region
    //#endregion

    //#region 取得訂單資料
    export const getOrder = createAsyncThunk(
        "order/getOrder",
        async (_, { dispatch,rejectWithValue }) => {
            try {
                const getOrderRes = await axios.get("/api/order/getOrder");
                //console.log("取得訂單成功", getOrderRes.data);
                dispatch(allOrderDataUpLoad(getOrderRes.data.orderData));
                return getOrderRes.data.orderData;
            } catch (error) {
                return rejectWithValue(
                    error.response?.data || { message: "取得訂單失敗" }
                );
            }
        }
    );
    //#endregion

    //#region 新增訂單
    export const registerOrder = createAsyncThunk(
        "order/registerOrder",
        async (orderData, { dispatch,rejectWithValue }) => {
            try {
                const registerOrderRes = await axios.post("/api/order/registerOrder",orderData);
                console.log("新增訂單成功", registerOrderRes.data);
                return registerOrderRes.data;
            } catch (error) {
                return rejectWithValue(
                    error.response?.data || { message: "新增訂單失敗" }
                );
            }
        }
    );
    //#endregion

    //#region 修改訂單
    export const updateOrder = createAsyncThunk(
        "order/updateOrder",
        async ({ orderId, ...orderData }, { dispatch,rejectWithValue }) => {
            try {
                const updateOrderRes = await axios.put(`/api/order/updateOrder/${orderId}`,orderData);
                console.log("訂單修改成功", updateOrderRes.data);
                return {
                    orderId,
                    ...updateOrderRes.data,
                };
            } catch (error) {
                return rejectWithValue(
                    error.response?.data || { message: "訂單修改失敗" }
                );
            }
        }
    );
    //#endregion

    //#region 刪除訂單
    export const deleteOrder = createAsyncThunk(
        "order/deleteOrder",
        async (id, { dispatch,rejectWithValue }) => {
            try {
                const deleteOrderRes = await axios.delete(`/api/order/deleteOrder/${id}`);
                console.log("訂單刪除成功", deleteOrderRes.data);
                dispatch(getOrder());
                return {
                    message: "訂單刪除成功"
                };
            } catch (error) {
                return rejectWithValue(
                    error.response?.data || { message: "訂單刪除失敗" }
                );
            }
        }
    );
    //#endregion

export default orderSlice.reducer;