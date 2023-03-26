import { FormEvent, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs"
import { RiErrorWarningFill } from "react-icons/ri"
import { useAuth } from "../../contexts/Auth";

const Settings = () => {
    const { user, updateUser } = useAuth()

    const [firstName, setFirstName] = useState<string>(user?.user_metadata.first_name || "Unnamed")
    const [lastName, setLastName] = useState<string>(user?.user_metadata.last_name || "Hacker")
    const [email, setEmail] = useState<string>(user?.email!)
    
    const [nameUpdated, setNameUpdated] = useState(false)
    const [emailUpdated, setEmailUpdated] = useState(false)

    const handleUserInfoSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        const nameHasChanged = firstName.trim() !== user?.user_metadata.first_name || lastName !== user?.user_metadata.last_name
        const emailHasChanged = email.trim() !== user?.email

        const { error } = await updateUser({
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim()
          },
          email: email.trim()
        })

        if (error) throw error
        else {
          if (nameHasChanged) setNameUpdated(true)
          if (emailHasChanged) setEmailUpdated(true)
        }
      } catch (error: any) {
        alert(error.error_description || error.message)
        console.error(error)
      }
    }

    return (
      <div className="p-12" id="home">
        <div className="container">
          <form onSubmit={handleUserInfoSubmit}>
            <h1 className="mb-4">User info</h1>
            <div className="flex gap-4">
              <div className="mb-4">
                <label className="block mb-2" htmlFor="firstname">First Name</label>
                <input 
                  className="p-2 text-md" 
                  id="firstname" 
                  type="text"
                  required
                  value={firstName}
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
                  value={lastName}
                  onChange={e => {
                    setLastName(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="email">Email</label>
              <input
                className="w-full p-2 text-md"
                id="email"
                type="email"
                required
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                }}
              />
            </div>

            <button type="submit" disabled={
              email.trim() === user?.email 
              && firstName.trim() === (user?.user_metadata.first_name || "Unnamed")
              && lastName.trim() === (user?.user_metadata.last_name || "Hacker")
            }>Save</button>

            <div 
              className="px-4 py-2 mt-4 items-center bg-green-500/20 text-green-300 rounded-md"
              style={{ display: nameUpdated ? "flex" : "none"}}
            >
              <BsFillCheckCircleFill size={24} fill="#33FF44" className="mr-4" />
              <p><strong>Success!</strong> Your name has been updated.</p>
            </div>

            <div 
              className="px-4 py-2 mt-4 items-center bg-yellow-500/20 text-yellow-200 rounded-md"
              style={{ display: emailUpdated ? "flex" : "none"}}
            >
              <RiErrorWarningFill size={24} fill="#FFEE22" className="mr-4" />
              <p>Check your email inbox at <span className="text-[#659CE1]">{email}</span> to finalize your email change.</p>
            </div>
          </form>
        </div>
      </div>
    )
  }
  
  export default Settings;