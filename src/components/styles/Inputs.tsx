function Inputs(props: { name1: String; name2: String }) {
    return (
        <div className='style_row-2 col-1'>
            <div className=''>
                <span>{props.name1}</span>
            </div>

            <div className='inp_wrapper'>
                <input type='text' name='' id='' className='inp' />
                <div className='unit'>px</div>
            </div>
            <div className=' '>
                <span>{props.name2}</span>
            </div>
            <div className='inp_wrapper'>
                <input type='text' name='' id='' className='inp' />
                <div className='unit'>px</div>
            </div>
        </div>
    );
}

export default Inputs;
