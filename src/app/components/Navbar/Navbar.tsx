"use client";

import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import logo from "../../assets/rythmhacks-circle.png";
import { BiHome } from "react-icons/bi";
import { BsFillGearFill, BsCalendar2Check, BsDiscord, BsBook } from "react-icons/bs";
import { SiDevpost } from "react-icons/si";
import { AiOutlineLink } from "react-icons/ai";
import { IoMdSettings, IoMdLogOut } from "react-icons/io";
import { GoKebabHorizontal } from "react-icons/go";
import { FiMenu } from "react-icons/fi";
import { useStatus } from "../../contexts/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
    // const { user, signOut } = useAuth();
    const { data: session } = useSession();
    const user = session?.user;
    console.log(user);

    const router = useRouter();

    let name = `${user?.name ?? ""} ${user?.lastName ?? ""}`;

    if (name == " ") {
        name = "Unnamed Hacker";
    }

    const [isAccountPopupOpened, setIsAccountPopupOpened] = useState<boolean>(false);
    const [isHamMenuOpened, setIsHamMenuOpened] = useState<boolean>(false);

    const status = useStatus();

    const logout = async () => {
        await signOut({ callbackUrl: "/login" });
    };

    const handlePopupClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsAccountPopupOpened(!isAccountPopupOpened);
    };

    const handleHamMenuClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsHamMenuOpened(!isHamMenuOpened);
    };

    useEffect(() => {
        if (isAccountPopupOpened) {
            document.addEventListener("click", () => setIsAccountPopupOpened(false));
        }
        return () => document.removeEventListener("click", () => setIsAccountPopupOpened(false));
    }, [isAccountPopupOpened]);

    useEffect(() => {
        if (isHamMenuOpened) {
            document.addEventListener("click", () => setIsHamMenuOpened(false));
        }
        return () => document.removeEventListener("click", () => setIsHamMenuOpened(false));
    });

    return (
        <>
            <nav className="navbar-desktop">
                <div>
                    <div
                        className="flex gap-4 items-center p-8 pb-0 cursor-pointer"
                        onClick={() => router.push("/dashboard")}
                    >
                        <Image
                            src={logo}
                            alt="sidebarlogo"
                            className="rounded-md size-[3rem]"
                        ></Image>
                        <h3 onClick={() => router.push("/dashboard")}>
                            Hacker
                            <br />
                            Dashboard
                        </h3>
                    </div>
                    <div className="links mt-[4rem]">
                        {status === "Confirmed" ? (
                            <>
                                <Link href="/dashboard">
                                    <BiHome />
                                    Home
                                </Link>
                                <Link href="/dashboard/schedule">
                                    <BsCalendar2Check />
                                    Schedule
                                </Link>
                                <Link href="/dashboard/discord">
                                    <BsDiscord />
                                    Discord
                                </Link>
                                {/* <NavLink to='/dashboard/register' end><BsClipboard2Check/>Register</NavLink>  */}
                                <a
                                    href="https://rythmhacks.notion.site/RythmHacks-2023-Hacker-Guide-81f51ef2250741d89dd91b2ca1650749?pvs=4"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <BsBook />
                                    Hacker Guide
                                </a>
                                <a
                                    href="https://rythmhacks2023.devpost.com"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <SiDevpost />
                                    Devpost
                                </a>
                                <a
                                    href="https://links.rythmhacks.ca/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <AiOutlineLink />
                                    Important Links
                                </a>
                            </>
                        ) : (
                            <>
                                <Link href="/dashboard">
                                    <BiHome />
                                    Home
                                </Link>
                                <a
                                    href="https://rythmhacks2023.devpost.com"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <SiDevpost />
                                    Devpost
                                </a>
                                <a
                                    href="https://links.rythmhacks.ca/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <AiOutlineLink />
                                    Important Links
                                </a>
                            </>
                        )}
                    </div>
                </div>

                <div className={`${user ? "block" : "hidden"}`}>
                    <div
                        className={`transition-opacity account-popup popup flex-col shadow-xl shadow-black/25 ${
                            isAccountPopupOpened ? "open" : "close"
                        }`}
                    >
                        <Link className="link" href="/dashboard/settings">
                            <IoMdSettings size={16} />
                            Settings
                        </Link>
                        <div className="link" onClick={() => logout()}>
                            <IoMdLogOut size={16} />
                            Logout
                        </div>
                    </div>

                    <div
                        className="cursor-pointer flex items-center justify-between dark:bg-dark1 bg-[#e4e7eb] p-4 gap-2"
                        onClick={handlePopupClick}
                    >
                        <span>{name ? name : user?.email}</span>
                        <GoKebabHorizontal size={16} />
                    </div>
                </div>
            </nav>

            <nav className="navbar-mobile">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Image
                            src={logo}
                            alt="sidebarlogo"
                            className="rounded-md size-[2.5rem]"
                        ></Image>
                        <h3
                            onClick={() => router.push("/dashboard")}
                            className="heckinsmall:block hidden"
                        >
                            Dashboard
                        </h3>
                    </div>
                    <div onClick={handleHamMenuClick} className="h-full flex items-center">
                        <FiMenu size={24} />
                    </div>
                </div>
                <div className={`${isHamMenuOpened ? "open" : "close"} ham-menu popup`}>
                    {status === "Confirmed" ? (
                        <>
                            <Link href="/dashboard" className="link">
                                <BiHome />
                                Home
                            </Link>
                            {/* <Link href='/dashboard/register' className='link'><BsClipboard2Check/>Register</Link>  */}
                            <Link className="link" href="/dashboard/schedule">
                                <BsCalendar2Check />
                                Schedule
                            </Link>
                            <Link href="/dashboard/discord" className="link">
                                <BsDiscord />
                                Discord
                            </Link>
                            <a
                                href="https://rythmhacks.notion.site/RythmHacks-2023-Hacker-Guide-81f51ef2250741d89dd91b2ca1650749?pvs=4"
                                target="_blank"
                                rel="noreferrer"
                                className="link"
                            >
                                <BsBook />
                                Hacker Guide
                            </a>
                            <a
                                href="https://rythmhacks2023.devpost.com"
                                target="_blank"
                                rel="noreferrer"
                                className="link"
                            >
                                <SiDevpost />
                                Devpost
                            </a>
                            <a
                                href="https://links.rythmhacks.ca/"
                                target="_blank"
                                rel="noreferrer"
                                className="link"
                            >
                                <AiOutlineLink />
                                Important Links
                            </a>
                        </>
                    ) : (
                        <>
                            <Link href="/dashboard/settings" className="link">
                                <BsFillGearFill />
                                Settings
                            </Link>
                            <div className="link" onClick={() => logout()}>
                                <IoMdLogOut />
                                Logout
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
