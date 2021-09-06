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
        dragAction.vrLeft = false;
        e.target.classList.contains('js-iresize_left') && (dragAction.vrLeft = true);
        dragAction.on('mousemove', mousemove)
    }

});


function mousemove(e) {
    // console.log('moved');
    const pos = dragAction.mousePos(e);
    const rules = {
        maxW: 240,
        minSc:.3
    }

    const istyle = getComputedStyle(iframe);
    const iwidth = istyle.width.split('px').join('')*1;
    const scale = new WebKitCSSMatrix(istyle.transform).a;


    if (pos.bX) {
        const rect = domEle.i.getBoundingClientRect();
        const rect2 = domEle.i_holder.getBoundingClientRect();
        const rect3 = iframe.getBoundingClientRect();
        const offset = 3;
        const speed = 5;
        

        const totalSpace = rect2.width - offset * 2;
        domEle.i.style.maxWidth = totalSpace + 'px';

        !dragAction.initheight && (dragAction.initheight = rect3.height);
        !dragAction.initwidth && (dragAction.initwidth = rect3.width);

        domEle.iresize[0].style.background= '';

        const s = {
            w: 1,
            s: 1
        }


        if (dragAction.vrLeft) {
            s.w = dragAction.initwidth - (pos.x - (rect2.left+offset/2))*2;

        } else {
            s.w = dragAction.initwidth - ((rect2.right-offset/2) - pos.x)*2;
        }

        if(totalSpace <= iwidth){
            if (dragAction.vrLeft) {
                s.w = iwidth + Math.sign((dragAction.pX || pos.x) - pos.x)*speed;
            

            } else {
                s.w = iwidth + Math.sign(pos.x - (dragAction.pX || pos.x))*speed;
            }

            s.s= totalSpace/s.w;
            domEle.iresize[0].style.background= 'green';

        }

        totalSpace == iwidth && (domEle.iresize[0].style.background= 'red');
        
        iframe.style.width = s.w + 'px';
        iframe.style.height = dragAction.initheight/s.s + 'px';
        domEle.i.style.width = s.w + 'px';
        iframe.style.transform = `scale(${s.s})`;

        dragAction.pX= pos.x;

        domEle.i_size.innerHTML = `${s.w}px  ( ${Math.round(s.s*100)} %)`

    }


}

dragAction.on('mouseup', e => {
    iframe.style.pointerEvents = '';
    dragAction.removeEvent('mousemove', mousemove);
})