import { Link } from "raviger";
import React, {useState, useEffect, useRef, useReducer} from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { reducer } from "../actions/FormActions";
import { apiFormFields, apiFormWithFields, fieldTypesDisplay, formField } from "../types/FormTypes";
import { API } from "../utils/api";
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

export interface formData {
    id : number,
    title : string,
    formFields : formField[];
}

export const getLocalForms: () => formData[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms");
    return savedFormsJSON 
        ? JSON.parse(savedFormsJSON) 
        : [];
}

export const saveLocalForms = (localForms: formData[]) => {
    localStorage.setItem("savedForms", JSON.stringify(localForms));
}



export interface newField {
    value : string,
    type : string,
}

export interface optionsField {
    id : number,
    value : string
}

const defaultNewField : newField= {
    value : "",
    type : "text"
}

const defaultOptions : optionsField[] = [];

export const input_style = 'border-2 bg-gray-800/70 border-gray-800 rounded-xl py-2 px-3 mt-0 w-full block focus:bg-gray-800 outline-0 focus:border-blue-700 transition';

export function Form( props: {formState : number}){

    const defaultForm : apiFormWithFields = {
        title : "Loading",
        formFields : [],
    }

    const [state, dispatch] = useReducer(reducer, defaultForm);
    const [orderState, setOrderState] = useState<number[]>([]);

    const reorderFields = (result : DropResult) => {
        const dropSource = result.source.index ;
        const dropDestination = result.destination?.index;
        let oState = orderState;
        [ oState[dropDestination?dropDestination:0],  oState[dropSource]] = [ oState[dropSource],  oState[dropDestination?dropDestination:0]];
        console.log(oState);
        setOrderState(oState);
        dispatch({type : "set_order", order : oState});
    }

    const [newField, setNewField] = useState(defaultNewField);
    const [newOption, setNewOption] = useState(defaultOptions);

    const titleRef = useRef<HTMLInputElement>(null);

    const saveFormData = async (currentState: apiFormWithFields) => {
        if(currentState !== defaultForm){
            const saved = await API.form.saveForm(currentState);
            const savedFields = await currentState.formFields.map(async (field : apiFormFields)=>{
                return await API.form.saveField(state.id ? state.id : 0 , field);
            })
            if (saved && savedFields){
                console.log("Saved")
            }
        }
    }
    
    const getForm = async (formID : number) => {
        const form = await API.form.get(formID);
        const formFields = await API.form.getFields(formID);
        dispatch({type : "set_form", form : form});
        dispatch({type : "set_form_fields", formFields : formFields.results, orderState : orderState, callback : setOrderState});
    }

    const deleteField = async (field : apiFormFields) => {
        dispatch({type: "remove_field", field : field, setOrder: setOrderState, order: orderState});
        const deleteFields = await API.form.deleteField(state.id ? state.id : 0, field);
        if(deleteFields){
            console.log('Deleted Fields');
        }
        
    }

    useEffect( () => {
        console.log("%cComponent Mounted", "color:grey;");
        document.title = "Form Editor";
        titleRef.current?.focus();
        getForm(props.formState);
        return () => {
            document.title = "Formify";
        }
    },[]); 

    useEffect(() => {
        let timeout = setTimeout(() => {
            console.log('%cForm Saved', "color:grey;");
            document.title = "Form Editor : " + state.title;
            saveFormData(state);
        }, 500);
        return () => {
            clearTimeout(timeout);
        }
    }, [state]);

    const resetOptionField = (field : apiFormFields) => {
        setNewOption([
            ...newOption.map(option=>{
                if(option.id === field.id){
                    return {
                        ...option,
                        value : ""
                    }
                }
                return option;
            })
        ]);
    }

    const setUpOptions = () => {
        setNewOption([
            ...newOption,
            {
                id : state.formFields.length,
                value : ""
            }
        ]);
    }

    const addOption = (field : apiFormFields, option : optionsField[]) => {
        dispatch({type : "add_option", field : field, optionState : option, callback : () => resetOptionField(field)})
    }

    const postFormFields = async (formField : newField) => {
        console.log(formField);
        let addObject : apiFormFields = {
            kind : formField.type === "TEXT" || formField.type === "DROPDOWN" || formField.type === "RADIO" || formField.type === "GENERIC" ? formField.type : "TEXT" ,
            id : state.formFields.length,
            label : formField.value,
            options : formField.type !== "TEXT" ? [] : null
        };
        const posted = await API.form.addField(state.id ? state.id : 0, addObject );
        dispatch({type:"add_field", field: posted, callback : () => setNewField(defaultNewField), setUpOptions : setUpOptions, order : orderState, setOrder : setOrderState})
    }

    const toolbar_button = "inline-flex w-[40px] bg-gray-800/70 rounded-xl h-[40px] justify-center items-center transition hover:bg-gray-800/40";
    const toolbar_button_extendable = "inline-flex bg-gray-800/70 rounded-xl h-[40px] justify-center items-center transition hover:bg-gray-800/40 px-4";
    
    const [copied, setCopied] = useState(false);
    const onCopy = () => {
        setCopied(true);
        setTimeout(() => {
        setCopied(false);
        }, 1000);
    };

    return (
        <div className="mt-4">
            <div className="flex justify-between items-center">
                <input 
                    type="text"
                    className="text-3xl font-bold w-[300px] bg-transparent outline-0 border-b-[5px] border-b-gray-700 mb-10 py-3 transition focus:border-b-gray-200"
                    value={state.title}
                    onChange={e=>{
                        dispatch({type:"update_title", title: e.target.value});
                    }}
                    placeholder="Form Title"
                    ref={titleRef}
                />
                <div className="flex gap-3">
                    <Link href={`/form/${state.id}/preview`} className={toolbar_button_extendable} title="Preview">
                        <i className="far fa-eye"></i> &nbsp; Preview
                    </Link>
                    <Link href={`/form/${state.id}/submissions`} className={toolbar_button_extendable} title="Submissions">
                        <i className="far fa-list"></i> &nbsp; Submissions
                    </Link>
                    <CopyToClipboard text={`localhost:3000/form/${props.formState}/preview`} onCopy={onCopy}>
                            <button className={toolbar_button + ' relative'} title="Copy Link">
                                <i className="far fa-copy"></i>
                                {copied && <span className="absolute top-[-50px] left-0 p-2 bg-blue-700/40 rounded">Copied!</span>}

                            </button>
                    </CopyToClipboard>
                    <button className={toolbar_button} onClick={()=>dispatch({type:"empty_fields"})} title="Remove all fields">
                        <i className="far fa-empty-set"></i>
                    </button>
                    <Link className={toolbar_button} href="/home" title="Close Form">
                        <i className="far fa-times"></i>
                    </Link>
                </div>
            </div>
            <DragDropContext onDragEnd={(e)=>{reorderFields(e)}}>
                <Droppable droppableId="formfields">
                    {(provided) => (
                        <ul className="formfields" {...provided.droppableProps} ref={provided.innerRef}>
                        {orderState.map((fieldID, i) => {
                            const field = state.formFields.filter((f : apiFormFields)=>f.id === fieldID)[0];
                            return (
                            <Draggable key = {i} draggableId={`${i}`} index={i}>
                                {(provided)=>(
                                <li  className="flex items-center justify-center gap-2 mb-2" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <div className="w-full pl-1">
                                        <span className="text-gray-400">
                                            {field.kind}
                                        </span>
                                        <br/>
                                        <input 
                                            type="text" 
                                            name={field.label} 
                                            id={"input_"+field.label} 
                                            className={input_style+' mt-1'} 
                                            placeholder="Field Name"
                                            value={field.label}
                                            onChange={e=>{
                                                dispatch({type : "update_field", element: e, field : field});
                                            }}
                                        />
                                        {
                                            ["DROPDOWN", "RADIO"].includes(field.kind) ?
                                            (
                                                <div className="ml-4 border-l-2 border-gray-800 pl-4 mt-3">
                                                    <small className="text-gray-400">
                                                        Options
                                                    </small>
                                                    <br/>
                                                    {
                                                        field.options ? field.options.map((option : string,x:number)=> (
                                                            <div className="flex justify-between align-center gap-2" key={x}>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Option Name"
                                                                    value={option}
                                                                    className={input_style+' mb-2'}
                                                                    onChange={e=>{
                                                                        dispatch({type : "update_option", element: e, field: field, option: x})
                                                                    }}
                                                                />
                                                                <button className={toolbar_button+` hover:bg-red-600`} onClick={_=>dispatch({type: "delete_option", field : field, optionNumber : x})} title="Remove Option">
                                                                    <i className="far fa-minus" />
                                                                </button>
                                                            </div>
                                                        )) : 
                                                        ""
                                                    }
                                                    <div className="flex align-center justify-center gap-2 mt-2">
                                                        <input 
                                                            type="text"
                                                            placeholder="Add Option"
                                                            className={input_style}
                                                            value = {newOption.filter(f=>f.id === field.id).map(fe=>fe.value)}
                                                            onChange={e=>{
                                                                setNewOption([
                                                                    ...newOption.filter(f=>f.id !== field.id),
                                                                    {
                                                                        id : field.id ? field.id : 0,
                                                                        value : e.target.value
                                                                    }
                                                                ]);
                                                            }}
                                                        />
                                                        <button className={toolbar_button} onClick={()=>addOption(field, newOption)} title="Add Option">
                                                            <i className="far fa-grid-2-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) :
                                            (
                                                <>
                                                </>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <button className={toolbar_button+` hover:bg-red-600`} onClick={_=>deleteField(field)} title="Delete Field">
                                            <i className="far fa-trash" />
                                        </button>
                                    </div>
                                    
                                </li>
                                )}
                            </Draggable>
                        )})}
                        {provided.placeholder}
                        </ul>
                    )}
                    
                    
                </Droppable>
            </DragDropContext>
            
            <div className="w-full flex items-center justify-center mt-4 pt-4 border-dashed border-t-2 pl-1 border-t-gray-800 gap-2">
                <input 
                    type="text"
                    className={input_style}
                    value={newField.value}
                    onChange={e=>{
                        setNewField({...newField, value: e.target.value});
                    }}
                    placeholder="Add Field"
                />
                <div>
                    <select className="border-2 bg-gray-800 border-gray-800 rounded-lg p-2" value={newField.type} onChange={e=>setNewField({...newField, type: e.target.value})}>
                        {
                            fieldTypesDisplay.map((type, i) => (
                                <option value={type.type} key={i}>
                                    {type.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <button className="cursor-pointer p-2 ml-0 bg-blue-700 hover:bg-blue-800 transition text-white rounded-lg w-[150px]" onClick={()=>postFormFields(newField)}>
                        <i className="far fa-plus" /> &nbsp; Add Field
                    </button>
                </div>
            </div>
            <div className="pt-4 text-center">
                
            </div>
        </div>
    )
}