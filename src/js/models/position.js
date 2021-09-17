
//variable
let pos = [],
    colorBlue = '#1e90ff8a',
    colorRed = '#e2121261'


//create boxes
const curPos = domEle.idoc.createElement('div');
curPos.dataset.sb = 'curpos';
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
    // console.log(e.target);
    // if(navOn){
    //     //get vartual node 
    //     const vn= e.target;

    //     if(vn.dataset.navDrag){
    //         e= $(``)
    //     }
    // }
    if (e.target.tagName != 'BODY' && e.target.tagName != 'HTML' && e.target != child) {
        // console.log('not-body')
        let parentArr, parentRect, top, height, offset, width, left;

        // variable
        parentArr = cantake[e.target.dataset.sb_ele];
        parentRect = e.target.getBoundingClientRect();

        left = parentRect.left;
        top = parentRect.top;
        height = parentRect.height;
        width = parentRect.width;
        offset = height * .15;

        console.log(e.clientY)
        //top
        if (e.clientY <= top + offset) {
            console.log('beforebegin')
            pos[1] = "beforebegin"
        }

        //middle top
        else if (e.clientY > top + offset && e.clientY <= (top + offset) + ((height - offset) / 2)) {
            pos[1] = "afterbegin";
            console.log('afterbegin')
        }

        //middle bottom
        else if (e.clientY > (top + offset) + ((height - offset) / 2) && e.clientY <= top + height - offset) {
            pos[1] = "beforeend"
            console.log('beforeend')


        } else {
            pos[1] = "afterend"
            console.log('afterend')

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
        domEle.idev.appendChild(curPos);
    }else if(!pos){
        curPos.remove();
    }

    console.log(pos)

    return pos;

}

function bodyTag() {
    pos[0] = domEle.idoc.body;
    pos[1] = 'afterbegin';
    curPos.style.height = domEle.idoc.body.offsetHeight + 'px';
    curPos.style.width = domEle.idoc.body.offsetWidth + 'px';
    curPos.style.top = domEle.idoc.body.offsetTop + 'px';
    curPos.style.left = domEle.idoc.body.offsetLeft + 8 + 'px';
    curPos.style.background = '#1e90ff8a';
}

function rect(top, width, height, left, offset) {
    const s = curPos.style;
    s.height = 20 + 'px';
    s.width = width + 'px';
    s.left = left + 'px';

    if (pos[1] == 'beforebegin') {
        s.top = domEle.iwin.scrollY + top - 20 + 'px';
    }

    if (pos[1] == 'afterbegin' || pos[1] == 'beforeend') {
        s.top = domEle.iwin.scrollY + top + offset + 'px';
        s.height = height - (offset * 2) + 'px';
    }

    if (pos[1] == 'afterend') {
        s.top = domEle.iwin.scrollY + top + height + 'px';
    }

    if (pos[0]) {
        curPos.style.background = colorBlue;
    } else {
        curPos.style.background = colorRed;
    }
}



function getPos(child, parent) {
    if (cantake[parent.dataset.sb_ele].includes('all')) {
        if (pos[1] == 'afterend' || pos[1] == 'beforebegin') {
            if (parentCheck(parent.parentElement, child)) {
                pos[0] = parent;
            }
        } else {
            if (parentCheck(parent, child)) {
                pos[0] = parent;
            }
        }
    } else if (cantake[parent.dataset.sb_ele].includes('none')) {
        if (pos[1] == 'afterend' || pos[1] == 'beforebegin') {
            if (parentCheck(parent.parentElement, child)) {
                pos[0] = parent;
            }
        } else {
            if (parent.dataset.sb_ele && cantake[parent.dataset.sb_ele][1] && cantake[parent.dataset.sb_ele][1].includes(child.dataset.sb_ele)){
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
        if (parentTemp.dataset.sb_ele && cantake[parentTemp.dataset.sb_ele][1] && cantake[parentTemp.dataset.sb_ele][1].includes(child.dataset.sb_ele)) {
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

    if(parentTemp){
        [].forEach.call(child.children, (child)=>parentCheck(parent, child));
    }

    return parentTemp;
}




export {
    mouseOver
};
