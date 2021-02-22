import {
    drop
} from './drop';
import {
    $
} from '../reuse';

const dragable = $('.dragable', true);
let ele, dragging = false,
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

        // ready clone
        readyDragClone();

        ele.winheight = window.scrollY;
        // mousemove run drag

        if (!ifr) {
            window.addEventListener('mousemove', drag);
        } else {
            ele.name.classList.add('hidden_on_drag');
            $('#iframe').contentWindow.addEventListener('mousemove', drag);
        }
    }
}

function drag(e) {
    if (!ifr) {
        document.body.appendChild(ele.clone);
        ele.clone.style.top = `${e.clientY-(ele.height/2)}px`;
        ele.clone.style.left = `${e.clientX-(ele.width/2)}px`;
    } else {
        $('#iframe').contentDocument.body.appendChild(ele.clone)
        ele.clone.style.top = `${e.clientY}px`;
        ele.clone.style.left = `${e.clientX}px`;
    }

// window scroll
scrollWin(e);

    

}

function scrollWin(e){
    let speed = 5;
    if (window.innerHeight < e.clientY) {
        window.scrollTo(0, ele.winheight);
        ele.winheight += speed;
    }else if(100 > e.clientY){
        window.scrollTo(0, ele.winheight);
        ele.winheight -= speed;
    }
}

function setDragData(e) {
    ele = {
        winheight: window.scrollY,
        name: e.currentTarget,
        top: e.currentTarget.getClientRects()[0].top,
        left: e.currentTarget.getClientRects()[0].left,
    };

    if (!ifr) {
        ele.clone = e.currentTarget.cloneNode(true);
        ele.height = e.currentTarget.getClientRects()[0].height;
        ele.width = e.currentTarget.getClientRects()[0].width;
    } else {
        ele.inside = $(`.element[data-ele="${e.currentTarget.dataset.ele}"]`);
        ele.height = ele.inside.getClientRects()[0].height;
        ele.width = ele.inside.getClientRects()[0].width;
        ele.clone = ele.inside.cloneNode(true);
    }
    
}

function readyDragClone() {

    ele.clone.style.width = `${ele.width}px`;
    ele.clone.style.height = `${ele.height}px`;

    ele.clone.style.top = `${ele.top}px`;
    ele.clone.style.left = `${ele.left}px`;
    ele.clone.style.position = `fixed`;
    ele.clone.classList.add('fade');
}

function resetDrag() {
    ele.winheight = window.scrollY;

    if(!ifr){
        ele.clone.addEventListener('mousedown', mousedown)
        window.removeEventListener('mousemove', drag);
        
    }else{
        $('#iframe').contentWindow.removeEventListener('mousemove', drag);
        ele.name.classList.remove('hidden_on_drag');
    }
    ele.clone.remove('fade');
    
}

function mouseup() {
    if (dragging) {
        resetDrag();
        if (!ifr) {
            drop(ele);
        }
    }
    dragging = false;
    ifr=false;
}

window.addEventListener('mouseup', mouseup)
$('#iframe').contentWindow.addEventListener('mouseup',mouseup)

export {
    ele,
    mousedown,mouseup
};