import { formData } from "../components/Form"
import { apiForm, apiFormWithFields } from "./FormTypes"

export type PreviewState = {
    form : apiFormWithFields,
    answers : string[],
    currentQuestion : number,
    answerField : string[]
}

export type ApiSubmissions = {
    form_field : number,
    value : string
}