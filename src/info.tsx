import React from "react";
import Header from "./header";
import Item from "./item";
import todoData from "./todoData";


class MyInfo extends React.Component<any>{
    state:{todo:{time: string; completed: boolean; name: string; id: number }[] , loading:boolean , name?:string , time?:string} = {
        todo:todoData,
        loading: true
    }
    constructor() {
        super(null);
        this.handleChange = this.handleChange.bind(this);
        this.load = this.load.bind(this);
        this.formChange = this.formChange.bind(this);
        this.submit = this.submit.bind(this);
        this.date = this.date.bind(this);
    }
    handleChange(id:number){
        let name :string ='';
        let completed:number =0;
        let time :string =''
        for(let i=0 ; true ; i++)
        {
            let obj = this.state.todo[i]
            if(obj.id===id)
            {
                console.log(obj)
                name = obj.name;
                completed = obj.completed ? 0 : 1
                time = obj.time
                break;
            }
        }
        this.updateItem(id ,name , completed ,time);
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

    addItem = (name: string | undefined, completed: number, time: string | undefined) => {
        this.load()
        fetch('http://localhost:3005/todo_item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, completed , time}),
        })
            .then(() => this.fetchData());
    }

    updateItem = (id:number, name:string, completed:number , time:string) => {
        this.load()
        fetch(`http://localhost:3005/todo_item/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, completed ,time}),
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
    formChange(event:any){
        this.state.name=event.target.value
    }

    date(event:any){
        this.state.time = event.target.value
    }

    submit()
    {
        this.addItem(this.state.name , 0, this.state.time)
    }

    calculateTimeDifference(dbTimeStamp: string): {days:number , hours:number , minutes:number} {
        // Get the current timestamp
        const currentTimestamp: Date = new Date();

        // Convert the database timestamp to a Date object
        const dbTimestamp: Date = new Date(dbTimeStamp);

        // Calculate the time difference in milliseconds
        const timeDifference: number =  dbTimestamp.getTime() - currentTimestamp.getTime() ;

        // Calculate the time difference in seconds
        const timeDifferenceInSeconds: number = Math.floor(timeDifference / 1000);

        // Calculate the time difference in minutes
        const timeDifferenceInMinutes: number = Math.floor(timeDifferenceInSeconds / 60);

        // Calculate the time difference in hours
        const timeDifferenceInHours: number = Math.floor(timeDifferenceInMinutes / 60);

        // Calculate the time difference in days
        const timeDifferenceInDays: number = Math.floor(timeDifferenceInHours / 24);

        // Return the time difference as a formatted string
        return {days : timeDifferenceInDays , hours:timeDifferenceInHours % 24 , minutes:timeDifferenceInMinutes % 60}
    }

    sorting(a:JSX.Element ,b:JSX.Element):number
    {
        return (a.props.content.remain.days*100 + a.props.content.remain.hours*10 + a.props.content.remain.minutes)-(b.props.content.remain.days*100 + b.props.content.remain.hours*10 + b.props.content.remain.minutes)
    }
    render() {
        const jsx = this.state.todo.map(element  => <Item key={element.id} content={{name:element.name , completed:element.completed , num:element.id , time:element.time , remain:this.calculateTimeDifference(element.time)}} handleChange={this.handleChange} delete={this.deleteItem}/>)
        jsx.sort((a,b) => this.sorting(a,b))
        return(
            <div>
                <Header/>
                <div className={'content'}>
                    {this.state.loading ? <h2 style={{textAlign:"center"}}>loading...</h2>:jsx}
                    <form id={'form'}>
                        <input className={'input'} type='text' name='name' placeholder={'work name'} onChange={this.formChange}/>
                        <input className={'input'} type={"datetime-local"} onChange={this.date}/>
                        <button className={'button'} onClick={this.submit}>submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default MyInfo;