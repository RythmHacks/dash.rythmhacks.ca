"use client";
import { useState, FormEvent } from "react";
import Modal from "../components/Modal/Modal";
import { useStatus } from "../contexts/AppContext";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Home = () => {
    const { data: session, update } = useSession();
    const user = session?.user;

    const status: string = useStatus();

    const [modalIsOpened, setModalIsOpened] = useState(
        user?.name === undefined && user?.lastName === undefined
    );

    const [firstName, setFirstName] = useState<string>(user?.name || "");
    const [lastName, setLastName] = useState<string>(user?.lastName || "");

    const handleNameChange = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // await updateUser({
        //     data: {
        //         first_name: firstName,
        //         last_name: lastName,
        //     },
        // });
        await update({
            ...session,
            user: {
                ...user,
                name: firstName,
                lastName,
            },
        });

        setModalIsOpened(false);
    };

    const logout = async () => {
        await signOut({ callbackUrl: "/login" });
    };

    return (
        <>
            <div className="page" id="home">
                <div className="container w-full">
                    <h1>Home</h1>
                    <p>
                        Hey {firstName === "" || !firstName ? "there" : firstName}! Welcome to your
                        hacker dashboard, where you'll find important info to help you make the most
                        out of RythmHacks. Check out some links below to get started!
                    </p>
                </div>
                <div className="mt-4">
                    <div className="container w-full">
                        <h2>Registration Closed</h2>
                        <p>
                            Registration for RythmHacks 2023 is now closed. Thank you to everybody
                            who applied!
                        </p>
                    </div>
                    {status === "Confirmed" && (
                        <>
                            <div className="flex gap-4 mt-4 flex-col lg:flex-row">
                                <div className="container w-full lg:w-1/2">
                                    <h2>
                                        <Link href="/dashboard/schedule">Schedule</Link>
                                    </h2>
                                    <p>
                                        Click <Link href="/dashboard/schedule">here</Link> to check
                                        out the full event schedule for RythmHacks 2023! We've got
                                        over 15 events including workshops, activities, networking
                                        sessions, panels, and more planned for this year's event.
                                        Don't miss out!
                                    </p>
                                </div>
                                <div className="container w-full lg:w-1/2">
                                    <h2>Venue and Travel Information</h2>
                                    <p>
                                        This year, RythmHacks will be taking place at the{" "}
                                        <a
                                            href="https://www.acceleratorcentre.com"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Accelerator Centre
                                        </a>{" "}
                                        (295 Hagey Blvd, Waterloo, ON N2L 6R5) from September 1-3,
                                        2023. Unfortunately, we're unable to reimburse travel this
                                        year, but there is plenty of parking and bike rack space to
                                        park your vehicle at the Accelerator Centre.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-4 flex-col lg:flex-row">
                                <div className="container w-full lg:w-1/2">
                                    <h2>
                                        <Link href="/dashboard/discord">Discord</Link>
                                    </h2>
                                    <p>
                                        Use our Discord integration to join the official RythmHacks
                                        Discord server! It's where we'll be making announcements and
                                        updates throughout the weekend. It's also a great place to
                                        ask questions, talk to other hackers, and get help on your
                                        hack!
                                    </p>
                                </div>
                                <div className="container w-full lg:w-1/2">
                                    <h2>
                                        <a
                                            href="https://rythmhacks2023.devpost.com"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Devpost
                                        </a>
                                    </h2>
                                    <p>
                                        Devpost is where you'll be submitting your projects after
                                        you're done with them for the weekend, and also where you
                                        can get information on submissions, prizes, criteria, and
                                        more! Be sure to register yourself and your team on our
                                        Devpost site.
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Modal
                isOpened={modalIsOpened}
                setIsOpened={setModalIsOpened}
                title="You're almost there!"
                closable={false}
            >
                <p className="mb-4">
                    Before proceeding to the dashboard, please enter your full name.
                </p>
                <form onSubmit={handleNameChange}>
                    <div className="flex flex-col">
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
                                placeholder="Unnamed"
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
                                placeholder="Hacker"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <p className="mb-4">
                        Did you mess up?{" "}
                        <button
                            className="style-link"
                            onClick={() => {
                                logout();
                            }}
                        >
                            Log out.
                        </button>
                    </p>
                    <button disabled={firstName === "" || lastName === ""}>Continue</button>
                </form>
            </Modal>
        </>
    );
};

export default Home;
