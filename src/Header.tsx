import React from "react";
import logo from './logo.svg'

export default function Header(props: {title :string}) {
    const spinstyle = {
        animation : "spin 2s linear infinite"
    }
    return (
        <div className="flex">
            <img src={logo} className="animate-spin" width="100px" alt="logo" style={spinstyle}/>
            <h1 className="text-center text-xl ">
                {props.title}
            </h1>
        </div>
    );
};