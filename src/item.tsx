import React from "react";
import ReactDOM from "react-dom";
let count:number = 0;
function Item(props: {content: { name:string }}){
    console.log(props)
    count+=1;
    return(
        <div id={'container'}>
            <p className={'item'}>{count}- </p>
            <input type={'checkbox'}/>
            <p className={'item'} >{props.content.name}</p>
        </div>
    );
}

export default Item;