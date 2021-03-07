import {
    $,
    elements
} from '../reuse';
import {
    on
} from '../views/iframeView';

import {
    iwindow,
    idocument
} from './iframe';

//variable
let pos;

//create boxes
const curPos = idocument.createElement('div');
curPos.id = 'curPos';
curPos.style = 'position:absolute;pointer-events: none;';
const cantake = {
    body:['all'],
    div: ['all'],
    section: ['all', ['section']],
    heading: ['none'],
    paragraph: ['none'],
    img: ['none']
}

//mouseover
const mouseOver = (e, childEle) => {
    if (on) {
        // console.log(childEle)
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

        if (childEle) {
            // variable
            const parentEle=cantake[e.target.dataset.ele]
            // all
            if (e.target.dataset.ele && parentEle.includes('all')) {
                // console.log('all')
                all(childEle,e.target,parentEle);
            }

            //none
            if (e.target.dataset.ele && parentEle.includes('none')) {
                console.log('none')
            }
        }else{
            pos= idocument.body;
        }
    }
    // console.log(pos)
    return pos;
}


function all(childEle,et,arr){
    // console.log(arr.length == 2);
    if (arr.length == 2) {
        sub(childEle,et,arr);
    }else{
        pos=et;
    }
}

function sub(childEle,et,arr){
        if (arr[1].includes(childEle)) {
            pos= et.parentNode;
        }else{
            console.log('dd')

            pos=et;
        }
        // console.log(et);
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