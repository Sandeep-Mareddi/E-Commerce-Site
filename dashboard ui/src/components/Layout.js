import { Outlet } from "react-router-dom";
import Logo from './Logo/Logo';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import Bannner from './Banner/Banner';
import '../App.css';

export default function Layout() {

    return (
        <>
            <div className="App">
                <div>
                    <Logo />
                    <Bannner />
                </div>
                <div className='body col-md-12'>
                    <NavBar />
                    <div className='outlet'>
                        <Outlet />
                    </div>
                </div>
                <footer className='footer col-md-12'>
                    <Footer />
                </footer>
            </div>
        </>
    )
}