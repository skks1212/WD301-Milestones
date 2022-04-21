import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useQueryParams } from "raviger";
import { input_style } from "./Form";
import { API } from "../utils/api";
import Modal from "./Modal";
import { apiRecieveForm } from "../types/FormTypes";

export default function Home(props : {}) {
    const [{search}, setQuery] = useQueryParams();
    const [searchString, setSearchString] = useState("");

    const [state, setState] = useState<apiRecieveForm[]>([]);
    const [CFModal, setCFModal] = useState(false);

    const [createFormState, setCreateForm] = useState({title: "", description : "", is_public : false});
    
    //const button_classes = 'cursor-pointer p-2 m-2 bg-blue-700 text-white rounded-xl transition hover:bg-blue-800';

    const deleteForm = async (fid : number) => {
        const confDelete = window.confirm("Are you sure you would like to delete this form?");
        if(confDelete){
            await API.form.delete(fid);
            fetchForms();
        }
    }

    const fetchForms = async () => {
        const forms = await API.form.fetchAllForms();
        setState(forms.results);
    };    

    const createForm = async () => {
        try {
            await API.form.create(createFormState);
            fetchForms();
            setCFModal(false);
        } catch(error){
            console.log(error);
        };
    };

    useEffect(()=>{
        fetchForms();
    },[]);

    return (
        <div>
            {
                CFModal ? (
                    <Modal title="New Form" closeCB={setCFModal} actionCB={createForm} actionName="Create" >
                        <form>
                            <input type="text" className={input_style} placeholder="Form Title" onChange={e=>setCreateForm({...createFormState, title : e.target.value})}/>
                            <br/>
                            <textarea className={input_style} placeholder="Form Description" onChange={e=>setCreateForm({...createFormState, description : e.target.value})}></textarea>
                            <br/>
                            <label className="items-center flex gap-2">
                                Public
                                <input 
                                    type="checkbox" value="true"
                                    onChange={e=> setCreateForm({...createFormState, is_public : e.target.value==="true" ? true : false})}
                                />
                            </label>
                            
                        </form>
                    </Modal>
                ) : 
                ""
            }
            <div className="flex justify-between">
                <h1 className="text-5xl font-bold" tabIndex={0}>
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
            
            <ul className="flex flex-wrap justify-center gap-3 p-3">
                
                {
                    state.filter((form)=> form.title.toLowerCase().includes(search?.toLowerCase() || "")).map((form : apiRecieveForm, i:number) => (
                        <li key={i} className="border-2 border-gray-800 rounded-lg min-w-[200px]">
                            <div className="px-6 py-4">
                                <b className="text-xl" tabIndex={0}>
                                    {form.title}
                                </b>
                                <br/>
                                <span tabIndex={0}>
                                    {form.description}
                                </span>
                            </div>
                            <div className="flex">
                                <Link href={'/form/'+form.id} className="flex-1 text-center py-3 border-t-2 border-gray-800 hover:bg-blue-700 transition hover:border-blue-700" title="Edit Form">
                                    <i className="far fa-pen"></i>
                                </Link>
                                <Link href={'/form/'+form.id+'/preview'} className="flex-1 text-center py-3 border-t-2 border-l-2 border-gray-800 hover:bg-blue-700 transition hover:border-blue-700" title="Preview Form">
                                    <i className="far fa-eye"></i>
                                </Link>
                                <Link href={'/form/'+form.id+'/submissions'} className="flex-1 text-center py-3 border-t-2 border-l-2 border-gray-800 hover:bg-blue-700 transition hover:border-blue-700" title="View Submissions">
                                    <i className="far fa-list"></i>
                                </Link>
                                <button onClick={() => deleteForm(form.id)} className="flex-1 text-center border-t-2 border-gray-800 border-l-2 py-3 hover:bg-red-600 transition hover:border-red-600" title="Delete Form">
                                    <i className="far fa-trash"></i>
                                </button>
                            </div>
                        </li>
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
                <li>
                    <button className="border-2 hover:border-blue-700 border-dashed border-gray-800 transition rounded-lg p-4 flex flex-col justify-center items-center" onClick={()=>setCFModal(true)}>
                        <i className="far fa-plus text-3xl"></i><br/>Create New
                    </button>
                </li>
            </ul>
            
        </div>
    )
}

//<Link className="border-2 hover:border-blue-700 border-dashed border-gray-800 transition rounded-lg p-4 flex flex-col justify-center items-center" href={'/form/0'}>
//    <i className="far fa-plus text-3xl"></i><br/>Create New
//</Link>