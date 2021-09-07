import Action from "../models/Action";
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
    console.log('mousedown');
    dragAction.removeEvent('mouseup', rmm);

    if ([...domEle.iresize].includes(e.target)) {
        dragAction.eventSettings(e,{pd:true,stpro:true,point:true},[])
        dragAction.vrLeft = false;
        e.target.classList.contains('js-iresize_left') && (dragAction.vrLeft = true);
        dragAction.on('mousemove', mm);
        dragAction.on('mouseup', rmm)
    }

    

});

