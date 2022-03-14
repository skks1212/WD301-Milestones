import React from "react";
import logo from './logo.svg'

export default function AppContainer( props : {children : React.ReactNode}){
    const spinstyle = {
        animation : "spin 2s linear infinite"
    }
    return (
        <>
            <div className="flex h-screen bg-gray-900 items-center justify-center box-border flex-col">
                <div className="w-[600px] p-4 mx-auto bg-gray-800 text-white shadow-lg rounded-xl box-border max-h-[60vh] overflow-auto">
                    {props.children}
                </div>
            </div>
            <img src={logo} className="animate-spin mb-4 absolute bottom-[20px] w-[80px] left-[calc(50vw-40px)]" width="" alt="logo" style={spinstyle}/>
        </>        
    )
}