import { ActiveLink, Link } from "raviger";
import React from "react";
import logo from "../logo.svg";
import { User } from "../types/UserTypes";
import { logoutUser } from "../utils/user";

export default function Header(props: {title :string, currentUser: User}) {
    const spinstyle = {
        animation : "spin 4s linear infinite"
    }
    const styling = {
        header_a : "m-4 text-gray-400",
        header_a_hover : "hover:text-white",
        header_a_active : "text-blue-400"
    }
    const User = props.currentUser;
    return (
        <div className="fixed inset-x-0 top-0 text-center text-white bg-gray-900/80 backdrop-blur">
            <div className="inline-flex items-center justify-between max-w-[1200px] w-full">
                <div className="flex items-center">
                    <div className="m-2">
                        <img src={logo} className="animate-spin w-[80px]" width="" alt="logo" style={spinstyle}/>
                    </div>
                    <div className="text-3xl font-bold text-center">
                        {props.title}
                    </div>
                </div>
                <div className="ml-8 m-4">
                    {
                        [
                            ["Home", "/home", "home"],
                            ["About", "/about", "info"]
                        ].map((link, i) => {
                            return (
                                <ActiveLink href={link[1]} className={styling.header_a +" "+ styling.header_a_hover} key={i} exactActiveClass={styling.header_a_active} >
                                    {link[0]}
                                </ActiveLink>
                            )
                        })
                    }
                    {
                        User.username === "" ? (
                            <Link href="/login" className="bg-blue-700 rounded-xl px-4 py-2 ml-4 hover:bg-blue-800 transition">
                                Login
                            </Link>
                        ) : 
                        (
                            <button className={styling.header_a +" "+ styling.header_a_hover} onClick={logoutUser}>
                                <i className="far fa-user-circle"></i> {User.username}
                            </button>
                        )
                    }
                    
                </div>
            </div>
            
        </div>
    );
};