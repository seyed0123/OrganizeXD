import ReactDOM from "react-dom";
import React from "react";
import Header from "./header";
import Item from "./item";
function MyInfo(){
    return (
        <div>
            <Header/>
            <div className={'content'}>
                <Item content={{name:'shower'}}/>
                <Item content={{name:'play game'}}/>
            </div>
        </div>
    );
}

export default MyInfo;