import React, { useState } from 'react'
import './Navbar.scss'
import logo from '../../assets/rythmhacks-circle.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { BiHome } from 'react-icons/bi'
import { BsClipboard2Check, BsFillGearFill } from 'react-icons/bs'
import { IoMdSettings, IoMdLogOut } from 'react-icons/io'
import { GoKebabVertical } from 'react-icons/go'
import { FiMenu } from 'react-icons/fi'
import { useAuth } from '../../contexts/Auth'

const Navbar = () => {
    const { user, signOut } = useAuth();

    const navigate = useNavigate()

    let name = `${user?.user_metadata.first_name} ${user?.user_metadata.last_name}`
    const [accountPopupOpened, setAccountPopupOpened] = useState<boolean>(false)
    const [hamMenuOpened, setHamMenuOpened] = useState<boolean>(false)

    const logout = async () => {
        const { error } = await signOut()
        if (error) throw error;
        navigate('/')
    }

    const handlePopupClick = () => {
        setAccountPopupOpened(!accountPopupOpened)
    }

    return (
        <>
        <div className="navbar-desktop">
            <div>
                <div className='flex gap-4 items-center p-8 pb-0 cursor-pointer' onClick={() => navigate('/dashboard')}>
                    <img src={logo} alt='sidebarlogo' className='rounded-md h-[3rem]'></img>
                    <h3>Hacker<br/>Dashboard</h3>
                </div>
                <div className='links mt-[4rem]'>
                    <NavLink to='/dashboard' end><BiHome/>Home</NavLink>
                    <NavLink to='/dashboard/apply' end><BsClipboard2Check/>Apply</NavLink> 
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
                    <span>{(name) ? name : user?.email}</span>
                    <GoKebabVertical size={16}/>
                </div>
            </div>
        </div>

        <div className='navbar-mobile'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <img src={logo} alt='sidebarlogo' className='rounded-md h-[2.5rem]'></img>
                    <h3>Dashboard</h3>
                </div>
                <div onClick={() => setHamMenuOpened(!hamMenuOpened)} className='h-full flex items-center'>
                    <FiMenu size={24} />
                </div>
            </div>
            <div className={`${hamMenuOpened ? "open" : "close"} ham-menu`}>
                <NavLink to='/dashboard' className='link' end><BiHome/>Home</NavLink>
                <NavLink to='/dashboard/apply' className='link' end><BsClipboard2Check/>Apply</NavLink> 
                <NavLink to='/dashboard/settings' className='link' end><BsFillGearFill/>Settings</NavLink> 
            </div>
        </div>
        </>
    )
}

export default Navbar