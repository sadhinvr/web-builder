export const branch = ele => {
    // domEle.nodes.innerHTML = '<div class="node">body <img src="assets/images/right-arrow.svg" style=" alt=""></div>';
    const arr = [];

    while (ele != domEle.idoc.firstElementChild) {
        const node = document.createElement('div');
        node.classList.add('node');
        // node.dataset.node = ele; 
        node.innerHTML = `

        <p>${ele.tagName.toLowerCase()}</p> 
        <img src="assets/images/right-arrow.svg" alt="">
        `;
        arr.push(node);
        ele = ele.parentElement;
    }

    setTimeout(()=>{
        domEle.nodes.innerHTML='';
        domEle.nodes.append(...arr.reverse());
    })

}

const bb= domEle.bottom_bar;
let pre = -1;
let moveto = bb.scrollLeft;
bb.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    let limit = bb.scrollWidth - bb.clientWidth;
    const sign =Math.sign(evt.deltaY);

    if ((sign < 0 || limit!= pre) && (0!= pre || sign > 0)) {
        moveto += evt.deltaY;
        moveto <0 && (moveto = 0)
        bb.scroll({
            left: moveto,
            behavior: "smooth"
        });

        // console.log(bb.scrollLeft,moveto);
    }

    pre= bb.scrollLeft;

});

// console.log(domEle.bottom_bar.scroll)
