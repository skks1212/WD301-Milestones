import React from "react";
import Header from "./components/Header";

export default function AppContainer( props : {children : React.ReactNode}){
    return (
        <>
            <div className="bg-gray-900">
                <Header title={"Formify"} />
                <div className="text-center mt-[100px]">
                    <div className="inline-block w-[calc(100%-60px)] max-w-[1200px] m-[30px] text-left text-white">
                        {props.children}
                    </div>
                </div>
                
            </div>
        </>        
    )
}