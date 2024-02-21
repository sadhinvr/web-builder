
function Element(props: { id?:Number,icon: JSX.Element; name: string; click?: any }) {

    return (
        <div className='element' onMouseDown={props.click? props.click(props.id): undefined}>
            <div className='ele_icon'>{props.icon}</div>
            <div className='ele_name'>{props.name}</div>
        </div>
    );
}

export default Element;
