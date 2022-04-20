export default function Modal(props : 
    {
        children : React.ReactNode, 
        title : string,
        closeCB : React.Dispatch<React.SetStateAction<boolean>>,
        actionCB: ()=> void,
        actionName : string
    }){
    return (
        <div className="inset-0 bg-black/70 fixed backdrop-blur flex items-center justify-center">
            <div className="w-[500px] bg-gray-900 border-2 border-gray-800 rounded-xl flex-col justify-between">
                <div>
                    <div className="font-bold text-2xl p-4 border-b-2 border-gray-800" tabIndex={0}>
                        {props.title}
                    </div>
                    <div className="p-4 " tabIndex={0}>
                        {props.children}
                    </div>
                </div>
                <div className="gap-4 flex items-center justify-end p-4 border-t-2 border-gray-800">
                    <button className="rounded-lg bg-gray-800/60 px-4 py-2 border-2 border-gray-800 hover:bg-gray-800 transition" onClick={() => props.closeCB(false)} title="Cancel">
                        Cancel
                    </button>
                    <button className="rounded-lg bg-blue-700 px-4 py-2 border-2 border-blue-800 hover:bg-blue-800 transition" onClick={()=> props.actionCB()} title={props.actionName}>
                        {props.actionName}
                    </button>
                </div>
            </div>
            
        </div>
    )
}