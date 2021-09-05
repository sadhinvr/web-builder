import Action from "../models/Action"

const dragAction = new Action(domEle.body);
dragAction.pX = 0;
dragAction.on('mousedown', e => {
    console.log('mousedown');
    const arr = [...domEle.iresize];
    iframe.style.pointerEvents = 'none';
    if (arr.includes(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        dragAction.on('mousemove', mousemove)
    }

});

function mousemove(e) {
    console.log('moved');
    const pos = dragAction.mousePos(e);
    if (pos.bX) {
        const rect = domEle.i.getBoundingClientRect();
        const rect2 = domEle.i_holder.getBoundingClientRect();
        // const rect3 = domEle.iresize.getBoundingClientRect();

        let scale = 1;
        let iwidth;
        dragAction.pX < 0 ? iwidth = rect.width - (dragAction.pX-pos.rX)*2 : iwidth = rect.width + pos.rX;
        console.log(iwidth, pos.rX,dragAction.pX);

        if ((rect2.width - 6) <= iwidth) {
            scale = rect.width / iwidth;
            iframe.style.width = iwidth + 'px';
        } else {
            iframe.style.width = '100%';
            domEle.i.style.width = iwidth + 'px';
        }

        iframe.style.transform = `scale(${scale})`;
        dragAction.pX = pos.rX;
    }


}

dragAction.on('mouseup', e => {
    iframe.style.pointerEvents = '';
    dragAction.removeEvent('mousemove', mousemove);

    // if(arr.includes(e.target)){
    //     e.preventDefault();
    //     e.stopPropagation();
    //     dragAction.on('mousemove',()=>{
    //         console.log('mousemove')
    //     })
    // }

})