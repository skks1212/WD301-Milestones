import React from "react";
import Header from "./components/Header";
import { User } from "./types/UserTypes";

export default function AppContainer( props : {children : React.ReactNode, currentUser : User}){
    return (
        <>
            <div className="bg-gray-900">
                <Header currentUser={props.currentUser} title={"Formify"} />
                <div className="text-center mt-[100px]">
                    <div className="inline-block w-[calc(100%-60px)] max-w-[1200px] m-[30px] text-left text-white">
                        {props.children}
                    </div>
                </div>
                
            </div>
        </>        
    )
}