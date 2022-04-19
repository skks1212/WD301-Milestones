import React from "react";
import { apiFormFields} from "../types/FormTypes";
import { PreviewState } from "../types/PreviewTypes";
import { input_style } from "./Form";

export default function PreviewQuestions(props: {qs : apiFormFields, previewState : PreviewState, previewDispatch : Function}){
    const currentField = props.qs;
    const previewState = props.previewState;
    const previewDispatch = props.previewDispatch;

    //const multiselectRef = useRef<HTMLInputElement>(null);

    //let multiOn = false;

    /*const toggleMulti = () => {
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
        previewDispatch({type: "add_option_answer", answer : value});
    }*/

    switch (currentField.kind) {
        case "TEXT":
            return (
                <input 
                    type="text"
                    placeholder="Your Answer..."
                    className="text-2xl bg-gray-800 py-4 px-7 rounded-xl outline-none"
                    value={previewState.answerField}
                    onChange={e=>{
                        previewDispatch({type : "set_answer", answer : e.target.value})
                    }}
                />
            );
        case "DROPDOWN" : {
            
            
            return (
                <select
                    value={previewState.answerField[0]}
                    onChange={e=>{
                        previewDispatch({type : "set_answer", answer : e.target.value})
                    }}
                    className={input_style}
                >
                {
                    currentField.options ? currentField.options.map((option, i)=>{
                        return (
                            <option value={option} key={i}>
                                {option}
                            </option>)
                        }) : ""
                }
                </select>
            )
        }
            
        case "RADIO" : {
            return (
                <>
                    {
                        currentField.options ? currentField.options.map((option, i)=>{
                            return (
                                <label key={i} className="text-2xl block">
                                    <input 
                                        type="radio"
                                        value={option}
                                        onChange={e=>{
                                            previewDispatch({type : "set_answer", answer : e.target.value})
                                        }}
                                        name={"input_"+currentField.id}
                                    />
                                    {option}
                                </label>
                            )
                        }) : ""
                    }
                </>
            )
        }
            
        default:
            return (
                <div>
                    Error in loading option
                </div>
            );
    }
    
}