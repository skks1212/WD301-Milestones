import React from "react";
import logo from "../logo.svg"

export function Home(props : {stateCB : () => void}) {

    const button_classes = 'cursor-pointer p-2 m-2 bg-blue-500 text-white rounded transition hover:bg-blue-600';

    return (
        <div className="text-center">
            <div className="pt-6">
                This is a home page.
            </div>
            <button className={button_classes} onClick={props.stateCB}>
                Check out this dynamic form
            </button>
        </div>
    )
}