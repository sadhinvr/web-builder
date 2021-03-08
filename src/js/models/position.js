import {
    on, setStyleData
} from '../views/iframeView';

import {
    idocument
} from './iframe';

//variable
let pos;

//create boxes
const curPos = idocument.createElement('div');
curPos.id = 'curPos';
curPos.style = 'position:absolute;pointer-events: none;';

const cantake = {
    body: ['all'],
    div: ['all'],
    container:['all'],
    section: ['all', ['section']],
    heading: ['none'],
    paragraph: ['none'],
    img: ['none']
}

//mouseover
const mouseOver = (e, childEle) => {
    if (on) {
        // if(e.clientY >= top - offset || )

        if (childEle) {
            // variable
            const parentEle = cantake[e.target.dataset.ele]
            // all
            if (e.target.dataset.ele && parentEle.includes('all')) {
                // console.log('all')
                all(childEle, e.target, parentEle);
            }

            //none
            if (e.target.dataset.ele && parentEle.includes('none')) {
                pos = e.target.parentNode;
            }
        } else {
            pos = idocument.body;
        }

        //rect
        if (pos) {
            idocument.getElementById('dev').appendChild(curPos);
            const rect = pos.getBoundingClientRect();
            const offset = rect.height / 4;
            const top = rect.top;
            const bottom = rect.top + rect.height;

            if (e.clientY >= top + offset && e.clientY <= bottom - offset) {
                // console.log(e.target, e.clientY, top, e.clientY, bottom)
                setStyleData(pos,curPos,false,'#1e90ff8a')
            }
        }


    }else{
        pos=null;
    }
    // console.log(pos)
    return pos;
}


function all(childEle, et, arr) {
    // console.log(arr.length == 2);
    if (arr.length == 2) {
        sub(childEle, et, arr);
    } else {
        pos = et;
    }
}

function sub(childEle, et, arr) {
    if (arr[1].includes(childEle)) {
        pos = et.parentNode;
    } else {
        pos = et;
    }
}


export {
    mouseOver
};