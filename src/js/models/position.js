import { $ } from '../reuse';
import {
    on,
    setStyleData
} from '../views/iframeView';

import {
    idocument,
    iwindow
} from './iframe';
import { navOn } from './navigator';

//variable
let pos = [],
    colorBlue = '#1e90ff8a',
    colorRed = '#e2121261'


//create boxes
const curPos = idocument.createElement('div');
curPos.id = 'curPos';
curPos.style = 'position:absolute;pointer-events: none;';

const cantake = {
    body: ['all'],
    div: ['all'],
    container: ['all', ['section', 'container']],
    section: ['all', ['section']],
    heading: ['none'],
    paragraph: ['none'],
    link: ['none'],
    img: ['none'],
    video: ['none'],
    audio: ['none'],
}

//mouseover
const mouseOver = (e, child) => {
    if(navOn){
        //get vartual node 
        const vn= e.target;

        if(vn.dataset.navDrag){
            e= $(``)
        }
    }
    if (on && e.target.tagName != 'BODY' && e.target != child) {

        let parentArr, parentRect, top, height, offset, width, left;

        // variable
        parentArr = cantake[e.target.dataset.ele];
        parentRect = e.target.getBoundingClientRect();

        left = parentRect.left;
        top = parentRect.top;
        height = parentRect.height;
        width = parentRect.width;
        offset = height * .15;

        //top
        if (e.clientY <= top + offset) {
            pos[1] = "beforebegin"
        }

        //middle top
        else if (e.clientY > top + offset && e.clientY <= (top + offset) + ((height - offset) / 2)) {
            pos[1] = "afterbegin";
        }

        //middle bottom
        else if (e.clientY > (top + offset) + ((height - offset) / 2) && e.clientY <= top + height - offset) {
            pos[1] = "beforeend"


        } else {
            pos[1] = "afterend"

        }

        getPos(child, e.target);
        rect(top, width, height, left, offset);
        console.log('process')


    } else if (e.target !== child) {
        bodyTag();
        console.log('bodytag')
    }else{
        pos=[]
    }

    if (pos[0] && pos[0].tagName == 'HTML' || pos[0] && pos[0].tagName == 'BODY') {
        bodyTag();
    }

    // pos[0] ? console.log(pos[0].tagName + ':' + pos[1]) : 0;

    // rect
    if (pos[0]) {
        idocument.getElementById('dev').appendChild(curPos);
    }else if(!pos){
        curPos.remove();
    }

    return pos;

}

function bodyTag() {
    pos[0] = idocument.body;
    pos[1] = 'afterbegin';
    curPos.style.height = idocument.body.offsetHeight + 'px';
    curPos.style.width = idocument.body.offsetWidth + 'px';
    curPos.style.top = idocument.body.offsetTop + 'px';
    curPos.style.left = idocument.body.offsetLeft + 8 + 'px';
    curPos.style.background = '#1e90ff8a';
}

function rect(top, width, height, left, offset) {
    const s = curPos.style;
    s.height = 20 + 'px';
    s.width = width + 'px';
    s.left = left + 'px';

    if (pos[1] == 'beforebegin') {
        s.top = iwindow.scrollY + top - 20 + 'px';
    }

    if (pos[1] == 'afterbegin' || pos[1] == 'beforeend') {
        s.top = iwindow.scrollY + top + offset + 'px';
        s.height = height - (offset * 2) + 'px';
    }

    if (pos[1] == 'afterend') {
        s.top = iwindow.scrollY + top + height + 'px';
    }

    if (pos[0]) {
        curPos.style.background = colorBlue;
    } else {
        curPos.style.background = colorRed;
    }
}



function getPos(child, parent) {
    if (cantake[parent.dataset.ele].includes('all')) {
        if (pos[1] == 'afterend' || pos[1] == 'beforebegin') {
            if (parentCheck(parent.parentElement, child)) {
                pos[0] = parent;
            }
        } else {
            if (parentCheck(parent, child)) {
                pos[0] = parent;
            }
        }
    } else if (cantake[parent.dataset.ele].includes('none')) {
        if (pos[1] == 'afterend' || pos[1] == 'beforebegin') {
            if (parentCheck(parent.parentElement, child)) {
                pos[0] = parent;
            }
        } else {
            if (parent.dataset.ele && cantake[parent.dataset.ele][1] && cantake[parent.dataset.ele][1].includes(child.dataset.ele)){
                pos[0] = parent;
            }
            else{
                pos[0] = null;
            }
        }
    }

}

function parentCheck(parent, child) {
    let parentTemp = parent;

    while (parentTemp.tagName != "BODY") {
        if (parentTemp.dataset.ele && cantake[parentTemp.dataset.ele][1] && cantake[parentTemp.dataset.ele][1].includes(child.dataset.ele)) {
            pos[0] = null;
            parentTemp = false;
            break;
        }

        if(parentTemp === child){
            pos=[]
            parentTemp = false;
            break;
        }

        parentTemp = parentTemp.parentElement;
    }

    // console.log(child.children.length );

    if(parentTemp){
        [].forEach.call(child.children, (child)=>parentCheck(parent, child));

        // for(let i=0;i < child.children.length;i++){
        //     parentTemp = parent;

        //     while (parentTemp.tagName != "BODY") {
        //         if (parentTemp.dataset.ele && cantake[parentTemp.dataset.ele][1] && cantake[parentTemp.dataset.ele][1].includes(child.children[i].dataset.ele)) {
        //             pos[0] = null;
        //             parentTemp = false;
        //             console.log('step 2')
        //             break;
        //         }
        //         parentTemp = parentTemp.parentElement;
        //     }
    
        //     if(!parentTemp){break}
        // }
    }

    return parentTemp;
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