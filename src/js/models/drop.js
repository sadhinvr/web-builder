// import {ele,pos} from './drag';
import {
    htmlMockup
} from '../views/mockup';
import {
    mousedown,
} from '../models/drag';
import {
    iframeAppend,
    setStyleData
} from '../views/iframeView';
import {
    idocument,
    iwindow
} from './iframe';


window.addEventListener('load',()=>{
    setTimeout(()=>{
        idocument.querySelectorAll('[data-drag="10"]').forEach(cur=>{
            cur.addEventListener('mousedown',mousedown);
        })
    },2000)
})



function drop(data, pos, d = true) {
    console.log('drop')
    // ready
    const dataEle = data.name.dataset.ele;
    if (pos && pos[0] && pos[1] && pos !== data.name && pos !== data.name.parentElement) {
        // console.log(pos,Math.random())
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

        } else {
            iframeAppend(data.name, pos);
            iwindow.scrollTo({
                left: data.name.offsetLeft,
                top: data.name.offsetTop,
                behavior: 'smooth'
            })

        }

        // changing style
        if(idocument.body.children <2){
            idocument.body.style.height="100vh";
        }else{
            idocument.body.style.height="";
        }

        idocument.querySelectorAll('div,section').forEach(cur => {
            if (cur.dataset.drag) {
                if (cur.children.length > 0) {
                    cur.removeAttribute("style")
                } else if (cur.style !== "padding:30px;box-shadow:0px 0px 3px inset #848484") {
                    cur.style = "padding:30px;box-shadow:0px 0px 3px inset #848484";
                }
            }
        })
    }

    if (idocument.getElementById('curPos')) {
        idocument.getElementById('curPos').remove();
    };
    
}

export {
    drop
};