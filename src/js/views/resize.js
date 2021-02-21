import {
    elements
} from '../reuse';

(function () {
    const top_h = elements.top.getClientRects()[0].height;
    const left_w = elements.left.getClientRects()[0].width;
    const right_w = elements.right.getClientRects()[0].width;

    elements.top_holder.style.height = `${top_h}px`;
    elements.left_holder.style.width = `${left_w}px`;
    elements.right_holder.style.width = `${right_w}px`;
})();

// resising every time

function resize() {
    iframe.height = iframe.contentWindow.document.querySelector('html').getClientRects()[0].height;
}

window.addEventListener('resize', resize);
