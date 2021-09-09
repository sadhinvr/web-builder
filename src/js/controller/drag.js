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
        dragAction.eventSettings(e, {
            pd: true,
            stpro: true,
            point: false
        }, []);

        const rect = e.target.getBoundingClientRect();
        const div = document.createElement('div');
        div.classList.add('js-eleHolder');
        div.style.position="fixed";
        div.innerHTML = e.target.outerHTML;
        div.style.zIndex= '9999999';
        div.style.pointerEvents = 'none';
        div.style.width = rect.width+'px';
        div.style.height = rect.height+'px';
        div.style.display = 'flex';
        const dp = e => {
            $('js-eleHolder') || document.body.appendChild(div);
            div.style.top= `${e.clientY}px`;
            div.style.left= `${e.clientX}px`;
        
            // console.log(e.clientX);
        }

        const mo = e=>console.log(e.target);
        dragAction.on('mousemove',dp);
        dragAction.on('mousemove',dp,domEle.idoc);
        dragAction.on('mouseover',mo);
        dragAction.on('mouseover',mo,domEle.idoc);

        dragAction.on('mouseup', e => {
            dragAction.removeEvent('mousemove', dp,domEle.idoc);
            dragAction.removeEvent('mouseover',mo,domEle.idoc);
            dragAction.removeEvent('mousemove', dp);
            dragAction.removeEvent('mouseover',mo);
            div.remove();
        }).on('mouseup', e => {
            dragAction.removeEvent('mousemove', dp,domEle.idoc);
            dragAction.removeEvent('mouseover',mo,domEle.idoc);
            dragAction.removeEvent('mousemove', dp);
            dragAction.removeEvent('mouseover',mo);
            div.remove();
        },domEle.idoc)
    }


});