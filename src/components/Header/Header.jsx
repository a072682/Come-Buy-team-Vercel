'use client';
import { useEffect, useState } from "react";
import { linkTest } from "@/store/slice/testSlice";
import { open,MODALS } from "@/store/slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import News from "./News/News";
import Faq from "./Faq/Faq";
import './_Header.scss';
import UserDropdown from "./UserDropdown/UserDropdown";
import OffcanvasPage from "./OffcanvasPage/OffcanvasPage";
import { usePathname } from "next/navigation";
import NavLink from "../NavLink/NavLink";
import Link from "next/link";
import axios from "axios";
import { auth_providerDataUp, checkLogin, emailDataUp, login, logout, usernameDataUp } from "@/store/slice/authSlice";
import { userLoginCounter } from "@/store/slice/userSlice";
import { getProfile } from "@/store/slice/profileSlice";





function Header(){

    //#region
    //#endregion

    //#region 讀取中央函式前置宣告
    const dispatch = useDispatch();
    //#endregion

    //#region 讀取連線狀態
    const linkState = useSelector((state)=>{
        return(
            state.test.linkState
        )
    })

    useEffect(()=>{
        //console.log("連線狀態:",linkState);
    },[linkState])
    //#endregion

    //#region 連線測試
    useEffect(() => {
        if(linkState){
            //console.log("連線成功敲擊結束");
            return;
        }else if(!linkState){
            //console.log("執行敲擊");
            // 每兩秒執行一次
            const timeId = setInterval(() => {
                dispatch(linkTest());
            }, 2000); 

            // 離開頁面時清除 interval（必要）
            return () => clearInterval(timeId);
        }
    }, [linkState]);
    //#endregion

    //#region 讀取登入狀態資料
    const loginState = useSelector((state)=>{
        return(
            state.auth.isLogin
        )
    })
    useEffect(()=>{
        //console.log("loginState狀態:",loginState);
    },[loginState])
    //#endregion

    //#region 登入確認
    useEffect(()=>{
        //無條件先執行一次
        dispatch(checkLogin());

        // 每半小時執行一次
        const timeId = setInterval(() => {
            dispatch(checkLogin());
        }, 10*60*1000); 
        
        // 離開頁面時清除 interval（必要）
        return () => clearInterval(timeId);
    },[]);
    //#endregion

    //#region 取得路徑函數宣告
    const pathname = usePathname();
    //#endregion

    //#region 監控路徑
    useEffect(() => {
        //console.log("🔄 路由變更了！當前路徑：", location.pathname);
        window.scrollTo(0, 0);
        //console.log("已移動到頁面最上方");
    }, [pathname]); // 監聽 `pathname`，當變更時執行
    //#endregion
    
    //#region 側邊狀態
    const [onOpen, setOnOpen] = useState(false); // 控制 offcanvas 開關
    useEffect(()=>{},[onOpen]);

    const handleOpen = () => setOnOpen(true);
    const handleClose = () => setOnOpen(false);
    //#endregion
    
    return(
        <>
            <header className="navBg-set navbarSet" id="siteHeader">
                <div className="container">
                    <div className='navbar-box'>
                        {/* 左上角 Logo */}
                        <Link href="/" className='navbarLogo-box'>
                            <img className="navbarLogoImg-set" src={`/images/Header/logo.png`} alt="home-section2-1" />
                        </Link>
                        {/* 左上角 Logo */}
                        

                        
                        {/* lg 以上選項區塊 */}
                        <div className="navbarItem-box d-none d-lg-flex">
                            <News />
                            <NavLink to="/EstimatePage" className="navbarItem-set">線上估價</NavLink>
                            <NavLink to="/MaterialPage" className="navbarItem-set">材料選擇</NavLink>
                            <Faq />
                            <NavLink to="/AboutUsPage" className="navbarItem-set">聯絡我們</NavLink>
                            {/* <button className="testBtn" onClick={()=>{setTestStage(!testStage)}}></button> */}
                        </div>
                        {/* lg 以上選項區塊 */}

                        {/* lg 以上會員頭像 */}
                        {
                            loginState?
                            (
                                <UserDropdown />
                            )
                            :
                            (
                                <button className="userImg-box d-none d-lg-flex"
                                        onClick={()=>{dispatch(open(MODALS.LOGIN))}}
                                >
                                    <img className="userImg-set" src={`/images/Header/log01.png`} alt="log01" />
                                </button>
                            )
                        }
                        {/* lg 以上會員頭像 */}

                        {/* lg 以下的右上角：漢堡選單按鈕 */}
                        <div className="navbarMenuIcon-box d-flex d-lg-none">
                            <button className="MenuIconBtn-set" onClick={()=>{handleOpen()}}>
                                <img className="MenuIconImg-set" src={`/images/Header/齒輪.png`} alt="齒輪" />
                            </button>
                        </div>
                        {/* lg 以下的右上角：漢堡選單按鈕 */}
                    </div>
                </div>  
            </header>
            <OffcanvasPage onOpen={onOpen} handleClose={handleClose} loginState={loginState}/>
        </>
    )
}

export default Header;
