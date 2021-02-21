const dragable = document.querySelectorAll('.dragable');
let ele;
dragable.forEach(cur => {
    cur.addEventListener('mousedown', mousedown)
})

function mousedown(e) {
    console.log('mousedown')
    // set data
    setDragData(e);

    // ready clone
    ele.name.dataset.sad === '11' ? readyDragClone() : 0;

    ele.winheight = window.scrollY;
    // mousemove run drag
    window.addEventListener('mousemove', drag);
}

function drag(e) {
    if (ele.name.dataset.sad === '11') {
        document.body.appendChild(ele.clone)
        ele.clone.style.top = `${e.clientY-(ele.height/2)}px`;
        ele.clone.style.left = `${e.clientX-(ele.width/2)}px`;
    }
    //left:${e.clientX-(ele.width/2)}px;top:${e.clientY-(ele.height/2)}px;
    if(ele.name.dataset.sad === '10'){
        ele.name.style.top = `${e.clientY-(ele.height/2)}px`;
        ele.name.style.left = `${e.clientX-(ele.width/2)}px`;
    }

    if (window.innerHeight < e.clientY) {
        window.scrollTo(0, ele.winheight);
        ele.winheight += 10;
    }
    console.log('drag');

}

function setDragData(e) {
    ele = {
        winheight: window.scrollY,
        name: e.target,
        width: e.target.getClientRects()[0].width,
        height: e.target.getClientRects()[0].height,
        top: e.target.getClientRects()[0].top,
        left: e.target.getClientRects()[0].left,
        clone: e.target.cloneNode(true)
    };
}

function readyDragClone() {
    ele.clone.style.top = `${ele.top}px`;
    ele.clone.style.left = `${ele.left}px`;
    ele.clone.style.position = `fixed`;
    ele.clone.classList.add('fade');
}

function resetDrag() {
    if(ele && ele.dataset.ele){
        ele.clone.dataset.sad = '10';
        ele.clone.classList.remove('fade');
        ele.winheight = window.scrollY;
        ele.clone.addEventListener('mousedown', mousedown)
        window.removeEventListener('mousemove', drag);
    }
    
}

window.addEventListener('mouseup', () => {
    resetDrag(); 
})

