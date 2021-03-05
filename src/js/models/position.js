import {
    $,
    elements
} from '../reuse';

import {
    iwindow,
    idocument
} from './iframe';


//create boxes
const curPos = idocument.createElement('div');
curPos.id = 'curPos';
curPos.style = 'position:absolute;pointer-events: none;';

//mouseover
const mouseOver = (e) => {
    idocument.body.appendChild(curPos);

    const rect = e.target.getBoundingClientRect();
    const offset = rect.height / 4;
    const top = rect.top;
    const bottom = rect.top + rect.height;

    if (e.clientY >= top + offset && e.clientY <= bottom - offset) {
        // console.log(e.target, e.clientY, top, e.clientY, bottom)
        curPosStyle(e, rect, offset);
    }

    // if(e.clientY >= top - offset || )

    return e.target;
}

function curPosStyle(e, r, o) {
    curPos.style.top = e.target.offsetTop + o + 'px';
    curPos.style.left = e.target.offsetLeft + 'px';
    curPos.style.background = '#1e90ff8a';
    curPos.style.width = (r.width) + 'px'; //(r.top+r.width-o)-(r.top + o)
    curPos.style.height = (r.top + r.height - o) - (r.top + o) + 'px';
}






export {
    mouseOver
};