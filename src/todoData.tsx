import React from "react";

function todoData():{ completed: boolean; name:string, id:number}[]{
    return(
        [
            {
                id:1,
                name:'play games',
                completed:false
            },
            {
                id:2,
                name:'take shower',
                completed:true
            }
        ]
    );
}
export default todoData()