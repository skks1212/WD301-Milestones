import { formData } from "../components/Form"

export type PreviewState = {
    form : formData,
    answers : string[],
    currentQuestion : number,
    answerField : string[]
}