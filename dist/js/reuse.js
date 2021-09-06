const iframe = document.getElementById('iframe');

const domEle = {
    ibody:iframe.contentDocument,
    body:document.body,
    iresize:$('.iresize',true),
    i:$('.i'),
    i_holder:$('.i-holder'),
    i_size:$('.js-isize')
}

function $(q, a = false ,i = false) {
    if(i){

        if (a) {
            return d.ibody.querySelectorAll(q);
        }
        return d.ibody.querySelector(q);
    }

    if (a) {
        return document.querySelectorAll(q)
    }
    return document.querySelector(q);
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