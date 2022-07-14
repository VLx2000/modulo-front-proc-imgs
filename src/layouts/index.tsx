import { Outlet } from "react-router-dom";
import NavigationBar from "./Navbar";

export function Layout () {
    return (
        <div>
            <NavigationBar />
            <Outlet />
        </div>
    )
}

export { default as Navbar} from "./Navbar";
