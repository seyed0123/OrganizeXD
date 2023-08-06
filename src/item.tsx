import React , { Component } from "react";
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
}

class Item extends Component<ItemProps> {
    state = {
        isHovered: false
    };
    constructor(props: ItemProps) {
        super(props);

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
    render() {
        const { content } = this.props;
        const { isHovered } = this.state;
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
                <button className={'button'}>Edit</button>
                <button className={'button'} onClick={(event) => this.props.delete(this.props.content.num)}>Remove</button>
                <p className={'item'}>Time remains:<span style={{fontFamily:'Castellar'}}>{content.remain.days} days , {content.remain.hours} hours</span></p>
                </span>
            </div>
        );
    }
}
export default Item;