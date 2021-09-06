
const state = {
     rect2 :domEle.i_holder.getBoundingClientRect(),
     rect3 :iframe.getBoundingClientRect(),
     offset :3,
     speed :5,
     irules : {
        maxW: 240,
        minSc: .3
    }
}

initResize();

function initResize(){
    domEle.i_size.innerHTML = `${state.rect3.width}px  ( ${100} %)`
}

const iResize = (e, da) => {
    const pos = da.mousePos(e);

    const istyle = getComputedStyle(iframe);
    const iwidth = istyle.width.split('px').join('') * 1;
    // const scale = new WebKitCSSMatrix(istyle.transform).a;


    if (pos.bX) {
        const totalSpace = state.rect2.width - state.offset * 2;
        domEle.i.style.maxWidth = totalSpace + 'px';

        domEle.iresize[0].style.background = '';

        const s = {
            w: 1,
            s: 1
        }


        if (da.vrLeft) {
            s.w = state.rect3.width - (pos.x - (state.rect2.left + state.offset / 2)) * 2;

        } else {
            s.w = state.rect3.width - ((state.rect2.right - state.offset / 2) - pos.x) * 2;
        }

        if (totalSpace <= iwidth) {
            if (da.vrLeft) {
                s.w = iwidth + Math.sign((da.pX || pos.x) - pos.x) * state.speed;


            } else {
                s.w = iwidth + Math.sign(pos.x - (da.pX || pos.x)) * state.speed;
            }

            s.s = totalSpace / s.w;
            domEle.iresize[0].style.background = 'green';

        }

        totalSpace == iwidth && (domEle.iresize[0].style.background = 'red');

        iframe.style.width = s.w + 'px';
        iframe.style.height = state.rect3.height / s.s + 'px';
        domEle.i.style.width = s.w + 'px';
        iframe.style.transform = `scale(${s.s})`;

        da.pX = pos.x;

        domEle.i_size.innerHTML = `${s.w}px  ( ${Math.round(s.s*100)} %)`;

    }


}


export {
    iResize
}