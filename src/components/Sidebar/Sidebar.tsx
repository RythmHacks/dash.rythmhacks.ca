import React, { useState } from 'react'
import './Sidebar.scss'
import logo from '../../assets/rythmhacks-circle.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BiHome } from 'react-icons/bi'
import { BsClipboard2Check } from 'react-icons/bs'
import { IoMdSettings, IoMdLogOut } from 'react-icons/io'
import { GoKebabVertical } from 'react-icons/go'
import { useAuth } from '../../contexts/Auth'

const Sidebar = () => {
    const { user, signOut } = useAuth();
    let location = useLocation().pathname

    const navigate = useNavigate()

    const [accountPopupOpened, setAccountPopupOpened] = useState(false)

    if (location === '/login') {
        return null;
    }

    const logout = async () => {
        const { error } = await signOut()
        if (error) throw error;
        navigate('/')
    }

    const handlePopupClick = () => {
        setAccountPopupOpened(!accountPopupOpened)
    }

    return (
        <div className="sidebar">
            <div>
                <div className='flex gap-4 items-center p-8 pb-0'>
                    <img src={logo} alt='sidebarlogo' className='rounded-md h-[3rem]'></img>
                    <h3>Hacker<br/>Dashboard</h3>
                </div>
                <div className='links mt-[4rem]'>
                    <Link to='/dashboard' className={(location === '/dashboard') ? "active" : ""}><BiHome/>Home</Link>
                    <Link to='/dashboard/apply' className={(location === '/dashboard/apply') ? "active" : ""}><BsClipboard2Check/>Apply</Link>

                </div>
            </div>

            <div className={`${user ? "block" : "hidden"}`}>
                <div className={`transition-opacity account-popup flex-col shadow-xl shadow-black/25 ${accountPopupOpened ? "open" : "close"}`} onClick={() => setAccountPopupOpened(false)}>
                    <div className="link" onClick={() => navigate('/dashboard/settings')}>
                        <IoMdSettings size={16}/>
                        Settings
                    </div>
                    <div className="link" onClick={() => logout()}>
                        <IoMdLogOut size={16}/>
                        Logout
                    </div>
                </div>

                <div className='cursor-pointer flex items-center justify-between bg-dark1 p-4 gap-2' onClick={handlePopupClick}>
                    {/* {(user?.name) ? user?.email : user?.name} */}
                    <span>{user?.email}</span>
                    <GoKebabVertical size={16}/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar