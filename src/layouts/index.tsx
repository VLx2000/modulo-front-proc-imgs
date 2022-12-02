import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavigationBar from "./Navbar";

export function Layout () {
    return (
        <div>
            <NavigationBar />
            <ToastContainer />
            <Outlet />
        </div>
    )
}

export { default as Navbar} from "./Navbar";
