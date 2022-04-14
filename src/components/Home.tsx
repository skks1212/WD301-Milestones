import React from "react";
import { formData, getLocalForms, saveLocalForms } from "./Form"
import { useState } from "react";
import { Link, useQueryParams } from "raviger";
import { input_style } from "./Form";

export function Home(props : {}) {
    const [{search}, setQuery] = useQueryParams();
    const [searchString, setSearchString] = useState("");

    const [state, setState] = useState(() => getLocalForms());
    
    const button_classes = 'cursor-pointer p-2 m-2 bg-blue-700 text-white rounded-xl transition hover:bg-blue-800';

    const deleteForm = (fid : number) => {
        const confDelete = window.confirm("Are you sure you would like to delete this form?");
        if(confDelete){
            const newState = state.filter(form => form.id !== fid);
            setState(newState);
            saveLocalForms(newState);
        }
    }

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-5xl font-bold">
                    My Forms
                </h1>
                <form onSubmit={(e) => {
                e.preventDefault();
                setQuery({search: searchString})
                }}>
                    <input 
                        type="text"
                        className={input_style}
                        value={searchString}
                        onChange={(e) => {
                            setSearchString(e.target.value);
                        }}
                        name="search"
                        placeholder="Search Forms"
                    />
                </form>
            </div>
            
            <br/>
            
            <div className="flex flex-wrap justify-center gap-3 p-3">
                
                {
                    state.filter((form)=> form.title.toLowerCase().includes(search?.toLowerCase() || "")).map((form : formData, i:number) => (
                        <div key={i} className="border-2 border-gray-800 rounded-lg min-w-[200px]">
                            <div className="px-6 py-4">
                                <b className="text-xl">
                                    {form.title}
                                </b>
                                
                                <br/>
                                {form.formFields.length} questions
                            </div>
                            <div className="flex">
                                <Link href={'/form/'+form.id} className="flex-1 text-center py-3 border-t-2 border-gray-800 hover:bg-blue-700 transition hover:border-blue-700">
                                    <i className="far fa-pen"></i>
                                </Link>
                                <Link href={'/preview/'+form.id} className="flex-1 text-center py-3 border-t-2 border-l-2 border-gray-800 hover:bg-blue-700 transition hover:border-blue-700">
                                    <i className="far fa-eye"></i>
                                </Link>
                                <button onClick={() => deleteForm(form.id)} className="flex-1 text-center border-t-2 border-gray-800 border-l-2 py-3 hover:bg-red-600 transition hover:border-red-600">
                                    <i className="far fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                }
                { 
                    state.length === 0 ?
                    (
                        <div className="text-gray-400 text-center">
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
                <Link className="border-2 hover:border-blue-700 border-dashed border-gray-800 transition rounded-lg p-4 flex flex-col justify-center items-center" href={'/form/0'}>
                    <i className="far fa-plus text-3xl"></i><br/>Create New
                </Link>
            </div>
            
        </div>
    )
}