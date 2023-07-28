import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import logo from '../../assets/rythmhacks-circle.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { BiHome } from 'react-icons/bi'
import { BsClipboard2Check, BsFillGearFill, BsCalendar2Check } from 'react-icons/bs'
import { AiOutlineLink } from 'react-icons/ai'
import { IoMdSettings, IoMdLogOut } from 'react-icons/io'
import { GoKebabVertical } from 'react-icons/go'
import { FiMenu } from 'react-icons/fi'
import { useAuth } from '../../contexts/Auth'

const Navbar = () => {
    const { user, signOut } = useAuth();

    const navigate = useNavigate()

    let name;

    if (user?.user_metadata.first_name && user?.user_metadata.last_name && user?.user_metadata.first_name !== "" && user?.user_metadata.last_name !== "") {
        name = `${user?.user_metadata.first_name} ${user?.user_metadata.last_name}`
    } else {
        name = 'Unnamed Hacker'
    }

    const [isAccountPopupOpened, setIsAccountPopupOpened] = useState<boolean>(false)
    const [isHamMenuOpened, setIsHamMenuOpened] = useState<boolean>(false)

    const logout = async () => {
        const { error } = await signOut()
        if (error) throw error;
        navigate('/')
    }

    const handlePopupClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        setIsAccountPopupOpened(!isAccountPopupOpened)
    }

    const handleHamMenuClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        setIsHamMenuOpened(!isHamMenuOpened)
    }

    useEffect(() => {
        if (isAccountPopupOpened) {
            document.addEventListener('click', () => setIsAccountPopupOpened(false))
        }
        return () => document.removeEventListener('click', () => setIsAccountPopupOpened(false))
    }, [isAccountPopupOpened])

    useEffect(() => {
        if (isHamMenuOpened) {
            document.addEventListener('click', () => setIsHamMenuOpened(false))
        }
        return () => document.removeEventListener('click', () => setIsHamMenuOpened(false))
    })

    return (
        <>
        <nav className="navbar-desktop">
            <div>
                <div className='flex gap-4 items-center p-8 pb-0 cursor-pointer' onClick={() => navigate('/dashboard')}>
                    <img src={logo} alt='sidebarlogo' className='rounded-md h-[3rem]'></img>
                    <h3 onClick={() => navigate('/dashboard')}>Hacker<br/>Dashboard</h3>
                </div>
                <div className='links mt-[4rem]'>
                    <NavLink to='/dashboard' end><BiHome/>Home</NavLink>
                    <NavLink to='/dashboard/register' end><BsClipboard2Check/>Register</NavLink> 
                    <NavLink to='/dashboard/schedule' end><BsCalendar2Check/>Schedule</NavLink> 
                    <a href='https://links.rythmhacks.ca/' target='_blank' rel='noreferrer'><AiOutlineLink/>Important Links</a>
                </div>
            </div>

            <div className={`${user ? "block" : "hidden"}`}>
                <div className={`transition-opacity account-popup popup flex-col shadow-xl shadow-black/25 ${isAccountPopupOpened ? "open" : "close"}`}>
                    <NavLink className="link" to='/dashboard/settings'>
                        <IoMdSettings size={16}/>
                        Settings
                    </NavLink>
                    <div className="link" onClick={() => logout()}>
                        <IoMdLogOut size={16}/>
                        Logout
                    </div>
                </div>

                <div className='cursor-pointer flex items-center justify-between dark:bg-dark1 bg-[#e4e7eb] p-4 gap-2' onClick={handlePopupClick}>
                    <span>{(name) ? name : user?.email}</span>
                    <GoKebabVertical size={16}/>
                </div>
            </div>
        </nav>

        <nav className='navbar-mobile'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <img src={logo} alt='sidebarlogo' className='rounded-md h-[2.5rem]'></img>
                    <h3 onClick={() => navigate('/dashboard')} className='heckinsmall:block hidden'>Dashboard</h3>
                </div>
                <div onClick={handleHamMenuClick} className='h-full flex items-center'>
                    <FiMenu size={24} />
                </div>
            </div>
            <div className={`${isHamMenuOpened ? "open" : "close"} ham-menu popup`}>
                <NavLink to='/dashboard' className='link' end><BiHome/>Home</NavLink>
                <NavLink to='/dashboard/register' className='link' end><BsClipboard2Check/>Register</NavLink> 
                <a href='https://links.rythmhacks.ca/' target='_blank' rel='noreferrer' className='link'><AiOutlineLink/>Important Links</a>
                <NavLink to='/dashboard/settings' className='link' end><BsFillGearFill/>Settings</NavLink> 
                <div className="link" onClick={() => logout()}>
                    <IoMdLogOut/>
                    Logout
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar