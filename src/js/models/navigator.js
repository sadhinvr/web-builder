import {
    $
} from "../reuse";
import { mousedown } from "./drag";
import {
    idocument
} from "./iframe";

var navElms = $('.navigator_elements'),
    nav = $('.navigator'),
    navOn = false;

// Eventlistener

navElms.addEventListener('mouseover', () => {
    navOn = true;
})

navElms.addEventListener('mouseleave', () => {
    navOn = false;
})

// function

var getDOM = (function () {
    var depth = 0,
        pp = navElms,
        p,
        pd = 0;

    return function (node) {
        if (node.id == 'dev') {
            return 0;
        }

        if (node === idocument.body) {
            [].forEach.call(node.children, function (node) {
                getDOM(node);
            });
            return 0;
        }
        p = createMock(node,depth);


        if(depth == 0){
            navElms.appendChild(p);
        }else{
            if(pp.dataset.sb_nav_depth>depth){
                const godownNum =(pp.dataset.sb_nav_depth - depth) +1;
                let godownNode= pp;
                for(let i=0;i<godownNum;i++){
                    godownNode = godownNode.parentNode;
                //    console.log(i,godownNode)
                }
                godownNode.appendChild(p);
                // console.log(godownNode)
            }else if(pp.dataset.sb_nav_depth<depth){
                pp.appendChild(p);
            }else{
                pp.parentNode.appendChild(p)
            }
        }

        if(pp.dataset.sb_nav_depth<depth){
            pp.classList.remove('hide_arrow');
            pp.addEventListener('click', navDrag);
            pp.querySelector('svg').addEventListener('click', hideChild);
        }

        pp = p;

        pd = depth;
        // if (depth == 0) {
        //     navElms.appendChild(p);
        // } else {
        //     pp.appendChild(p);
        //     if (depth > pd) {
        //         pp.classList.remove('hide_arrow');
        //         pp.addEventListener('click', navDrag);
        //         pp.querySelector('svg').addEventListener('click', hideChild);
        //     }
        // }


        // if(pd > depth){
        //     pp = pp.parentElement.parentElement;
        // }else{
        //     pp = p;
        // }

        // pd = depth;
        // if (depth != 0 && depth == pd) {
        //     pp = pp.parentElement;
        // }

        // code
        // $(`[data-sb_depth="${depth-1}"][data-sb_nav_key=${node}]`).insertAdjacentHTML('beforeend',navMock(node,depth))

        depth++;

        [].forEach.call(node.children, function (node) {
            getDOM(node);
        });

        depth--;
    };
})();

setTimeout(() => getDOM(idocument.body), 1000)

function createMock(node,depth) {
    const nTab = document.createElement('div');
    nTab.className = ('navigation_tab hide_arrow');
    nTab.dataset.sb_nav_key = node.dataset.ele + ' ' + node.dataset.sb_key;
    nTab.dataset.drag = "12";
    nTab.dataset.sb_nav_depth = depth;
    nTab.addEventListener('mousedown', mousedown)
    nTab.innerHTML = `
                <div class="nav_ele">
                <svg style="margin-left:-8px" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M4 6l3 .01h2L12 6l-4 4-4-4z" fill="currentColor"></path>
                </svg>
                <p>${node.tagName.toLowerCase()} 
                <span class="--light">
                    -${node.dataset.ele + (node.dataset.sb_key == 0?'':node.dataset.sb_key)}
                </span>
                </p>
                </div>`

    return nTab;
}


function navMock(node, depth) {
    return `<div class="navigation_tab" data-sb_depth="${depth}">
                <div class="nav_ele">
                    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M4 6l3 .01h2L12 6l-4 4-4-4z" fill="currentColor"></path>
                    </svg>
                 <p>${node.tagName.toLowerCase()} 
                 <span class="--light">
                    -${node.dataset.ele + (node.dataset.sb_key == 0?'':node.dataset.sb_key)}
                 </span>
                 </p>
                </div>
            </div>`
}

function navDrag(e) {


}

function hideChild(e) {
    e.stopPropagation();
    this.parentElement.parentElement.classList.toggle('hide_child_nav');
}

{
    /* <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16">
                                        <path d="M4 6l3 .01h2L12 6l-4 4-4-4z" fill="currentColor"></path>
                                    </svg> */
}

export {
    navOn
}