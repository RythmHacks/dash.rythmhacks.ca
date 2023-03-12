import './Sidebar.scss'
import logo from '../../assets/rythmhacks-circle.png'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {

    let location = useLocation().pathname

    if (location === '/login') {
        return null;
    }

    return (
        <div className="sidebar">
            <div className='flex gap-4 items-center'>
                <img src={logo} alt='sidebarlogo' className='rounded-md h-[3rem]'></img>
                <h3>Hacker<br/>Dashboard</h3>
            </div>
            <div className='mt-[4rem]'>
                <Link to='/dashboard' className={(location === '/dashboard') ? "active" : ""}>Home</Link>
                <Link to='/dashboard/apply' className={(location === '/dashboard/apply') ? "active" : ""}>Apply</Link>
            </div>
        </div>
    )
}

export default Sidebar