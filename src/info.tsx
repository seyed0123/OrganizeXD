import React from "react";
import Header from "./header";
import Item from "./item";
import todoData from "./todoData";


class MyInfo extends React.Component<any>{
    state = {
        todo:todoData
    }
    constructor() {
        super(null);
        this.state.todo = todoData;
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(id:number){
        this.setState((prevState:{todo:{completed: boolean; name: string, id: number}[]})  => {
            const updated = prevState.todo.map((todo_: { completed: boolean; name: string, id: number }) => {
                if (todo_.id === id) {
                    todo_.completed = !todo_.completed;
                }
                return todo_;
            });
           return {
               todo :updated
           };
        })
    }
    componentDidMount() {
        //TODO: get the data
    }

    render() {
        const jsx = this.state.todo.map(element  => <Item key={element.id} content={{name:element.name , completed:element.completed , num:element.id}} handleChange={this.handleChange}/>)
        return(
            <div>
                <Header/>
                <div className={'content'}>
                    {jsx}
                </div>
            </div>
        );
    }
}
export default MyInfo;