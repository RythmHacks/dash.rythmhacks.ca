"use client";
import { FunctionComponent, useEffect } from "react";

const Theme: FunctionComponent = () => {
    useEffect(() => {
        if (!localStorage.theme) {
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                localStorage.theme = "dark";
            } else if (
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: light)").matches
            ) {
                localStorage.theme = "light";
            } else {
                localStorage.theme = "dark";
            }
        }

        if (localStorage.theme === "dark" && !document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        }
        if (
            localStorage.theme === "light" &&
            !document.documentElement.classList.contains("light")
        ) {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    }, []);

    return <></>;
};

export default Theme;
