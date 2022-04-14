import { PreviewAction } from "../types/PreviewActionTypes";
import { PreviewState } from "../types/PreviewTypes";

export const previewReducer = (state : PreviewState, action : PreviewAction) => {
    switch (action.type){
        case "progress_quiz" : {
            const inputAnswer = state.answerField.join(', ');
            let progression = state.currentQuestion;
            state.currentQuestion === state.form.formFields.length ? console.log('Form is over') : progression++;
            action.callback?.();

            return {
                ...state,
                currentQuestion : progression,
                answers : [
                    ...state.answers,
                    inputAnswer
                ],
                answerField : []
            }
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
        default : {
            return state;
        }
    }
}