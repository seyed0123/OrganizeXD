import React , { Component , useState , useEffect } from "react";
import Edit from "./edit";
// function Item(props: {content: { completed: boolean; name:string , num:number},key:number}){
//     console.log(props)
//     return(
//         <div id={'container'}>
//             <p className={'item'}>{props.content.num}- </p>
//             <input type={'checkbox'} checked={props.content.completed}/>
//             <p className={'item'} >{props.content.name}</p>
//         </div>
//     );
// }
interface ItemProps {
    content: { completed: boolean; name: string; num: number , time:string , remain: {days:number , hours:number , minutes:number} };
    key: number;
    handleChange:any;
    delete:any;
    update:any;
}

class Item extends Component<ItemProps> {
    state = {
        isHovered: false,
        showIframe:false,
        time:'',
        name:''
    };
    constructor(props: ItemProps) {
        super(props);
        this.formChange = this.formChange.bind(this);
        this.date = this.date.bind(this);
        this.state.time = this.props.content.time
        this.state.name = this.props.content.name
    }

    formChange(event:any){
        this.state.name=event.target.value
    }

    date(event:any){
        this.state.time = event.target.value
    }
    handleMouseEnter = () => {
        this.setState({ isHovered: true });
    }

    handleMouseLeave = () => {
        this.setState({ isHovered: false });
    }

    isExpire(time:{days:number , hours:number , minutes:number}):boolean{
        if(time.days < 0 || time.hours < 0 ||  time.minutes < 0)
            return true;
        return false;
    }

    componentDidMount() {
        window.addEventListener("message", this.handleFormSubmit, false);
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.handleFormSubmit, false);
    }

    handleFormSubmit = (event: { data: string; }) => {
        if (event.data === 'form-submitted') {
            this.setState({ showIframe: false }); // Close/hide the iframe
        }
    }

    render() {
        const { content } = this.props;
        const { isHovered, showIframe } = this.state;
        const expire = this.isExpire(content.remain)
        let containerStyle:{fontStyle?:string , fontWeight?:string , borderBottom?: string, fontSize?:string} = {};
        let itemStyle:{ textDecoration?:string , opacity?:string , marginRight:string , color?:string} = {marginRight:'5px'}
        if(this.props.content.completed)
        {
            itemStyle.textDecoration='line-through'
            containerStyle.fontSize = 'medium'
            itemStyle.opacity = '50%'
        }else {
            if(content.remain.days<=1)
                itemStyle.color = 'orange';
                containerStyle.borderBottom = '2px dotted orange'
            if(content.remain.days===0) {
                itemStyle.color = 'red'
                containerStyle.borderBottom = '2px dotted red'
                if(content.remain.hours<5) {
                    itemStyle.color = 'blue';
                    containerStyle.borderBottom = '2px dotted blue'
                }
            }
            if (isHovered) {
                containerStyle.fontStyle = 'italic'
                containerStyle.fontWeight = 'bolder'
                containerStyle.borderBottom = '3px solid black'
            }
        }
        if(expire)
        {
            itemStyle.textDecoration='line-through'
            containerStyle.fontSize = 'medium'
            itemStyle.opacity = '50%'
            itemStyle.color = 'gray'
            containerStyle.borderBottom = '4px solid black'
        }
        return (
            <div id={'container'} style={containerStyle} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <p className={'item'}>{content.num}- </p>
                <input type={'checkbox'}  checked={content.completed} onChange={(event) => this.props.handleChange(this.props.content.num)}/>
                <p className={'item'} style={itemStyle}>{content.name}</p>
                <p className={'item'} style={itemStyle}>{content.time}</p>
                <span className={'buttons'}>
                <button className={'button'} onClick={() => this.setState({ showIframe: !this.state.showIframe })}>Edit</button>{/* Show the iframe on button click*/}
                    {showIframe && <span>
                                        <form id={'form_update'}>
                                                    <input className={'input'} type='text' name='name' placeholder={'work'} onChange={this.formChange} />
                                                    <input className={'input'} type={"datetime-local"} onChange={this.date} />
                                                    <button className={'button'} onClick={(event) =>this.props.update(this.props.content.num , this.state.name , this.props.content.completed ,this.state.time)}>submit</button>
                                        </form>
                                    </span>
                    }
                <button className={'button'} onClick={(event) => this.props.delete(this.props.content.num)}>Remove</button>
                </span>
                <p className={'item'} style={itemStyle}>Time remains:<span style={{fontFamily:'Castellar'}}>{content.remain.days} days , {content.remain.hours} hours</span></p>
            </div>
        );
    }
}
export default Item;