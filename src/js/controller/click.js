import Action from "../models/Action";
import {
    breakPoints
} from "../models/sizing";
import {img,eleBar} from '../views/popups';
import {viewSiteNav} from '../views/popbox';

const clickAction = new Action(domEle.body);

clickAction.on('click', e => {
    // console.log('click');

    // console.log(e.target);
    if ([...domEle.btns].includes(e.target)) {
        e.target.classList.contains('js-elebar') && eleBar(e);
        e.target.classList.contains('js-img') && img(e);
        e.target.classList.contains('js-siteNav') && viewSiteNav(e);
        e.target.dataset.sb_br && breakPoints(e, e.target.dataset.sb_br);
    }

});

$('.js-elebar').click();