import {FC} from "react";
import {Outlet} from "react-router-dom";
import Header from "../components/Header.tsx";

const Layout:FC = () => {
    return <div className={"min-h-screen bg-gray-700  font-sans text-white"}>
        <Header/>
        <div className={"container"}>
            <Outlet/>
        </div>
    </div>
}

export default Layout;
