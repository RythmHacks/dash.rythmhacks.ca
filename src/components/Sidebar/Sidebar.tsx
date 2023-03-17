import './Sidebar.scss'
import logo from '../../assets/rythmhacks-circle.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BiHome } from 'react-icons/bi'
import { BsClipboard2Check } from 'react-icons/bs'
import { RxPerson } from 'react-icons/rx'
import { useAuth } from '../../contexts/Auth'
const Sidebar = () => {
    
    const { user, signOut } = useAuth();
    let location = useLocation().pathname

    const navigate = useNavigate()

    if (location === '/login') {
        return null;
    }

    const logout = async () => {
        const { error } = await signOut()
        if (error) throw error;
        navigate('/')
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

            <div>
                <div className="account-popup flex flex-col">
                    <div className="w-full h-12 p-4 hover:bg-dark2">
                        <Link to="/dashboard/settings" className={(location === '/dashboard/apply') ? "active" : ""}>Settings</Link>
                    </div>
                    <div className="w-full h-12 p-4 hover:bg-dark2">
                        <button className="style-none" onClick={() => logout()}>Logout</button>
                    </div>
                </div>

                <div className='flex items-center bg-dark1 p-4 gap-2'>
                    <RxPerson size={18}/>
                    {/* {(user?.name) ? user?.email : user?.name} */}
                    <span>{user?.email}</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar