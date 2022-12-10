import {FC, ReactNode} from "react";
import Navbar from "./Navbar";

// ----------------------------------------------------------------------

interface LayoutProps {
    children: ReactNode;
}

// ----------------------------------------------------------------------

const Layout: FC<LayoutProps> = ({children}) => {

    return (
        <>
            <Navbar/>
            {children}
        </>
    );

};

export default Layout;