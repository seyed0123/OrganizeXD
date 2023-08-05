import React from "react";
import Header from "./header";
import Item from "./item";
import todoData from "./todoData";


class MyInfo extends React.Component<any>{
    state = {
        todo:todoData,
        loading: true
    }
    constructor() {
        super(null);
        this.handleChange = this.handleChange.bind(this);
        this.load = this.load.bind(this);
    }
    handleChange(id:number){
        let name :string ='';
        let completed:number =0;
        for(let i=0 ; true ; i++)
        {
            let obj = this.state.todo[i]
            if(obj.id===id)
            {
                name = obj.name;
                completed = obj.completed ? 0 : 1
                break;
            }
        }
        this.updateItem(id ,name , completed );
    }

    load(){
        this.setState({todo:todoData , loading : true})
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        this.load()
        fetch('http://localhost:3005/todo_item')
            .then(response => response.json())
            .then(data => this.setState( { todo: data , loading:false}));
    }

    addItem = (name: string, completed: number) => {
        this.load()
        fetch('http://localhost:3005/todo_item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, completed }),
        })
            .then(() => this.fetchData());
    }

    updateItem = (id:number, name:string, completed:number) => {
        this.load()
        console.log(JSON.stringify({ name, completed }))
        fetch(`http://localhost:3005/todo_item/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, completed }),
        })
            .then(() => this.fetchData());
    }

    deleteItem = (id:number) => {
        this.load()
        fetch(`http://localhost:3005/todo_item/${id}`, {
            method: 'DELETE',
        })
            .then(() => this.fetchData());
    }
    render() {
        const jsx = this.state.todo.map(element  => <Item key={element.id} content={{name:element.name , completed:element.completed , num:element.id}} handleChange={this.handleChange} delete={this.deleteItem}/>)
        return(
            <div>
                <Header/>
                <div className={'content'}>
                    {this.state.loading ? <h2 style={{textAlign:"center"}}>loading...</h2>:jsx}
                </div>
            </div>
        );
    }
}
export default MyInfo;