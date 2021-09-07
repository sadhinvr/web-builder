import Action from "../models/Action";

const clickAction = new Action(domEle.body);

clickAction.on('click', e => {
    // console.log('click');

    // console.log(e.target);
    if ([...domEle.btns].includes(e.target)) {
        e.target.classList.contains('js-elebar') && eleBar(e);
        e.target.classList.contains('js-img') && img(e);
    }

});


function eleBar(e) {
    const eCls = e.target.classList;
    const popCls = domEle.popup.classList;
    const ele = $('.js-lbarActive');

    if(eCls.contains('js-lbarActive')){
        popCls.add('d-none');
        eCls.remove('js-lbarActive');
    }else{
        if(ele){
            ele.classList.remove('js-lbarActive');
        }

        popCls.remove('d-none');
        eCls.add('js-lbarActive');
    }


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

function img(e){
    const eCls = e.target.classList;
    const popCls = domEle.popup.classList;
    const ele = $('.js-lbarActive');

    if(eCls.contains('js-lbarActive')){
        popCls.add('d-none');
        eCls.remove('js-lbarActive');
    }else{
        if(ele){
            ele.classList.remove('js-lbarActive');
        }

        popCls.remove('d-none');
        eCls.add('js-lbarActive');
    }

    //append child
    domEle.popBody.innerHTML =`
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

    function loop(){
        let text = '';
        for(let i = 1;i<11;i++){
            text+=`<div class="img_wraper">
            <img src="assets/images/sample/${i}.jpg" draggable="false" loading="lazy" alt="">
            <div class="img_details">
                ${i}.jpg
            </div>
        </div>`
        }

        return text;
    }
}