import {
    mouseOver
} from "../models/position";
import Box from "../views/Box";
import {
    htmlMockup
} from "../views/mockup";

let data;
const activeBox = new Box('solid 1px #4353ff');
activeBox.crud({append:true,dis:'none'});

function idrag(e,dragAction){
    //dragaction
    
    dragAction.eventSettings(e, {
        pd: true,
        stpro: true,
        point: false
    }, []);

    data = {
        winY: domEle.iwin.scrollY,
        winX: domEle.iwin.scrollX,
    }

    const child = e.target;

    if(e.target.tagName != 'HTML'){
        activeBox.boxStyle(child);
        activeBox.crud({dis:'block'});
    }


    child.style.opacity = '0.5';
    child.style.pointerEvents = 'none';

    let parent;
    let pos;

    const dp = e => {
        dragAction.eventSettings(e, {
            pd: true,
            stpro: true,
            point: false
        }, []);
        scrollWin(e)
    }
    const dpi = e => {
        dragAction.eventSettings(e, {
            pd: true,
            stpro: true,
            point: false
        }, []);
        pos = mouseOver(e, child);
        scrollWin(e)
    }

    const mo = e => {
        parent = e;
        document.body.style.cursor = 'grabbing';
        domEle.idoc.body.style.cursor = 'grabbing';
        // console.log(e.target)
    };
    dragAction.on('mousemove', dp);
    dragAction.on('mousemove', dpi, domEle.idoc);
    dragAction.on('mouseover', mo);
    dragAction.on('mouseover', mo, domEle.idoc);

    dragAction.on('mouseup', e => {
        dragAction.removeEvent('mousemove', dpi, domEle.idoc);
        dragAction.removeEvent('mouseover', mo, domEle.idoc);
        dragAction.removeEvent('mousemove', dp);
        dragAction.removeEvent('mouseover', mo);
        // div.remove();
        $('[data-sb="curpos"]', false, true) ?.remove();

        // if(pos[1] && pos[0]){
        //     const ele = htmlMockup[child.dataset.sb_ele].outerHTML;
        //     pos[0].insertAdjacentHTML(pos[1],ele);
        // }
        pos = false;
        document.body.style.cursor = '';
        domEle.idoc.body.style.cursor = '';
        child.style.opacity = '';
        child.style.pointerEvents = '';

    }).on('mouseup', e => {
        dragAction.removeEvent('mousemove', dpi, domEle.idoc);
        dragAction.removeEvent('mouseover', mo, domEle.idoc);
        dragAction.removeEvent('mousemove', dp);
        dragAction.removeEvent('mouseover', mo);
        // div.remove();
        $('[data-sb="curpos"]', false, true) ?.remove();
        if (pos && pos[1] && pos[0]) {

            pos[0].insertAdjacentElement(pos[1], child);
        }

        document.body.style.cursor = '';
        domEle.idoc.body.style.cursor = '';
        child.style.opacity = '';
        child.style.pointerEvents = '';
        pos = false;
    }, domEle.idoc)


}

function drag(e,dragAction){
    
    dragAction.eventSettings(e, {
        pd: true,
        stpro: true,
        point: false
    }, []);

    const child = e.target;

    data = {
        winY: domEle.iwin.scrollY,
        winX: domEle.iwin.scrollX,
    }


    const rect = e.target.getBoundingClientRect();
    const irect = iframe.getBoundingClientRect();
    const div = document.createElement('div');
    let parent;
    let pos;
    div.classList.add('js-eleHolder');
    div.style.position = "fixed";
    div.innerHTML = e.target.outerHTML;
    div.style.zIndex = '9999999';
    div.style.pointerEvents = 'none';
    div.style.width = rect.width + 'px';
    div.style.height = rect.height + 'px';
    div.style.display = 'flex';

    const dp = e => {
        $('js-eleHolder') || document.body.appendChild(div);
        div.style.top = `${e.clientY}px`;
        div.style.left = `${e.clientX}px`;
        // console.log(e.clientX);
        scrollWin(e)
    }
    const dpi = e => {
        $('js-eleHolder') || document.body.appendChild(div);
        div.style.top = `${irect.top+e.clientY}px`;
        div.style.left = `${irect.left+e.clientX}px`;
        pos = mouseOver(e, child);
        // console.log(e.clientX);
        scrollWin(e)
    }

    const mo = e => {
        parent = e;
        // console.log(e.target)
    };
    dragAction.on('mousemove', dp);
    dragAction.on('mousemove', dpi, domEle.idoc);
    dragAction.on('mouseover', mo);
    dragAction.on('mouseover', mo, domEle.idoc);

    dragAction.on('mouseup', e => {
        dragAction.removeEvent('mousemove', dpi, domEle.idoc);
        dragAction.removeEvent('mouseover', mo, domEle.idoc);
        dragAction.removeEvent('mousemove', dp);
        dragAction.removeEvent('mouseover', mo);
        div.remove();
        $('[data-sb="curpos"]', false, true) ?.remove();

        pos = false;
    }).on('mouseup', e => {
        dragAction.removeEvent('mousemove', dpi, domEle.idoc);
        dragAction.removeEvent('mouseover', mo, domEle.idoc);
        dragAction.removeEvent('mousemove', dp);
        dragAction.removeEvent('mouseover', mo);
        div.remove();
        $('[data-sb="curpos"]', false, true) ?.remove();
        if (pos && pos[1] && pos[0]) {
            const ele = htmlMockup[child.dataset.sb_ele].outerHTML;
            pos[0].insertAdjacentHTML(pos[1], ele);
        }

        pos = false;
    }, domEle.idoc)


    $('.js-elebar').click();
}

Box

function scrollWin(e) {
    let speed = 5;
    const ifrHeight = domEle.iwin.innerHeight;
    const ifrWidth = domEle.iwin.innerWidth;

    //bottom
    if (ifrHeight - 50 < e.clientY) {
        data.winY += speed;
    }

    //top
    else if (50 > e.clientY) {
        data.winY -= speed;
    }

    //right
    else if (ifrWidth - 50 < e.clientX) {
        data.winX += speed;
    }

    //left
    else if (50 > e.clientX) {
        data.winX -= speed;
    } else {
        data.winY = domEle.iwin.scrollY;
        data.winX = domEle.iwin.scrollX;
    }

    domEle.iwin.scrollTo(data.winX, data.winY);
}

export {idrag,drag};