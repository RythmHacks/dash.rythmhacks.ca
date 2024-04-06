import Navbar from "./components/Navbar/Navbar";
import { Link } from "react-router-dom";

const Notfound = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <Navbar />
            <div className="container h-min m-8">
                <h1>Well darn again</h1>
                <p>
                    404: We couldn't find this page.{" "}
                    <Link to="/login">Go somewhere else.</Link>
                </p>
            </div>
        </div>
    );
};

export default Notfound;
