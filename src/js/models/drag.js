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

import {mouseOver} from './position';

const dragable = $('.dragable', true);
let data, dragging = false,
    ifr = false;

dragable.forEach(cur => {
    cur.addEventListener('mousedown', mousedown)
})

function mousedown(e) {

    if (e.currentTarget.dataset.drag) {
        //set sate 
        if (e.currentTarget.dataset.drag === '10') {
            ifr = true;
        }

        dragging = true;

        // set data
        setDragData(e);
        console.log(data.winheight)
        // ready clone
        readyDragClone();

        data.winheight = window.scrollY;
        // mousemove run drag

        if (!ifr) {
            window.addEventListener('mousemove', drag);
        } else {
            data.name.classList.add('hidden_on_drag');
            iwindow.addEventListener('mousemove', drag);
        }
    }
}

function drag(e) {
    if (!ifr) {
        document.body.appendChild(data.clone);
        data.clone.style.top = `${e.clientY-(data.height/2)}px`;
        data.clone.style.left = `${e.clientX-(data.width/2)}px`;
    } else {
        mouseOver(e);
        idocument.body.appendChild(data.clone)
        data.clone.style.top = `${e.clientY}px`;
        data.clone.style.left = `${e.clientX}px`;
    }

    // window scroll
    scrollWin(e);

}

function scrollWin(e) {
    let speed = 5;
    const ifrHeight = iwindow.innerHeight;

    if (ifrHeight-10 < e.clientY) {
        iwindow.scrollTo(0, data.winheight);
        data.winheight += speed;

    } else if (90 > e.clientY) {
        iwindow.scrollTo(0, data.winheight);
        data.winheight -= speed;
    }
}

function setDragData(e) {
    data = {
        winheight: iwindow.scrollY,
        name: e.currentTarget,
        top: e.currentTarget.getClientRects()[0].top,
        left: e.currentTarget.getClientRects()[0].left,
    };

    if (!ifr) {
        data.clone = e.currentTarget.cloneNode(true);
        data.height = e.currentTarget.getClientRects()[0].height;
        data.width = e.currentTarget.getClientRects()[0].width;
    } else {
        data.inside = $(`.element[data-ele="${e.currentTarget.dataset.ele}"]`);
        data.height = data.inside.getClientRects()[0].height;
        data.width = data.inside.getClientRects()[0].width;
        data.clone = data.inside.cloneNode(true);
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

    if (!ifr) {
        data.clone.addEventListener('mousedown', mousedown);
        window.removeEventListener('mousemove', drag);

    } else {
        iwindow.removeEventListener('mousemove', drag);
        data.name.classList.remove('hidden_on_drag');
    }
    data.clone.remove('fade');

}

function mouseup() {
    if (dragging) {
        resetDrag();
        if (!ifr) {
            drop(data);
        }
    }
    dragging = false;
    ifr = false;
}

window.addEventListener('mouseup', mouseup)
iwindow.addEventListener('mouseup', mouseup)

export {
    data,
    mousedown,
    mouseup
};