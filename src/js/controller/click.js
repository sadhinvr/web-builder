import Action from "../models/Action";
import {
    processIresize,
    viewIresize
} from "../models/sizing";

const clickAction = new Action(domEle.body);

clickAction.on('click', e => {
    // console.log('click');

    // console.log(e.target);
    if ([...domEle.btns].includes(e.target)) {
        e.target.classList.contains('js-elebar') && eleBar(e);
        e.target.classList.contains('js-img') && img(e);
        e.target.classList.contains('js-siteNav') && nav(e);
        e.target.dataset.sb_br && breakPoints(e, e.target.dataset.sb_br);
    }

});


function eleBar(e) {
    const popCls = domEle.popup.classList;

    btnActive(e, 'lbarActive', {
        containsFun: () => {
            popCls.add('d-none');

        },
        elsefun: () => {
            popCls.remove('d-none');
        }
    })


    //append child
    domEle.popBody.innerHTML = `
    <div class="elements">
    <div class="row heading">
        <div class="col active color-white">
            HTML
        </div>
        <div class="col color-white">
            Pre-build
        </div>
        <div class="col color-white">
            Mine
        </div>
    </div>

    <div class="wraper">
        <div class="row">
            <div class="element">
                <p class="color-white" style="font-size: 30px;">h1</p>
                <p>heading</p>
            </div>
            <div class="element">
                <p class="color-white" style="font-size: 30px;">h1</p>
                <p>heading</p>
            </div>
            <div class="element bg-dark-6">
                <p class="color-white" style="font-size: 30px;">h1</p>
                <p>heading</p>
            </div>
        </div>
        <div class="row">
            <div class="element">
                <p class="color-white" style="font-size: 30px;">h1</p>
                <p>heading</p>
            </div>
            <div class="element">
                <p class="color-white" style="font-size: 30px;">h1</p>
                <p>heading</p>
            </div>
            <div class="element bg-dark-6">
                <p class="color-white" style="font-size: 30px;">h1</p>
                <p>heading</p>
            </div>
        </div>
     </div>
    </div>
    `
}

function btnActive(e, clsName, funs = {}, toggle = true) {
    const eCls = e.target.classList;
    clsName = 'js-' + clsName;
    const ele = $("." + clsName);

    if (eCls.contains(clsName)) {
        toggle && eCls.remove(clsName);
        funs.containsFun && funs.containsFun();
    } else {
        if (ele) {
            ele.classList.remove(clsName);
        }

        eCls.add(clsName);
        funs.elsefun && funs.elsefun();
    }

    funs.efun && funs.efun();
}

function img(e) {
    const popCls = domEle.popup.classList;

    btnActive(e, 'lbarActive', {
        containsFun: () => {
            popCls.add('d-none');

        },
        elsefun: () => {
            popCls.remove('d-none');
        }
    })

    //append child
    domEle.popBody.innerHTML = `
    <div class="image">
                        <div class="row search">
                            <input type="text" placeholder="unsplash images">
                            <button>search</button>
                        </div>

                        <div class="images">
                            ${loop()}
                        </div>
                    </div>
    `;

    function loop() {
        let text = '';
        for (let i = 1; i < 11; i++) {
            text += `<div class="img_wraper">
            <img src="assets/images/sample/${i}.jpg" draggable="false" loading="lazy" alt="">
            <div class="img_details">
                ${i}.jpg
            </div>
        </div>`
        }

        return text;
    }


}

function breakPoints(e, br = "xlg") {
    const rules = {
        sm: {
            min: 240,
            max: 480,
            d: 'max'
        },
        md: {
            min: 481,
            max: 768,
            d: 'max'
        },
        lg: {
            min: 769,
            max: 922,
            d: 'min'
        },
        xlg: {
            min: 923,
            max: 1280,
            d: 'min'
        }
    }

    btnActive(e, 'activeBreakPoint', {}, false)

    processIresize({
        w: rules[br][rules[br].d],
        s: 1
    });
    // console.log(rules[br][rules[br].d])

}

function nav(e) {
    const popCls = domEle.pop_box.classList;

    btnActive(e, 'activePopBox', {
        containsFun: () => {
            popCls.add('d-none');

        },
        elsefun: () => {
            popCls.remove('d-none');
        }
    })
    domEle.pop_box_body.innerHTML = `<nav>
        <a class="row" href="#">
            <img src="assets/images/user.svg" alt="">
            <p>About me</p>
        </a>
        <a class="row" href="#">
            <img src="assets/images/layers.svg" alt="">
            Showcase
        </a>
        <a class="row" href="#">
            Help??
        </a>
    </nav>`;

}


