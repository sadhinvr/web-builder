import {
    $
} from '../reuse';

import './codeView';

// left menu 
const right_menu = $('.left .right_menu');
$('.left_menu div[data-open]', true).forEach(cur => {
    cur.addEventListener('click', rightMenu);
});

function rightMenu(e) {
    right_menu.style.display != '' ? right_menu.style.display = '' : right_menu.style.display = 'none';
    const o = $('.' + e.currentTarget.dataset.open).style;
    o.display != '' ? o.display = '' : o.display = 'none';
}

// right menu
$('.reveal_tab',true).forEach((cur)=>{
    cur.style.display='none';
})