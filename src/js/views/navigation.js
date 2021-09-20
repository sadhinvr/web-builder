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

    domEle.nodes.append(...arr.reverse());

}