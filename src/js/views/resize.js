import {
    elements,$
} from '../reuse';

function afterLoad() {
    const top_h = elements.top.getClientRects()[0].height;

    elements.top_holder.style.height = `${top_h}px`;
    $('#iframe').style.height = `calc(100vh - ${top_h+.4}px)`
    $('#left').style.height = `calc(100vh - ${top_h+.4}px)`
    // $('#right').style.height = `calc(100vh - ${top_h+.4}px)`
}

window.addEventListener('load',afterLoad);

