import React from "react";
import{toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const CustomToast = ({closeToast})=>{
    return(
        <div>
            Something went wrong!
            <button onClick={closeToast}>Close</button>
        </div>
    )
}
toast.configure()
function Toast_Notification() {

    const notify=()=>{
        toast('Basic notification!',{
            position:toast.POSITION.TOP_LEFT,
            autoClose:8000
        })
        toast.success('Success',{position:toast.POSITION.TOP_CENTER})
        toast.info('Info',{position:toast.POSITION.TOP_RIGHT})
        toast.warn(<CustomToast/>,{position:toast.POSITION.BOTTOM_LEFT})
        toast.error('Error',{position:toast.POSITION.BOTTOM_RIGHT})
    }
    return (
        <>
            <button onClick={notify}>Notify!</button>
        </>
    );
}

export default Toast_Notification;
