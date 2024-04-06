import { redirect } from "next/navigation";

const Home = () => {
    const user = true; // placeholder

    redirect(user ? "/dashboard" : "/login")
};

export default Home;
