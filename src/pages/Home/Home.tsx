import { useState, FormEvent } from "react"
import { useAuth } from "../../contexts/Auth";
import Modal from '../../components/Modal/Modal'
import { Link } from 'react-router-dom'

const Home = () => {
    const { user, updateUser } = useAuth()

    const [modalIsOpened, setModalIsOpened] = useState(user?.user_metadata.first_name === undefined && user?.user_metadata.last_name === undefined)

    const [firstName, setFirstName] = useState<string>(user?.user_metadata.first_name || '')
    const [lastName, setLastName] = useState<string>(user?.user_metadata.last_name || '')

    const handleNameChange = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await updateUser({
            data: {
                first_name: firstName,
                last_name: lastName
            }
        })
        setModalIsOpened(false)
    }

    return (<>
        <div className='page' id='home'>
            <div className='container w-full'>
                <h1>Home</h1>
                <p>Hey {(firstName === '' || !firstName) ? "there" : firstName}! Welcome to your hacker dashboard, where you'll find important info to help you make the most out of RythmHacks. Check out some links below to get started!</p>
            </div>
            <div className='flexwrap mt-4'>
                <div className='container w-1/2'>
                    <h2><Link to='/dashboard/register'>Register now!</Link></h2>
                    <p>Registration for RythmHacks 2023 is open now! The registration deadline is August 8, 2023, at 11:59 PM EST. Unfortunately, any submissions after that point will not be considered.</p>
                </div>
                <div className='container w-1/2'>
                    <h2>Venue and Travel Information</h2>
                    <p>This year, RythmHacks will be taking place at the <a href='https://www.acceleratorcentre.com' target='_blank' rel='noreferrer'>Accelerator Centre</a> (295 Hagey Blvd, Waterloo, ON N2L 6R5) from September 1-3, 2023. Unfortunately, we're unable to reimburse travel this year, but there is plenty of parking and bike rack space to park your vehicle at the Accelerator Centre.</p>
                </div>
            </div>
        </div>
        <Modal 
            isOpened={modalIsOpened}
            setIsOpened={setModalIsOpened}
            title="You're almost there!"
            closable={false}
        >
            <p className="mb-4">Before proceeding to the dashboard, please enter your full name.</p>
            <form onSubmit={handleNameChange}>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="firstname">First Name</label>
                        <input 
                        className="p-2 text-md w-full" 
                        id="firstname" 
                        type="text"
                        required
                        value={firstName}
                        placeholder='Unnamed'
                        onChange={e => {
                            setFirstName(e.target.value)
                        }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="lastname">Last Name</label>
                        <input 
                        className="p-2 text-md w-full" 
                        id="lastname" 
                        type="text" 
                        required
                        placeholder='Hacker'
                        value={lastName}
                        onChange={e => {
                            setLastName(e.target.value)
                        }}
                        />
                    </div>
                </div>
                <button disabled={firstName === "" || lastName === ""}>Continue</button>
            </form>
        </Modal>

    </>
    )
}

export default Home;