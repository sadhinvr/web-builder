import {
    drop
} from './drop';

import {
    $,
    elements
} from '../reuse';

import {
    iwindow,
    idocument
} from './iframe';

import {
    mouseOver
} from './position';
import {
    on,
    setStyleData
} from '../views/iframeView';
import {
    getStyle
} from './style';
import {
    navOn
} from './navigator';

const dragable = $('.dragable', true);
let data, dragging = false,
    appended, p, pos, active, dragState;

const activeBox = idocument.createElement('div');
activeBox.id = 'activeBox';

dragable.forEach(cur => {
    cur.addEventListener('mousedown', mousedown)
})


function mousedown(e) {
    e.preventDefault();

    if (e.currentTarget.dataset.drag && e.button === 0) {

        //set sate 
        appended = true;
        dragging = true;
        dragState = e.currentTarget.dataset.drag;
        // set data
        setDragData(e);
        data.winY = iwindow.scrollY;
        data.winX = iwindow.scrollX;




        //check drag 10/11/20
        if (dragState === '10') {
            data.node.style.opacity = '.5';
            //active
            active = data.node;
            idocument.getElementById('dev').appendChild(activeBox);
            setStyleData(active, activeBox, '1px solid #00ff13')
            //active style
            getStyle(active);
        } else if (dragState === '11') {

        } else if (dragState === '12') {

        }

        // mouse over
        window.addEventListener('mouseover', appendPos);
        iwindow.addEventListener('mouseover', iappendPos);

        //close menus
        const right_menu = $('.left .right_menu');
        right_menu.style.display = 'none';
        [].forEach.call(right_menu.children, cur => {
            cur.style.display = 'none';
        })

    }

    if (e.target.dataset.ele && e.target.dataset.ele === 'body') {
        //active
        active = e.target;
        idocument.getElementById('dev').appendChild(activeBox);
        setStyleData(active, activeBox, '1px solid #00ff13');

        getStyle();

    }
}



function cCursor() {
    if (dragging) {
        document.body.classList.add('grabbing');
        idocument.body.classList.add('grabbing');

    } else {
        document.body.classList.remove('grabbing');
        idocument.body.classList.remove('grabbing');
    }

}

function appendPos(e) {
    iwindow.removeEventListener('mousemove', drag);
    p = document.body;
    window.addEventListener('mousemove', drag);
}

function iappendPos(e) {
    window.removeEventListener('mousemove', drag);
    p = idocument.body.querySelector('#dev');
    iwindow.addEventListener('mousemove', drag);
}

function drag(e) {
    e.preventDefault()
    // change cursor
    cCursor();

    if (on || navOn) {
        document.body.classList.remove('not_allowed');
    } else {
        document.body.classList.add('not_allowed');
    }

    //position 
    pos = mouseOver(e, data.node);
    // append child
    if (dragState === '11') {
        p.appendChild(data.clone);
        data.clone.style.top = `${e.clientY}px`;
        data.clone.style.left = `${e.clientX}px`;
    }

    // window scroll
    scrollWin(e);

}

function scrollWin(e) {
    let speed = 5;
    const ifrHeight = iwindow.innerHeight;
    const ifrWidth = iwindow.innerWidth;

    //bottom
    if (ifrHeight - 50 < e.clientY) {
        data.winY += speed;
    }

    //top
    else if (50 > e.clientY) {
        data.winY -= speed;
    }

    //right
    else if (ifrWidth - 50 < e.clientX) {
        data.winX += speed;
    }

    //left
    else if (50 > e.clientX) {
        data.winX -= speed;
    } else {
        data.winY = iwindow.scrollY;
        data.winX = iwindow.scrollX;
    }

    iwindow.scrollTo(data.winX, data.winY);
}

function setDragData(e) {
    data = {
        winY: iwindow.scrollY,
        winX: iwindow.scrollX,
        node: e.target,
        top: e.currentTarget.getClientRects()[0].top,
        left: e.currentTarget.getClientRects()[0].left,
    };

    if (dragState === '11') {
        data.node = e.currentTarget,
            data.clone = e.currentTarget.cloneNode(true);
        data.height = e.currentTarget.getClientRects()[0].height;
        data.width = e.currentTarget.getClientRects()[0].width;
        readyDragClone();
    }
}

function readyDragClone() {

    data.clone.style.width = `${data.width}px`;
    data.clone.style.height = `${data.height}px`;

    data.clone.style.top = `${data.top}px`;
    data.clone.style.left = `${data.left}px`;
    data.clone.style.position = `fixed`;
    data.clone.classList.add('fade');

}

function resetDrag() {
    document.body.className.includes('not_allowed') ? document.body.classList.remove('not_allowed') : 0;
    idocument.body.className.includes('not_allowed') ? idocument.body.classList.remove('not_allowed') : 0;

    if (dragState === '11') {
        // window.removeEventListener('mousemove', drag);

        // remove fade
        data.clone.remove('fade');


    } else if (dragState === '10') {
        data.node.style.opacity = '';
        idocument.body.classList.remove('cursor_dragging');
        // iwindow.removeEventListener('mousemove', drag);

    }

    // remove events
    window.removeEventListener('mouseover', appendPos);
    iwindow.removeEventListener('mouseover', iappendPos);
    window.removeEventListener('mousemove', drag);
    iwindow.removeEventListener('mousemove', drag);

    if (active) {
        setInterval(() => {
            setStyleData(active, activeBox, '1px solid #00ff13')
        }, 100);
    }

}

function mouseup() {
    if (dragging) {
        resetDrag();
        if (dragState === '11') {
            drop(data, pos);
        } else {
            drop(data, pos, false);
        }
    }
    dragging = false;
    dragState = undefined;
    pos = [];
    // change cursor
    cCursor();
}

window.addEventListener('mouseup', mouseup)
iwindow.addEventListener('mouseup', mouseup)
idocument.body.addEventListener('mousedown', mousedown)

export {
    data,
    mousedown,
    mouseup,
    active
};