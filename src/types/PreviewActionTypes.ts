type ProgressQuizAction = {
    type : "progress_quiz",
    callback? : () => void 
};

type SetQuizFieldAction = {
    type : "set_quiz_field",
    fieldID : number
};

type ResetQuizAction = {
    type : "reset_quiz"
};

type AddQuizOptionAnswer = {
    type : "add_option_answer",
    answer : string
};

type SetQuizAnswer = {
    type : "set_answer",
    answer : string
}

export type PreviewAction = 
    ProgressQuizAction
    | ResetQuizAction
    | SetQuizFieldAction
    | AddQuizOptionAnswer
    | SetQuizAnswer