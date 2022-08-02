import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import SearchBar from "../SearchBar/SearchBar";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";
import NavList from "./NavList";
const Navbar = ({ searchUpdate }) => {
    const { user } = useSelector((state) => state.auth);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Orderat
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <NavList />
                        <div className="d-flex icons">
                            <SearchBar searchUpdate={searchUpdate} />
                            <Link to="/cart">
                                <AiOutlineShoppingCart />
                            </Link>
                            {user ? (
                                <Link to={"/profile"}>
                                    <div className="dropdown">
                                        <FaUser />
                                        <UserDropdown />
                                    </div>
                                </Link>
                            ) : (
                                <Link to="/login">
                                    <FiLogIn />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
