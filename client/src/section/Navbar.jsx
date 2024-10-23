import { useState } from "react";
import { Link } from 'react-router-dom';

const navlinks = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'Add', path: '/new' },
    { id: 3, name: 'About Us', path: '/about' }
];

function NavItems() {
    return (
        <ul className="flex flex-col sm:flex-row gap-4 items-center">
            {navlinks.map((item) => (
                <li key={item.id} className="text-neutral-400 py-2 hover:text-white">
                    <Link className="text-lg hover:text-white transition-colors" to={item.path}>{item.name}</Link>
                </li>
            ))}
        </ul>
    );
}

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 bg-black/90 z-50 ">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center py-5 mx-auto">
                        <Link className="text-white mx-4 text-xl font-bold" to="/">E-Commerce</Link>
                        <button className="sm:hidden mx-4" onClick={toggle}>
                            <img src={isOpen ? '/assets/close.svg' : '/assets/menu.svg'} alt="Menu" className="w-6 h-6" />
                        </button>
                        <div className="text-white mx-5 sm:flex hidden">
                            <NavItems />
                        </div>
                    </div>
                </div>
                <div className={`absolute left-0 right-0 bg-black/70 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-hidden z-20 mx-auto sm:hidden block ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                    <NavItems />
                </div>
            </header>
        </>
    );
}

export default Navbar;
