import { useState, FormEvent } from "react"
import { useAuth } from "../../contexts/Auth";
import Modal from '../../components/Modal/Modal'

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
        <div className='p-12' id='home'>
            <div className='container'>
                <h1 className='pb-4'>Home</h1>
                <div>Hey {(firstName === '' || !firstName) ? "there" : firstName}! Welcome to your hacker dashboard, where you'll find important info throughout the event. </div>
            </div>
        </div>
        <Modal 
            isOpened={modalIsOpened}
            setIsOpened={setModalIsOpened}
            title="You're almost there!"
        >
            <p className="mb-4">Before proceeding to the dashboard, please enter your full name.</p>
            <form onSubmit={handleNameChange}>
                <div className="flex gap-4">
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="firstname">First Name</label>
                        <input 
                        className="p-2 text-md" 
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
                        className="p-2 text-md" 
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