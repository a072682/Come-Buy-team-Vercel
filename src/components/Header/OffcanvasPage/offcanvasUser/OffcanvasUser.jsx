import { useEffect, useState } from 'react';
import './_OffcanvasUser.scss';
import { Collapse } from 'react-bootstrap';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slice/authSlice';
import { useRouter } from 'next/navigation';
import axios from 'axios';


function OffcanvasUser({handleClose}) {

    const dispatch = useDispatch();

    const router = useRouter();
  
    const [openDefault, setOpenDefault] = useState(false);

    const handleLogoutUser = async()=>{
        try{
            await axios.post(`/api/auth/logoutUser`);
            //console.log("登出成功");
            dispatch(logout());
            router.push('/');
            handleClose();
        }catch(error){
            console.log("登出失敗:",error);
        }
    }

    //#region 讀取會員頭像資料
        const avatarUrl = useSelector((state)=>{
            return(
                state.profile.avatar_url
            )
        })

        useEffect(()=>{
            //console.log("頭像資料:",avatarUrl);
        },[avatarUrl])
    //#endregion

    //#region 讀取會員名稱資料
        //讀取中央資料
        const userName = useSelector((state)=>{
            return(
                state.auth.username
            )
        })

        useEffect(()=>{
            
        },[userName])
    //#endregion

  return (
    <>
        
        <button className="offcanvasUserItem-set" onClick={() => setOpenDefault(!openDefault)}>
            {
                avatarUrl?
                (
                    <img className="userItemImg-set" src={avatarUrl} alt={userName} />
                )
                :
                (
                    <div className="userItemImg-set textVer">{(userName?.trim()?.charAt(0) || '?').toUpperCase()}</div>
                )
            }
        </button>
        <Collapse in={openDefault}>
            <div className='Collapse-box'>
                <Link className="Collapse-item-set" href="UserPages" onClick={()=>{handleClose()}}>
                    會員中心
                </Link>
                <button className="Collapse-item-set" onClick={()=>{handleLogoutUser()}}>
                    登出
                </button>
            </div>
        </Collapse>
    </>
  );
}

export default OffcanvasUser;
