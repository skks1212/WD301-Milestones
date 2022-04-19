import { useEffect, useState } from "react"
import { API } from "../utils/api"
import { ApiSubmissions } from "../types/PreviewTypes"
import { apiFormFields, apiFormWithFields } from "../types/FormTypes"

type ResultType = {
    answers : ApiSubmissions[],
    id? : number,
    form : apiFormWithFields,
    created_date : string
}

export default function Submissions (props : {formID : number}){

    const [state, setState] = useState<ResultType[]>([]);

    const getSubmissions = async (formID : number) => {
        const submissions = await API.submit.get(formID);
        const formFields = await API.form.getFields(formID);
        const heeh = [
            ...submissions.results.map((sub : ResultType, i : number)=>{
                return {
                    ...sub,
                    form : {
                        ...sub.form,
                        formFields : formFields.results
                    }
                }
            })
        ]
        setState(heeh);
    }

    useEffect(()=>{
        getSubmissions(props.formID);
    },[])

    return (
        <div>
            <h1 className="text-5xl font-bold">
                "{state[0]?.form.title}" Submissions
            </h1>
            <br/>
            <div className="flex gap-4 flex-wrap">
                {
                    state.map((sub, i)=>{
                        const time = sub.created_date.split('T');
                        return (
                            <div key={i} className="border-2 border-gray-800 relative overflow-hidden rounded-xl">
                                <div className="p-4">
                                    <div className="text-2xl font-bold">
                                        {i+1}. {sub.id}
                                    </div>
                                    {time[1].split(':')[0]+':'+time[1].split(':')[1]}, {time[0]}
                                </div>
                                <div className="bg-black/60">
                                    {
                                        sub.answers.map((ans, i)=>{
                                            return (
                                                <div className="flex gap-2 px-4 py-2 border-t-2 border-t-gray-800" key={i}>
                                                    <div className="font-bold">
                                                        {sub.form.formFields?.filter((f : apiFormFields)=>f.id === ans.form_field)[0].label} : 
                                                    </div>
                                                    <div>
                                                        {ans.value}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}