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
    content: { completed: boolean; name: string; num: number };
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
    render() {
        const { content } = this.props;
        const { isHovered } = this.state;

        let containerStyle:{fontStyle?:string , fontWeight?:string , borderBottom?: string, fontSize?:string} = {};
        let itemStyle:{ textDecoration?:string , opacity?:string , marginRight:string} = {marginRight:'5px'}
        if(this.props.content.completed)
        {
            itemStyle.textDecoration='line-through'
            containerStyle.fontSize = 'medium'
            itemStyle.opacity = '50%'
        }else {
            if (isHovered) {
                containerStyle.fontStyle = 'italic'
                containerStyle.fontWeight = 'bolder'
                containerStyle.borderBottom = '2px solid black'

            }
        }
        return (
            <div id={'container'} style={containerStyle} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <p className={'item'}>{content.num}- </p>
                <input type={'checkbox'}  checked={content.completed} onChange={(event) => this.props.handleChange(this.props.content.num)}/>
                <p className={'item'} style={itemStyle}>{content.name}</p>
                <span className={'buttons'}>
                <button className={'button'}>Edit</button>
                <button className={'button'} onClick={(event) => this.props.delete(this.props.content.num)}>Remove</button>
                </span>
            </div>
        );
    }
}
export default Item;