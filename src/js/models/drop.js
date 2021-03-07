// import {ele,pos} from './drag';
import {
    htmlMockup
} from '../views/mockup';
import {
    mousedown
} from '../models/drag';
import {
    iframeAppend
} from '../views/iframeView';
import {
    idocument,
    iwindow
} from './iframe';


function drop(data, pos, d = true) {

    // ready
    const dataEle = data.name.dataset.ele;
    if (pos && pos !== data.name && pos !== data.name.parentElement) {
        console.log(pos,Math.random())
        if (d) {
            //clone
            htmlMockup[dataEle].setAttribute('data-ele', data.name.dataset.ele)

            const clone = htmlMockup[dataEle].cloneNode(true);
            clone.addEventListener('mousedown', mousedown);
            // append
            iframeAppend(clone, pos);
            iwindow.scrollTo({
                left: clone.offsetLeft,
                top: clone.offsetTop,
                behavior: 'smooth'
            })
            clone.focus({preventScroll:true})

        } else {
            iframeAppend(data.name, pos);
            iwindow.scrollTo({
                left: data.name.offsetLeft,
                top: data.name.offsetTop,
                behavior: 'smooth'
            })
            data.name.focus({preventScroll:true})

        }
        
    }
    if (idocument.getElementById('curPos')) {
        idocument.getElementById('curPos').remove();
    };
}

export {
    drop
};