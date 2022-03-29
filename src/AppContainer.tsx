import React from "react";
import Header from "./components/Header";

export default function AppContainer( props : {children : React.ReactNode}){
    return (
        <>
            <div>
                <Header title={"Formify"} />
                <div className="text-center mt-[120px]">
                    <div className="inline-block w-full max-w-[1200px] text-left text-white">
                        {props.children}
                    </div>
                </div>
                
            </div>
        </>        
    )
}