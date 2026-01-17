"use client";

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './_EstimatePageMain1.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { MODALS, open } from '@/store/slice/modalSlice';
import axios from 'axios';
import { imgLoadStateFalse, imgLoadStateTrue } from '@/store/slice/orderSlice';

function EstimatePageMain1({ loginState, orderData, setOrderData, triggerSet, fadeUp}){

    //#region 讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 跳轉網址前置宣告
        const router = useRouter();
    //#endregion

    //#region 本地圖片顯示狀態
        const [previewUrl, setPreviewUrl] = useState('');         // 本地預覽 URL
        useEffect(()=>{
            //console.log("圖片資料:",previewUrl)
        },[previewUrl]);
    //#endregion

    //#region 訂單圖片資料寫入
    const orderImgSelect = async(event) => {
        const file = event.target.files?.[0];
        if (!file) {
            console.log("請選擇檔案")
            return;
        }

        // 可選：型別/大小檢查
        const allowTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowTypes.includes(file.type)) {
            alert('只接受 JPG/PNG/WEBP 圖片');
            event.target.value = '';
            return;
        }

        // 建立FormData檔案
        const formData = new FormData();
        formData.append("folder", "orderPreviewImg");
        formData.append('file', file);

        try {
            //傳送圖片上傳視窗開啟信號
            dispatch(imgLoadStateTrue());
            //開啟圖片上傳等待視窗
            dispatch(open(MODALS.ImgCheckModal));
            //進行圖片上傳api
            const handleUploadRes = await axios.post(`api/cloudinary/uploadImage`,formData);
            console.log("圖片上傳成功",handleUploadRes.data);
            //傳送圖片上傳視窗關閉信號
            dispatch(imgLoadStateFalse()); 
            setPreviewUrl(handleUploadRes.data.result.url);
            setOrderData({
                ...orderData,
                imgFileUrl:handleUploadRes.data.result.url,
                imgFileId:handleUploadRes.data.result.public_id,
            })
            return handleUploadRes.data;
        } catch (error) {
            console.error(error);
            dispatch(imgLoadStateFalse());
            alert('圖片上傳失敗');
        } 
        
        // 允許再次選同一檔案
        event.target.value = '';
    };
    //#endregion

    //#region 加法按鈕
        const handleNumAddBtn = ()=>{
            if(!previewUrl){
                alert("請先上傳圖檔")
            }else{
                setOrderData(
                    {
                        ...orderData,
                        num: orderData.num + 1,
                    }
                )
            }
        }
    //#endregion

    //#region 減法按鈕
        const handleNumSubBtn = ()=>{
            if(!previewUrl){
                alert("請先上傳圖檔")
            }else{
                setOrderData(
                    {
                        ...orderData,
                        num: Math.max(1, orderData.num - 1),
                    }
                )
            }
        }
    //#endregion    

    return(
        <>
            <AnimatePresence>
                <article className="EstimatePageMain1" id="EstimatePageMain1">
                    <div className="EstimatePageMain1-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <motion.div className='EstimatePageMain1-content'
                                                variants={triggerSet}
                                                initial="hidden"
                                                whileInView="show"                      
                                                viewport={{ amount: 0, margin: "0% 0px -20% 0px" }}
                                    >
                                        <motion.div className="EstimatePageMain1-title"
                                                    variants={fadeUp}>
                                            <h2 className="title-set">線上估價</h2>
                                        </motion.div>
                                        
                                        <motion.div className="EstimatePageMain1-ImgUpLord-box"
                                                    variants={fadeUp}>

                                            <div className="left-box">

                                                <div className="textTitle-box">
                                                    <h5 className="textTitleSet">圖檔上傳</h5>
                                                </div>

                                                <div className="text-box">
                                                    <p className="text-set">請上傳檔案或將檔案拖曳至此</p>
                                                    <p className="text-set">最多上傳10個檔案</p>
                                                    <p className="text-set">格式：.stl | 大小: &lt; 30MB</p>
                                                    {/*格式：.stl | 大小： < 30MB*/}
                                                </div>
                                            </div>

                                            
                                            <div className="middle-box"> 

                                                {/*lg以上內容*/}
                                                <button className="upLord-btn-set d-none d-lg-block" 
                                                        onClick={()=>{loginState ? document.getElementById("fileInput").click() : dispatch(open(MODALS.LOGIN))}}>
                                                    <div className="upLord-img-box">
                                                        <img className="upLord-img-set" 
                                                            src={`/images/EstimatePage/main1/EstimatePage-main1-upLord-btn.png`} 
                                                            alt="upLord-img" 
                                                        />
                                                        <div className='upLordTipImg-box addAnimation'>
                                                            <img className='upLordTipImg-set' 
                                                                src={`/images/EstimatePage/tipImg.png`} 
                                                                alt="upLordTipImg">
                                                            </img>
                                                            <p className='upLordTipText-set'>請點加號<br />上傳圖片<br />或修改圖片</p>
                                                        </div>
                                                    </div>
                                                </button>
                                                <input type="file" id="fileInput" accept="image/*" className="d-none" onChange={(event)=>{orderImgSelect(event)}}/>
                                                {/*lg以上內容*/}

                                                {/*lg以下內容*/}
                                                <button 
                                                    className="noteBtn-mb-set d-blcok d-lg-none" 
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#oEstimate-main1-Modal"
                                                    onClick={()=>{dispatch(open(MODALS.OestimateModal))}}
                                                >
                                                    <span className="material-symbols-outlined">
                                                        error 
                                                    </span>
                                                    檔案格式說明
                                                </button>
                                                {/*lg以下內容*/}

                                            </div>

                                            <div className="bottom-box">

                                                {/*lg以上內容*/}
                                                <button 
                                                    className="noteBtn-set d-none d-lg-flex" 
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#oEstimate-main1-Modal"
                                                    onClick={()=>{dispatch(open(MODALS.OestimateModal))}}
                                                >
                                                    <span className="material-symbols-outlined">
                                                        error 
                                                    </span>
                                                    檔案格式說明
                                                </button>
                                                {/*lg以上內容*/}

                                                {/*lg以下內容*/}
                                                <button className="upLord-btn-mb-set d-blcok d-lg-none" 
                                                        onClick={()=>{loginState ? document.getElementById("fileInput").click() : dispatch(open(MODALS.LOGIN))}}
                                                >
                                                    <div className="upLord-img-box">
                                                        <img className="upLord-img-set" 
                                                            src={`/images/EstimatePage/main1/EstimatePage-main1-upLord-btn-sm.png`} 
                                                            alt="upLord-img" 
                                                        />
                                                    </div>
                                                </button>
                                                <input type="file" id="fileInput" accept="image/*" className="d-none" onChange={(event)=>{orderImgSelect(event)}}/>
                                                <div className='upLordTipImg-sm-box d-blcok d-lg-none'>
                                                    <p className='upLordTipText-set'>請點加號<br />上傳圖片或修改圖片</p>
                                                </div>
                                                {/*lg以下內容*/}

                                            </div>
                                                
                                        </motion.div>

                                        <motion.div className='EstimatePageMain1-below-box'
                                                    variants={fadeUp}>

                                            <div className='ImagePreview-box'>
                                                <div className='ImagePreview-title'>
                                                    <h3 className='title-set'>圖檔上傳預覽</h3>
                                                </div> 
                                                {
                                                    previewUrl?
                                                    (
                                                        <div className="ImagePreview-set imgActive">
                                                            <img className="ImagePreview-img-set" 
                                                                src={previewUrl} 
                                                                alt="index-main1-Image" 
                                                            />
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <>
                                                            <div className="ImagePreview-set">
                                                                <div className="ImagePreview-img-box">
                                                                    <img className="ImagePreview-img-set" 
                                                                        src={`/images/EstimatePage/main1/EstimatePage-main1-Image.png`} 
                                                                        alt="index-main1-Image" 
                                                                    />
                                                                </div>
                                                                <div className="ImagePreview-text-box">
                                                                    <p className="text-set">
                                                                        目前無檔案<span className="d-none">，</span><span className="d-block"></span>請上傳圖檔進行估價確認
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                
                                            </div>

                                            <div className='detail-box'>
                                                <div className='detail-title'>
                                                    <h3 className='title-set'>圖檔資料</h3>
                                                </div>
                                                <div className="detail-table-box">
                                                    <div className="title-row">
                                                        <div className="title-text-set">檔案縮圖</div>
                                                        <div className="title-text-set">數量</div>
                                                    </div>
                                                    <div className="table-content-box">
                                                        <div className="table-img-item">
                                                            {
                                                                previewUrl?
                                                                (
                                                                    <>
                                                                        <img className="table-img-set imgActive" 
                                                                        src={previewUrl}
                                                                        alt="table-img" />
                                                                    </>
                                                                )
                                                                :
                                                                (
                                                                    <>
                                                                        <img className="table-img-set" 
                                                                        src={`/images/EstimatePage/main1/EstimatePage-main1-Image.png`}
                                                                        alt="table-img" />
                                                                    </>
                                                                )
                                                            }
                                                            
                                                        </div>
                                                        <div className="table-item">
                                                            <button className="itemAddBtn-set" onClick={()=>{handleNumAddBtn()}}>
                                                                <img className="itemAddBtn-img-set" 
                                                                    src={`/images/EstimatePage/main1/EstimatePage-main1-input-minus-plus.png`}
                                                                    alt="itemAddBtn-img" />
                                                            </button>

                                                            <p className="item-set">{orderData?.num}</p>

                                                            <button className="itemSubBtn-set" onClick={()=>{handleNumSubBtn()}}>
                                                                <img className="itemSubBtn-img-set" 
                                                                    src={`/images/EstimatePage/main1/EstimatePage-main1-input-minus.png`} 
                                                                    alt="itemSubBtn-img" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </motion.div>

                                        <motion.div className="EstimatePageMain1-next-btn"
                                                    variants={fadeUp}>
                                            <button type='button' className='pagination-btn01' 
                                                    onClick={()=>{router.push("#EstimatePageMain2");}}
                                            >
                                                <img className="pagination-img01-set" 
                                                    src={`/images/EstimatePage/main3/EstimatePage-main3-Vector15.png`} 
                                                    alt="Vector 15" 
                                                />
                                            </button>
                                            <div className='EstimatePageMain1-next-btn-box'>
                                                <p className='nextBtnTipText-set'><span className='d-none d-sm-inline'>前往下一頁</span>選擇材料</p>
                                            </div>
                                        </motion.div>

                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </AnimatePresence>
        </>
    )
}
export default EstimatePageMain1;

