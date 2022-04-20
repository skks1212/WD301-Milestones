import { PreviewAction } from "../types/PreviewActionTypes";
import { PreviewState } from "../types/PreviewTypes";
import { API } from "../utils/api";

const submitForm = async (state : PreviewState) => {
    const submission = state.answers.map((field, i)=>{
        return {
            value : field,
            form_field : state.form.formFields[i].id
        }
    });
    const postSubmission = await API.submit.submit(state.form.id? state.form.id : 0, submission);
    if(postSubmission){
        console.log('Form Submitted');
    }
}

export const previewReducer = (state : PreviewState, action : PreviewAction) => {
    switch (action.type){
        case "progress_quiz" : {
            const inputAnswer = state.answerField.join(', ');
            let progression = state.currentQuestion;

            state.currentQuestion === state.form.formFields.length ? console.log('Form is over') : progression++;
            
            action.callback?.();

            const newState = {
                ...state,
                currentQuestion : progression,
                answers : [
                    ...state.answers,
                    inputAnswer
                ],
                answerField : state.form.formFields[progression]?.kind === "TEXT" ? [] : [state.form.formFields[progression]?.options[0]]
            }

            if(state.currentQuestion === state.form.formFields.length - 1){
                submitForm(newState);
            }

            return newState;
        }
        case "set_quiz_field" : {
            return {
                ...state,
                currentQuestion : action.fieldID
            }
        }
        case "reset_quiz" : {
            return {
                ...state,
                answers : [],
                currentQuestion : -1,
                answerField : []
            }
        }
        case "add_option_answer" : {
            let toChange = [];
            !state.answerField.includes(action.answer) ? 
            toChange = [...state.answerField, action.answer] : 
            toChange = [...state.answerField.filter((f)=>f !== action.answer)]

            return {
                ...state,
                answerField : toChange
            }
        }
        case "set_answer" : {
            return {
                ...state,
                answerField : [action.answer]
            }
        }
        case "set_form" : {
            return {
                ...state,
                form : {...action.form, formFields : []}
            }
        }
        case "set_form_fields" : {
            const sortedFields = action.formFields.sort((a, b) => {
                return a.id && b.id ? 
                a.id - b.id : 
                0
            });
            const metaSort = action.formFields[0].meta;
            const sortOrder = !metaSort ? sortedFields.map(f=>f.id ? f.id : 0) : metaSort;
            const finalSortedFields = sortOrder.map((f)=> action.formFields.filter(x=>x.id === f)[0]);
            return {
                ...state,
                form : {
                    ...state.form,
                    formFields : finalSortedFields
                }
            }
        }
        default : {
            return state;
        }
    }
}