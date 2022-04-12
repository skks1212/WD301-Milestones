import React, { useRef } from "react";
import { formField } from "../types/FormTypes";
import { input_style } from "./Form";

export default function PreviewQuestions(props: {qs : formField, af : any, sf : Function}){
    const currentField = props.qs;
    const answerField = props.af;
    const setAnswerField = props.sf;

    const multiselectRef = useRef<HTMLInputElement>(null);

    let multiOn = false;

    const toggleMulti = () => {
        let classAdd = '';
        !multiOn ?
        classAdd = 'absolute top-[44px] inset-x-0 h-max-[150px] overflow-auto bg-gray-700 flex flex-col' : 
        classAdd = 'absolute top-[44px] inset-x-0 h-[0] overflow-hidden'
        
        multiselectRef.current ?
        multiselectRef.current.className = classAdd :
        console.log('Current is not available')

        multiOn = !multiOn;
    }

    const AddOptionAnswer = (value : string) => {
        let toChange = [];
        !answerField.includes(value) ? 
        toChange = [...answerField, value] : 
        toChange = [...answerField.filter((f : any)=>f !== value)]
        setAnswerField(toChange);
    }

    switch (currentField.type) {
        case "text":
        case "date":
            return (
                <input 
                    type={currentField.type}
                    placeholder="Your Answer..."
                    className="text-2xl bg-gray-800 py-4 px-7 rounded-xl outline-none"
                    value={answerField}
                    onChange={e=>{
                        setAnswerField([e.target.value])
                    }}
                />
            );
        
        case "textarea" : 
            return (
                <textarea 
                    placeholder="Your Answer..." 
                    className="text-2xl bg-gray-800 py-4 px-7 rounded-xl outline-none"
                    value={answerField}
                    onChange={e=>{
                        setAnswerField([e.target.value])
                    }}
                />
            )
        case "select" : 
            switch (currentField.kind) {
                case "options":
                    return (
                        <select
                            value={answerField}
                            onChange={e=>{
                                setAnswerField([e.target.value])
                            }}
                            className={input_style}
                        >
                            {
                                currentField.options.map((option, i)=>{
                                    return (<option value={option} key={i}>
                                        {option}
                                    </option>)
                                })
                            }
                        </select>
                    )
            
                default:
                    return <div></div>
            }
            
        case "radio" : 
            switch (currentField.kind) {
                case "options":
                    return (
                        <>
                            {
                                currentField.options.map((option, i)=>{
                                    return (
                                        <label key={i} className="text-2xl block">
                                            <input 
                                                type={currentField.type}
                                                value={option}
                                                onChange={e=>{
                                                    setAnswerField([e.target.value])
                                                }}
                                                name={"input_"+currentField.id}
                                            />
                                            {option}
                                        </label>
                                    )
                                })
                            }
                        </>
                    )
            
                default:
                    return <div></div>
            }

        case "checkbox" : 
            switch (currentField.kind) {
                case "options":
                    return (
                        <>
                            {
                                currentField.options.map((option, i)=>{
                                    return (
                                        <label key={i} className="text-2xl block">
                                            <input 
                                                type={currentField.type}
                                                value={option}
                                                onChange={e=>{
                                                    AddOptionAnswer(e.target.value)
                                                }}
                                                name={"input_"+currentField.id}
                                            />
                                            {option}
                                        </label>
                                    )
                                })
                            }
                        </>
                    )
                
                default:
                    return <div></div>
            }
        case "multiselect" : 
            switch (currentField.kind) {
                case "options":
                    return (
                        <div className={input_style + ' relative w-[200px] cursor-pointer'}>
                            <div className="flex items-center justify-between" onClick={()=> toggleMulti()}>
                                <span>
                                    {answerField.length > 0 ? answerField.join(', ') : (<span className="text-gray-500">Nothing Selected</span>)}
                                </span>
                                <i className="far fa-chevron-down"/>
                            </div>
                            <div className="absolute top-0 inset-x-0 h-[0] overflow-hidden" ref={multiselectRef}>

                            {
                                currentField.options.map((option, i)=>{
                                    return (
                                        <label key={i} className="text-2xl flex justify-between items-center px-4 py-2 hover:bg-gray-600/40">
                                            <input 
                                                type='checkbox'
                                                value={option}
                                                onChange={e=>{
                                                    AddOptionAnswer(e.target.value)
                                                }}
                                                name={"input_"+currentField.id}
                                            />
                                            {option}
                                        </label>
                                    )
                                })
                            }
                            </div>
                        </div>
                    )
                
                default:
                    return <div></div>
            }
            
        default:
            return (
                <div>

                </div>
            );
    }
    
}