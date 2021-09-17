import Action from "../models/Action";
import { drag, idrag } from "../models/dragDrop";
import {
    iResize
} from '../models/sizing';


const dragAction = new Action(domEle.body);
const mm = e => iResize(e, dragAction);

const rmm = e => {
    iframe.style.pointerEvents = '';
    dragAction.removeEvent('mousemove', mm);
    console.log('up');
}


dragAction.pX = 0;

dragAction.on('mousedown', e => {
    // console.log('mousedown');
    dragAction.removeEvent('mouseup', rmm);

    if (e.button == 0) {
        if ([...domEle.iresize].includes(e.target)) {
            dragAction.eventSettings(e, {
                pd: true,
                stpro: true,
                point: true
            }, [])
            dragAction.vrLeft = false;
            e.target.classList.contains('js-iresize_left') && (dragAction.vrLeft = true);
            dragAction.on('mousemove', mm);
            dragAction.on('mouseup', rmm)
        }

        if (e.target.classList.contains('element')) {
            drag(e,dragAction);
        }
    }

});








dragAction.on('mousedown', e => {
    if (e.target.dataset.sb_ele && e.button == 0) {
        idrag(e,dragAction);
    }
}, domEle.idoc.body);



