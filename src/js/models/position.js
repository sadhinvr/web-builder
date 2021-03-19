import {
    on,
    setStyleData
} from '../views/iframeView';

import {
    idocument, iwindow
} from './iframe';

//variable
let pos = [];

//create boxes
const curPos = idocument.createElement('div');
curPos.id = 'curPos';
curPos.style = 'position:absolute;pointer-events: none;';

const cantake = {
    body: ['all'],
    div: ['all'],
    container: ['all'],
    section: ['all', ['section']],
    heading: ['none'],
    paragraph: ['none'],
    img: ['none']
}

//mouseover
const mouseOver = (e, childEle) => {
    if (on && e.target.dataset.ele && e.target.tagName != 'BODY') {

        e.target.tagName == 'BODY'?console.log('lidkfjdkjfkdjsjhjshdjhsjhdjhsj'):0;
        let parentEle, parentRect, top, height, offset,style,width,margin1,margin2;

        if (childEle && e.target.dataset.ele) {
            // variable
            parentEle = cantake[e.target.dataset.ele];
            parentRect = e.target.getBoundingClientRect();


            top = parentRect.top;
            height = parentRect.height;
            width = parentRect.width;
            offset = height * .15;

            //top
            if (e.clientY <= top + offset) {
                pos[1] = "beforebegin"

                // all
                if (parentEle.includes('all')) {
                    if(e.target.parentElement.dataset.ele.includes('none')){
                        curPos.style.background = "#e2121261";
                        pos[0] = null;
                    }else if(e.target.parentElement.dataset.ele.includes('all')){
                        all(childEle, e.target.parentElement, parentEle)
                    }

                }

                //none
                none(childEle, parentEle, e.target)

            }

            //middle top
            else if (e.clientY > top + offset && e.clientY <= (top + offset) + ((height - offset) / 2)) {
                pos[1] = "afterbegin";
                // all
                if (parentEle.includes('all')) {
                    all(childEle, e.target, parentEle);
                }

                //none
                none(childEle, parentEle, e.target)
            }

            //middle bottom
            else if (e.clientY > (top + offset) + ((height - offset) / 2) && e.clientY <= top + height - offset) {
                pos[1] = "beforeend"
                // all
                if (parentEle.includes('all')) {
                    all(childEle, e.target, parentEle);
                }

                //none
                none(childEle, parentEle, e.target)

                //bottom
            } else {
                pos[1] = "afterend"

                // all
                if (parentEle.includes('all')) {
                    if(e.target.parentElement.dataset.ele.includes('none')){
                        curPos.style.background = "#e2121261";
                        pos[0] = null;
                    }else if(e.target.parentElement.dataset.ele.includes('all')){
                        all(childEle, e.target.parentElement, parentEle)
                    }
                }

                //none
                none(childEle, parentEle, e.target)
            }


        } else {
            pos[0] = idocument.body;
            pos[1] = 'afterbegin'
        }

        rect(top, width, height, offset);

    } else {
        pos[0] = idocument.body;
        pos[1] = 'afterbegin';
    }

    // rect
    if (pos[0]) {
        idocument.getElementById('dev').appendChild(curPos);
    }

    if(pos[0] && pos[0].tagName == 'HTML' || pos[0] && pos[0].tagName =='BODY'){
        pos[0] = idocument.body;
        pos[1] = 'afterbegin';
    }

    return pos;

}



function rect(top, width, height, offset) {
    const s = curPos.style;
    s.height = 20 + 'px';
    s.width = width + 'px';

    if (pos[1] == 'beforebegin') {
        s.top =iwindow.scrollY+ top - 20 + 'px';
    }

    if (pos[1] == 'afterbegin') {
        s.top =iwindow.scrollY+ top + offset + 'px';
        s.height = height - (offset * 2) + 'px';
    }

    if (pos[1] == 'beforeend') {
        s.top =iwindow.scrollY+ top + offset + 'px';
        s.height = height - (offset * 2) + 'px';
    }

    if (pos[1] == 'afterend') {
        s.top =iwindow.scrollY+ top + height + 'px';
    }
}



function none(childEle, parentEle, et) {
    if (parentEle.includes('none')) {
            if(pos[1] == 'afterend' || pos[1] == 'beforebegin'){
                if(et.parentElement.dataset.ele.includes('none')){
                    curPos.style.background = "#e2121261";
                    pos[0] = null;
                    pos[1] = 'afterbegin';
                }else{
                    all(childEle,et.parentElement,parentEle);
                }
            }else{
                curPos.style.background = "#e2121261";
                pos[0] = null;
                pos[1] = 'afterbegin';
            }
    }
}


function all(childEle, et, arr) {
    if (arr.length == 2) {
        sub(childEle, et, arr);
    } else {
        pos[0] = et;
        curPos.style.background = '#1e90ff8a';
    }
}

function sub(childEle, et, arr) {
    if (arr[1].includes(childEle)) {
        pos[0] = null;
        curPos.style.background = "#e2121261";
    } else {
        pos = et;
        curPos.style.background = '#1e90ff8a';
    }
}






export {
    mouseOver
};

// //top
// if(n == 'top'){

// }

// //mtop
// else if(n == 'mtop'){

// }

// //mbottom
// else if(n == 'mbottom'){

// }

// //bottom
// else if(n == 'bottom'){

// }