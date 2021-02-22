// import {ele} from './drag';
import {htmlMockup} from '../views/mockup';
import {mousedown} from '../models/drag';
import {iframeAppend} from '../views/iframeView';

function drop(data){
    // ready
    const dataEle=data.name.dataset.ele;
    //clone
    htmlMockup[dataEle].setAttribute('data-ele',data.name.dataset.ele)
    const clone=htmlMockup[dataEle].cloneNode(true);
    clone.addEventListener('mousedown',mousedown);
    // append
    iframeAppend(clone);
}

export {drop};



