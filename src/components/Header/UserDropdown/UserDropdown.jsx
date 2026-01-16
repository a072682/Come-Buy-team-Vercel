import { useEffect, useState } from 'react';
import './_UserDropdown.scss';
import { Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slice/authSlice';
import { useRouter } from 'next/navigation';
import axios from 'axios';



function UserDropdown() {

  const dispatch = useDispatch();

  const router = useRouter();

  //#region 讀取會員頭像資料
      const avatarUrl = useSelector((state)=>{
          return(
              state.auth.avatar_url
          )
      })

      useEffect(()=>{
          //console.log("頭像資料:",avatarUrl);
      },[avatarUrl])
  //#endregion

  //#region 讀取中央會員名稱資料
      //讀取中央資料
      const userName = useSelector((state)=>{
          return(
              state.auth.username
          )
      })

      useEffect(()=>{
          //console.log("會員名稱資料:",userName);
      },[userName])
  //#endregion
  
  const [show, setShow] = useState(false);//紀錄是否開啟視窗

  const handleLogoutUser = async()=>{
    try{
      await axios.post(`/api/auth/logoutUser`);
      //console.log("登出成功");
      dispatch(logout());
      router.push('/');
      setShow(false);
    }catch(error){
      console.log("登出失敗:",error);
    }
  }

  return (
    <>
      
      <Dropdown show={show} onToggle={(isOpen) => setShow(isOpen)}>
        
        <Dropdown.Toggle as="div" className='user-dropdown-toggle'>

            <div className="userItem-set">
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
            </div>

        </Dropdown.Toggle>
        
        <Dropdown.Menu className="userDropdown-list-wrapper" popperConfig={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 20], // X, Y（px）
              },
            },
          ],
        }}>

            <Link className="dropdown-item-set" href="/UserPages"
                  onClick={()=>{
                    setShow(false);
                  }}>
                    會員中心
            </Link>
            <button className="dropdown-item-set"
                  onClick={()=>{
                    handleLogoutUser()
                  }}>
                    登出
            </button>

        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default UserDropdown;
