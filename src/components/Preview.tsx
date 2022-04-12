import React, { useRef, useState } from "react";
import { getLocalForms, saveLocalForms } from "./Form"
import PreviewQuestions from "./PreviewQuestions";

export default function Preview(props : {formID : number}){

    const [formState, setFormState] = useState(() => getLocalForms());
    const thisForm = formState.filter((form)=> form.id === props.formID)[0];

    const [quizState, setQuizState] = useState(-1);
    const [quizAnswers, setQuizAnswer] = useState<Array<string>>([]);
    const [answerField, setAnswerField] = useState([]);

    const inputRef = useRef<HTMLInputElement>(null);

    let titleSize;
    quizState < 0 ? titleSize = "text-5xl font-bold" : titleSize = "text-xl text-gray-400";
    let titleStyles = `${titleSize} transition-all`;

    const currentField = thisForm.formFields[quizState];

    let buttonText;
    quizState + 1 === thisForm.formFields.length ? buttonText = 'Finish' : buttonText = 'Next Question';

    const resetQuiz = () => {
        setQuizState(-1);
        setQuizAnswer([]);
    }

    const progressQuiz = () => {
        const inputAnswer = answerField.join(', ');
        console.log(answerField);
        setQuizAnswer([
            ...quizAnswers,
            inputAnswer
        ])
        quizState === thisForm.formFields.length ? console.log('Form is over') : setQuizState(quizState + 1) ;
        setAnswerField([]);
        
    }
    
    if(thisForm.formFields.length === 0){
        return (
            <div>
                Your form does not have any questions. Add a question to preview your form!
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center">
            <div className="text-center">
                <div className=" inline-flex gap-2 mb-6 text-xs">
                    {
                        thisForm.formFields.map((field, i)=> {
                            let tColor;
                            field.id === currentField?.id ? tColor = "text-blue-800" : tColor = "text-gray-700";
                            return (
                                <i className={"fas fa-circle "+tColor} key={i}></i>
                            );
                        })
                    }
                </div>
                <div className={titleStyles}>
                    {thisForm.title}
                </div>
                {
                    quizState < 0 || quizAnswers.length === thisForm.formFields.length ? (
                        <>
                            {
                                quizAnswers.length === thisForm.formFields.length ? 
                                (
                                    <div className="mt-6">
                                        Thank you for participating!
                                        <br/>
                                        Here are your results :
                                        <br/>
                                        <br/>
                                        {
                                            quizAnswers.map((quiz, i)=>{
                                                return (
                                                    <div key={i} className="mb-3">
                                                        Q{i+1} : {thisForm.formFields[i].label}<br/>
                                                        A{i+1} : {quiz} 
                                                    </div>
                                                );
                                            })
                                        }
                                        <br/>
                                        <br/>
                                        <br/>
                                        <button className="bg-blue-700 rounded-xl px-6 py-3 font-bold hover:bg-blue-800 transition hover:rounded-xl" onClick={()=>resetQuiz()}>
                                            Give it another try! &nbsp; <i className="fal fa-chevron-right"></i>
                                        </button>
                                    </div>
                                )
                                :
                                (
                                    <>
                                        <div className="mt-6 mb-36 text-gray-300">
                                            Hello there! Thanks for filling <b>{thisForm.title}</b><br/>
                                            All you have to do is fill {thisForm.formFields.length} questions. It will take you around {thisForm.formFields.length * 30 / 60} minutes to finish this form.
                                        </div>
                                        <button className="bg-blue-700 rounded-xl px-6 py-3 font-bold hover:bg-blue-800 transition hover:rounded-xl" onClick={()=>setQuizState(0)}>
                                            Lets start! &nbsp; <i className="fal fa-chevron-right"></i>
                                        </button>
                                    </>
                                )
                            }
                            
                        </>
                    ) : (
                        <>
                            <div className="text-4xl font-bold">
                                {currentField.label}
                            </div>
                            <div className="mt-12">
                                {
                                    <PreviewQuestions qs={currentField} af={answerField} sf = {setAnswerField}/>
                                }
                                <br/>
                                <br/>
                                <button className="bg-blue-700 rounded-xl px-6 py-3 font-bold hover:bg-blue-800 transition hover:rounded-xl" onClick={()=>progressQuiz()}>
                                    {buttonText} &nbsp; <i className="fal fa-chevron-right"></i>
                                </button>
                            </div>
                        </>
                        
                    )
                }
                
            </div>
        </div>
    )
}