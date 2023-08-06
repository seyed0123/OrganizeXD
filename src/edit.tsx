import React from "react";
import ReactDOM from "react-dom";
let data:{func?:any , date:string , name :string}={
    date:'',
    name:'',
}
function date(event:any)
{
    data.date = event.target.value
}

function formChange(event:any)
{
    data.name = event.target.value
}

function send(func:any){
    console.log(data)
    data.func({date:data.date , name:data.name});
}
function Edit(props:{content:{name:string , sub:any}})
{
    data.name = props.content.name;
    data.func = props.content.sub;
    return(
        <span>
            <form id={'form_update'}>
                        <input className={'input'} type='text' name='name' placeholder={'work'} onChange={formChange}/>
                        <input className={'input'} type={"datetime-local"} onChange={date}/>
                        <button className={'button'} onClick={send}>submit</button>
            </form>
        </span>
    )
}

export default Edit