"use client";

import { useEffect, useState } from 'react';
import './_AddressInformation.scss';
import CountryDropdown from './countryDropdown/CountryDropdown';
import { useDispatch } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';
import { getProfile, updateProfile } from '@/store/slice/profileSlice';



function AddressInformation ({userData,setUserData,originUserData}){

    //#region
    //#endregion

    //#region 讀取中央函式前置宣告
    const dispatch = useDispatch();
    //#endregion

    //#region 宣告錯誤訊息紀錄狀態
    const [countryErrorsMsg, setCountryErrorsMsg] = useState("");
    useEffect(()=>{},[countryErrorsMsg]);
    const [postalErrorsMsg, setPostalErrorsMsg] = useState("");
    useEffect(()=>{},[postalErrorsMsg]);
    const [addressErrorsMsg, setAddressErrorsMsg] = useState("");
    useEffect(()=>{},[addressErrorsMsg]);
    //#endregion

    //#region 宣告郵遞區號資料規則
    const postalCodeRegex = /^\d{3}(\d{2})?$/; // 3 或 5 碼數字
    //#endregion

    //#region 資料寫入userData函式
    const onChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };
    //#endregion

    //#region 確認錯誤訊息函式
    const errorsMsgCheck = () => {
        // 先清空舊錯誤
        setCountryErrorsMsg('');
        setPostalErrorsMsg('');
        setAddressErrorsMsg('');

        let ok = true;

        const country = (userData?.country_code ?? '').toString().trim().toUpperCase();
        const postal  = (userData?.postal_code ?? '').toString().trim();
        const address = (userData?.address_line ?? '').toString().trim();

        if (!country) {
            setCountryErrorsMsg('請選擇國家/地區');
            ok = false;
        }

        if (!postal) {
            setPostalErrorsMsg('請填寫郵遞區號');
            ok = false;
        } else if (!postalCodeRegex.test(postal)) {   // ✅ 用 .test 套用規則
            setPostalErrorsMsg('台灣郵遞區號須為 3 碼或 5 碼數字');
            ok = false;
        }

        if (!address) {
            setAddressErrorsMsg('請填寫聯絡地址');
            ok = false;
        }

        return ok;  // 回傳是否通過
    };
    //#endregion

    //#region 更新會員個人資料函式
    const handleUserDataUpLoadChange = async()=>{
        if(originUserData === userData){
            console.log("資料相同");
            return;
        }
        try{
            await dispatch(updateProfile(userData)).unwrap();
            //console.log("會員個人資料更新成功",userProfileDataUpLoadChangeRef);
            dispatch(getProfile()); 
        }catch(error){
            console.log("會員個人資料更新失敗",error);
        }
    }
    //#endregion

    //#region 資料送出函式
    const onSubmit = (e) => {
        e.preventDefault();
        if (!errorsMsgCheck()){
            return; 
        }
        // 有錯就中斷，不要送出
        handleUserDataUpLoadChange();
    };
    //#endregion

    return(
        <AnimatePresence>
            <article className="AddressInformation">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <motion.div className='formBox'
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        viewport={{ amount: 0, margin: "0% 0px 0% 0px" }}
                            >
                                <form onSubmit={onSubmit} className="address-form">
                                    {/* 國家/地區 */}
                                    <CountryDropdown    userData={userData} 
                                                        setUserData={setUserData} 
                                                        countryErrorsMsg={countryErrorsMsg}
                                    />
                                    {/* 郵遞區號 */}
                                    <div className="postalCodeGroup">
                                        <label htmlFor="postalCode" className="title">郵遞區號</label>
                                        <input
                                            id="postalCode"
                                            name="postal_code"
                                            className="form-item w-100"
                                            value={userData?.postal_code ?? ""}
                                            onChange={onChange}
                                            inputMode="numeric"
                                            maxLength={5}                // 台灣最多 5 碼（3+2）
                                            autoComplete="postal-code"
                                            placeholder="例如 110 或 11061"
                                        />
                                        {postalErrorsMsg && <div className="text-danger mt-1">{postalErrorsMsg}</div>}
                                    </div>
                                    {/* 郵遞區號 */}

                                    {/* 聯絡地址 */}
                                    <div className="addressGroup">
                                        <label htmlFor="address" className="title">聯絡地址</label>
                                        <input
                                        id="address"
                                        name="address_line"
                                        className="form-item w-100"
                                        value={userData?.address_line ?? ""}
                                        onChange={onChange}
                                        autoComplete="street-address"
                                        placeholder="路名、段、街、巷、弄、號（必要）"
                                        />
                                        {addressErrorsMsg && <div className="text-danger mt-1">{addressErrorsMsg}</div>}
                                    </div>
                                    {/* 聯絡地址 */}

                                    <button type="submit" className="submitBtn mian-btn1-set d-block">儲存</button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </article>
        </AnimatePresence>
    )
}
export default AddressInformation;
