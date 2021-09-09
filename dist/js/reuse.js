const iframe = document.getElementById('iframe');

const domEle = {
    idoc:iframe.contentDocument,
    iresize:$('.iresize',true),
    i:$('.i'),
    i_holder:$('.i-holder'),
    i_size:$('.js-isize'),
    btns:$('.btn',true),
    popBody:$('.pops'),
    popup:$('.js-lpop'),
    pop_box:$('.pop-box'),
    pop_box_body:$('.pop-box-body'),
    activatePopBox:$('.js-activePopBox')
}

function $(q, a = false ,i = false) {
    if(i){

        if (a) {
            return d.idoc.querySelectorAll(q);
        }
        return d.idoc.querySelector(q);
    }

    if (a) {
        return document.querySelectorAll(q)
    }
    return document.querySelector(q);
}

function btnActive(e, clsName, funs = {}, toggle = true) {
    const eCls = e.target.classList;
    clsName = 'js-' + clsName;
    const ele = $("." + clsName);

    if (eCls.contains(clsName)) {
        toggle && eCls.remove(clsName);
        funs.containsFun && funs.containsFun();
    } else {
        if (ele) {
            ele.classList.remove(clsName);
        }

        eCls.add(clsName);
        funs.elsefun && funs.elsefun();
    }

    funs.efun && funs.efun();
}


// function setStyleData(e, box, bor = false, bg = false) {
//     box.setAttribute('focusable', "false");
//     box.style = 'position:absolute;pointer-events: none;';
//     let style = e.currentStyle || window.getComputedStyle(e),
//         width = e.offsetWidth,
//         height = e.offsetHeight,
//         margin1 = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
//         margin2 = parseFloat(style.marginTop) + parseFloat(style.marginBottom),
//         padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
//         border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

//     // change style
//     box.style.top = e.offsetTop - parseFloat(style.marginTop) + 'px';
//     box.style.left = e.offsetLeft - parseFloat(style.marginLeft) + 'px';

//     box.style.width = width + margin1 + 'px';
//     box.style.height = height + margin2 + 'px';
//     if (e.dataset.ele && e.dataset.ele === 'body') {
//         box.style.top = e.offsetTop + 'px';
//         box.style.left = e.offsetLeft + 'px';
//     }

//     bor ? box.style.border = bor : box.style.background = bg;
// }