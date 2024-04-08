import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const Home = async () => {
    const session = await auth(); // placeholder

    redirect(session?.user ? "/dashboard" : "/login");
};

export default Home;
