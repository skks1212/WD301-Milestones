import React from "react";

export default function AppContainer( props : {children : React.ReactNode}){
    return (
        <div className="flex h-screen bg-gray-100 items-center box-border">
            <div className="w-[600px] p-4 mx-auto bg-white shadow-lg rounded-xl box-border">
                {props.children}
            </div>
        </div>
    )
}