import React from "react";
import { getLocalForms, saveLocalForms } from "./Form"
import { useState } from "react";

export function Home(props : {stateCB : (formID : any) => void}) {

    const [state, setState] = useState(() => getLocalForms());
    
    const button_classes = 'cursor-pointer p-2 m-2 bg-blue-500 text-white rounded transition hover:bg-blue-600';

    const deleteForm = (fid : number) => {
        const newState = state.filter(form => form.id !== fid);
        setState(newState);
        saveLocalForms(newState);
    }

    return (
        <div className="text-center">
            <div className="pt-6">
                <b>
                    My Forms
                </b>
            </div>
            <div className="flex flex-wrap justify-center gap-3 p-3">
                {
                    state.map((form : any, i:number) => (
                        <div key={i} className="border-2 border-slate-700 rounded-lg ">
                            <div className="px-6 py-4">
                                {form.title}
                            </div>
                            <div className="flex">
                                <button onClick={() => props.stateCB(form.id)} className="flex-1 text-center py-3 border-t-2 border-slate-700 hover:bg-blue-600 transition hover:border-blue-600">
                                    <i className="far fa-pen"></i>
                                </button>
                                <button onClick={() => deleteForm(form.id)} className="flex-1 text-center border-t-2 border-slate-700 border-l-2 py-3 hover:bg-red-600 transition hover:border-red-600">
                                    <i className="far fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                }
                { 
                    state.length === 0 ?
                    (
                        <div>
                            <div className="text-7xl font-bold">
                                (•̀ ﹏•́ )
                            </div>
                            <br />
                            No Forms found. Make one!
                        </div>
                    ) :
                    (
                        <>
                        </>
                    )
                }
            </div>
            <button className={button_classes} onClick={() => props.stateCB(0)}>
               <i className="far fa-plus"></i> &nbsp;Create New
            </button>
        </div>
    )
}