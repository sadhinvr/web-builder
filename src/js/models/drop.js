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
import {
    $
} from '../reuse';


window.addEventListener('load', () => {
    setTimeout(() => {
        idocument.querySelectorAll('[data-drag="10"]').forEach(cur => {
            cur.addEventListener('mousedown', mousedown);
        })
    }, 2000)
})



function drop(data, pos, d = true) {
    console.log('drop')
    // ready
    const dataEle = data.node.dataset.ele;
    if (pos && pos[0] && pos[1]) {
        // console.log(pos,Math.random())
        if (d) {
            //clone
            htmlMockup[dataEle].setAttribute('data-ele', data.node.dataset.ele)

            const clone = htmlMockup[dataEle].cloneNode(true);
            clone.addEventListener('mousedown', mousedown);

            let key = [...$(`[data-ele="${clone.dataset.ele}"]`, true, true)].reduce((a, c) => {
                if (typeof (a) == 'object') {
                    return a.dataset.sb_key < c.dataset.sb_key ? c : a;
                }
                return c;
            }, 0)

            typeof (key) == 'object' ? key = parseInt(key.dataset.sb_key) + 1: 0;

            clone.dataset.sb_key = key;

            // append
            iframeAppend(clone, pos);

            iwindow.scrollTo({
                left: clone.offsetLeft,
                top: clone.offsetTop,
                behavior: 'smooth'
            })

        } else {
            iframeAppend(data.node, pos);
            iwindow.scrollTo({
                left: data.node.offsetLeft,
                top: data.node.offsetTop,
                behavior: 'smooth'
            })

        }

        // changing style
        if (idocument.body.children < 2) {
            idocument.body.style.height = "100vh";
        } else {
            idocument.body.style.height = "";
        }

        $('div,section', true, true).forEach(cur => {
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