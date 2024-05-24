"use client";
import { FormEvent, useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";

import { useSession } from "next-auth/react";
import { getUser, updateUser } from "@/app/api/auth/userModel";


const Settings = () => {
    // const { user, updateUser } = useAuth()
    const { data: session, update } = useSession();

    // get user email
    // call api with user email
    // api returns "first name, last name, github, linkedin, discord, instagam"
    const user = session?.user;
    if (!user) {
        //TODO: redirect
        return
    }



    const [firstName, setFirstName] = useState<string>(user?.name || "Unnamed");
    const [lastName, setLastName] = useState<string>(user?.lastName || "Hacker");
    const [email, setEmail] = useState<string>(user?.email! || "test@gmail.com");
    const [github, setGithub] = useState(user?.github || "github.com/username");
    const [linkedin, setLinkedin] = useState(user?.linkedin || "linkedin.com/in/username");
    const [discord, setDiscord] = useState(user?.discord || "Discord");
    const [instagram, setInstagram] = useState(user?.instagram || "Instagram");
    const [theme, setTheme] = useState<string>("loading");

    useEffect(() => {
        setTheme(localStorage.theme);
    });

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch user data');
    //             }
    //             const userData = await response.json();
    //             setFirstName(userData.name);
    //             setLastName(userData.lastName);
    //             setEmail(userData.email);
    //             setGithub(userData.github);
    //             setLinkedin(userData.linkedin);
    //             setDiscord(userData.discord);
    //             setInstagram(userData.instagram);
    //         } catch (error: any) {
    //             console.error('Failed to load user data:', error);
    //         }
    //     };
    
    //     fetchUserData();
    // }, [email]);
    useEffect(() => {
        const fetchUserData = async () => {
            const userEmail = localStorage.getItem('userEmail');
            try {
                // const response = await fetch(`/api/user?email=${encodeURIComponent("enkai.liu.1@gmail.com")}`);
                // if (!response.ok) {
                //     throw new Error('Failed to fetch user data');
                // }
                // const userData = await response.json();
                const userData = await getUser(user.id!);
                if (userData) {
                    setFirstName(userData.name ?? "");
                    setLastName(userData.lastName ?? "");
                    setEmail(userData.email ?? "");
                    setGithub(userData.github ?? "");
                    setLinkedin(userData.linkedin ?? "");
                    setDiscord(userData.discord ?? "");
                    setInstagram(userData.instagram ?? "");
                }
            } catch (error) {
                console.error('Failed to load user data:', error);
            }
        }
        fetchUserData();
    }, []); 
    
    

    const [nameUpdated, setNameUpdated] = useState(false);
    const [emailUpdated, setEmailUpdated] = useState(false);

    const handleUserInfoSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = {
            name: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            github: github.trim(),
            linkedin: linkedin.trim(),
            discord: discord.trim(),
            instagram: instagram.trim(),
        };
    
        // try {
        //     const response = await fetch(`/api/user?email=${encodeURIComponent(email)}`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(userData)
        //     });
        //     if (!response.ok) {
        //         throw new Error('Failed to update user information');
        //     }
        //     const updatedUser = await response.json();
        //     update({ ...session, user: updatedUser });
        //     setNameUpdated(true);
        // } catch (error: any) {
        //     alert(error.message);
        //     console.error(error);
        // }
        try {
            // const response = await fetch(`/api/user?email=${encodeURIComponent(email)}`, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(userData)
            // });
            // if (!response.ok) {
            //     throw new Error('Failed to update user information');
            // }
            // const updatedUser = await response.json();
            await updateUser({where: {id: user?.id}, data: userData});
            setNameUpdated(true); 
        } catch (error: any) {
            alert(error.message);
            console.error(error);
        }
    
    };
    
    return (
        <div className="page" id="settings">
            <div className="flexwrap">
                <div className="container">
                    <form onSubmit={handleUserInfoSubmit}>
                        <h1 className="mb-4">User info</h1>
                        <div className="flex gap-4 lg:flex-row flex-col">
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="firstname">
                                    First Name
                                </label>
                                <input
                                    className="p-2 text-md w-full"
                                    id="firstname"
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="lastname">
                                    Last Name
                                </label>
                                <input
                                    className="p-2 text-md w-full"
                                    id="lastname"
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full p-2 text-md"
                                id="email"
                                type="email"
                                required
                                disabled
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="Github">
                                Github
                            </label>
                            <input
                                    className="p-2 text-md w-full"
                                    id="Github"
                                    type="text"
                                    required
                                    value={github}
                                    onChange={(e) => {
                                        setGithub(e.target.value)
                                    }}
                                />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="LinkedIn">
                                LinkedIn
                            </label>
                            <input
                                    className="p-2 text-md w-full"
                                    id="LinkedIn"
                                    type="text"
                                    required
                                    value={linkedin}
                                    onChange={(e) => {
                                        setLinkedin(e.target.value)
                                    }}
                                />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="Discord">
                                Discord
                            </label>
                            <input
                                    className="p-2 text-md w-full"
                                    id="Discord"
                                    type="text"
                                    required
                                    value={discord}
                                    onChange={(e) => {
                                        setDiscord(e.target.value);
                                    }}
                                />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="Instagram">
                                Instagram
                            </label>
                            <input
                                    className="p-2 text-md w-full"
                                    id="Instagram"
                                    type="text"
                                    required
                                    value={instagram}
                                    onChange={(e) => {
                                        setInstagram(e.target.value);
                                    }}
                                />
                        </div>

                        <p className="mt-4 mb-4">
                            Want to change your email? Contact the organizers at{" "}
                            <a href="mailto:rythmhacks@gmail.com">rythmhacks@gmail.com</a>.
                        </p>

                        <button
                            type="submit"
                            // disabled={
                            //     email.trim() === user?.email &&
                            //     firstName.trim() === (user?.name || "Unnamed") &&
                            //     lastName.trim() === (user?.lastName || "Hacker")
                            // }
                        >
                            Save
                        </button>

                        <div
                            className="px-4 py-2 mt-4 items-center bg-green-500/20 text-green-300 rounded-md"
                            style={{ display: nameUpdated ? "flex" : "none" }}
                        >
                            <BsFillCheckCircleFill size={24} fill="#33FF44" className="mr-4" />
                            <p>
                                <strong>Success!</strong>
                            </p>
                        </div>

                        {/* <div 
                className="px-4 py-2 mt-4 items-center bg-yellow-500/20 text-yellow-200 rounded-md"
                style={{ display: emailUpdated ? "flex" : "none"}}
              >
                <RiErrorWarningFill size={24} fill="#FFEE22" className="mr-4" />
                <p>Check your email inbox at <span className="text-[#659CE1]">{email}</span> to finalize your email change.</p>
              </div> */}
                    </form>
                </div>
                <div className="container">
                    <h2>Delete Account</h2>
                    <p>
                        To request deletion your account, contact us at{" "}
                        <a href="mailto:rythmhacks@gmail.com">rythmhacks@gmail.com</a> and specify
                        the email of your account.
                    </p>
                </div>
            </div>
            <div className="container mt-4">
                <h1>Theme</h1>
                <p>
                    Current theme: <span className="font-bold">{theme}</span>
                </p>
                <div className="flex gap-2 flex-col lg:flex-row mt-4">
                    <button
                        onClick={() => {
                            let current = localStorage.theme;
                            if (current === "dark") {
                                localStorage.theme = "light";
                            } else if (current === "light") {
                                localStorage.theme = "dark";
                            }
                            window.location.reload();
                        }}
                    >
                        Toggle theme
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem("theme");
                            window.location.reload();
                        }}
                    >
                        Reset to OS theme
                    </button>
                </div>
            </div>
            <div className="container mt-4">
                <h1>Privacy</h1>
                <p>
                    Here at RythmHacks, we highly value having a{" "}
                    <a href="https://www.rythmhacks.ca/documents/privacy.pdf">privacy policy</a> and
                    a <a href="https://www.rythmhacks.ca/documents/cookies.pdf">cookie policy.</a>
                </p>
            </div>
        </div>
    );
};

export default Settings;
