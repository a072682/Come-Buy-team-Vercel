"use client";


import { useEffect, useState } from "react"
import EstimatePageMain1 from "./EstimatePageMain1/EstimatePageMain1"
import EstimatePageMain2 from "./EstimatePageMain2/EstimatePageMain2"
import EstimatePageMain3 from "./EstimatePageMain3/EstimatePageMain3"
import EstimatePageMain4 from "./EstimatePageMain4/EstimatePageMain4"
import EstimatePageMain5 from "./EstimatePageMain5/EstimatePageMain5"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation";

function EstimatePage(){

    //#region
    //#endregion

    //#region 網頁改變前置宣告
    const router = useRouter();
    //#endregion

    //#region 讀取登入狀態
        const loginState = useSelector((state)=>{
            return(
                state.auth.isLogin
            )
        })

        useEffect(()=>{
            //console.log("loginState狀態:",loginState);
        },[loginState])
    //#endregion

    //#region 讀取訂單資料
    const order = useSelector((state)=>{
        return(
            state.order.orderData
        )
    })
    useEffect(()=>{
        //console.log("訂單資料",order);
        setOrderData(order);
    },[order]);
    //#endregion

    

    //#region 創建訂單預設資料
    const [orderData, setOrderData] = useState(null);

    useEffect(()=>{
        //console.log("訂單資料:",orderData)
    },[orderData]);
    //#endregion

    //#region 網址與子元件同步函式
    useEffect(() => {

        // 所有 <article> 標籤，且 id 是以 EstimatePageMain 開頭的 DOM 元素
        const sections = document.querySelectorAll("article[id^='EstimatePageMain']");
        //如果沒有抓到則跳出
        if (!sections.length){
            return;
        } 

        //當目標進入或離開畫面時觸發
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        //console.log("抓到的id",id);
                        // 更新網址，不重新整理頁面
                        router.replace(`#${id}`, { scroll: false });
                    }

                });
            },
            {
                root: null,        // viewport
                threshold: 0.6,    // 10% 進入畫面才算
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);
    //#endregion

    //#region 動畫設定
    const triggerSet = {
        hidden: { opacity: 0 },                 // 父層只當觸發器，不做淡入
        show: {
            opacity: 1,
            transition: {
            duration: 0,                        // 0：不要讓父層自己動畫造成等待
            //觸發動畫到第一個動畫的延遲時間
            delayChildren: 0.08,
            //第二個動畫到第三以及後續的延遲時間
            staggerChildren: 0.1,
            // 想骨牌再開：delayChildren: 0.08, staggerChildren: 0.06,
            },
        },
    };
    const fadeUp = { 
        hidden:{opacity:0,y: 40}, 
        show:{opacity:1,y:0, 
        transition:{duration:0.6, ease:"easeOut"}} 
    };
    //#endregion

    return(
        <>
            <section className="EstimatePage">
                <EstimatePageMain1  loginState={loginState} 
                                    orderData={orderData} 
                                    setOrderData={setOrderData} 
                                    triggerSet={triggerSet}
                                    fadeUp={fadeUp}
                />
                
                <EstimatePageMain2  orderData={orderData} 
                                    setOrderData={setOrderData} 
                                    triggerSet={triggerSet}
                                    fadeUp={fadeUp}
                />
                
                <EstimatePageMain3  orderData={orderData} 
                                    setOrderData={setOrderData} 
                                    triggerSet={triggerSet}
                                    fadeUp={fadeUp}
                />

                
                <EstimatePageMain4  orderData={orderData} 
                                    setOrderData={setOrderData} 
                                    triggerSet={triggerSet}
                                    fadeUp={fadeUp}
                />
                
                <EstimatePageMain5  orderData={orderData} 
                                    setOrderData={setOrderData}
                                    loginState={loginState}
                                    triggerSet={triggerSet}
                                    fadeUp={fadeUp}
                />

            </section>
        </>
    )
}
export default EstimatePage;