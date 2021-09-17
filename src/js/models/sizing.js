const state = {
    rect2: domEle.i_holder.getBoundingClientRect(),
    offset: 3,
    speed: 5,
    irules: {
        maxW: 240,
        minSc: .3
    }

}

onResize();

function onResize(){
    domEle.i.style.width = '';
    iframe.style.width = '';
    // domEle.i.style.width = '';
    
    state.rect3= iframe.getBoundingClientRect();
    state.rect2= domEle.i_holder.getBoundingClientRect();
    initResize();
    state.rect3= iframe.getBoundingClientRect();
}

function initResize() {
    domEle.i.style.width = `${domEle.i_holder.getBoundingClientRect().width-6}px`;
    const s ={w:domEle.i_holder.getBoundingClientRect().width-6};
    s.s = 1;
    state.totalSpace = state.rect2.width - state.offset * 2;
    s.w >= state.totalSpace && (s.s = state.totalSpace / s.w);
    viewIresize(s)
}

const iResize = (e, da) => {
    const pos = da.mousePos(e);

    const istyle = getComputedStyle(iframe);
    const iwidth = istyle.width.split('px').join('') * 1;
    // const scale = new WebKitCSSMatrix(istyle.transform).a;


    if (pos.bX) {
        domEle.i.style.maxWidth = state.totalSpace + 'px';

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

        if (state.totalSpace <= iwidth) {
            if (da.vrLeft) {
                s.w = iwidth + Math.sign((da.pX || pos.x) - pos.x) * state.speed;


            } else {
                s.w = iwidth + Math.sign(pos.x - (da.pX || pos.x)) * state.speed;
            }

            

        }

        state.totalSpace == iwidth && (domEle.iresize[0].style.background = 'red');

        processIresize(s);

        da.pX = pos.x;


    }


}

function breakPoints(e, br = "xlg") {
    const rules = {
        sm: {
            min: 240,
            max: 480,
            d: 'max'
        },
        md: {
            min: 481,
            max: 768,
            d: 'max'
        },
        lg: {
            min: 769,
            max: 922,
            d: 'min'
        },
        xlg: {
            min: 923,
            max: 1280,
            d: 'min'
        }
    }

    btnActive(e, 'activeBreakPoint', {}, false)

    processIresize({
        w: rules[br][rules[br].d],
        s: 1
    });
    

}

function processIresize(s) {
    s.w = Math.round(s.w);
    s.w >= state.totalSpace && (s.s = state.totalSpace / s.w);

    viewIresize(s);
}

function viewIresize(s) {
    iframe.style.width = s.w + 'px';
    iframe.style.height = state.rect3.height / s.s + 'px';
    domEle.i.style.width = s.w + 'px';
    iframe.style.transform = `scale(${s.s})`;
    domEle.i_size.innerHTML = `${Math.round(s.w)}px  ( ${Math.round(s.s*100)} %)`;
}


export {
    iResize,breakPoints,onResize
}