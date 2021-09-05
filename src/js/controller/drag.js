import Action from "../models/Action"

const dragAction = new Action(domEle.body);
dragAction.on('mousedown',e=>{
    console.log('mousedown');
    const arr = [...domEle.iresize];
    if(arr.includes(e.target)){
        e.preventDefault();
        e.stopPropagation();
        dragAction.on('mousemove',mousemove)
    }

});

function mousemove(e){
    console.log('moved');
    const pos = dragAction.mousePos(e);
    const rect = domEle.i.getBoundingClientRect().width;
    const rect2 = domEle.i_holder.getBoundingClientRect().width;

    let iwidth  = rect.width+pos.rX;
    if(iwidth){
        
    }

    domEle.i.style.width=rect.width+pos.rX;
    let scale = domEle.i.getBoundingClientRect().width;
    if(scale)
    iframe.style.transform= `scale(${i})`

    
}

dragAction.on('mouseup',e=>{

    dragAction.removeEvent('mousemove',mousemove)
    // if(arr.includes(e.target)){
    //     e.preventDefault();
    //     e.stopPropagation();
    //     dragAction.on('mousemove',()=>{
    //         console.log('mousemove')
    //     })
    // }

})
