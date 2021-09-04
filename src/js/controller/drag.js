import Action from "../models/Action"

const dragAction = new Action(domEle.body);
dragAction.on('mousedown',e=>{
    console.log('mousedown');
    const arr = [domEle.iresize];
    if(arr.includes(e.target)){
        e.preventDefault();
        e.stopPropagation();
        dragAction.on('mousemove',mousemove)
    }

});

function mousemove(e){
    console.log('moved');
    const pos = dragAction.mousePos(e);
    


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
