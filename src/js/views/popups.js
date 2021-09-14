
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
            <div class="element" data-sb_ele="heading">
                <p class="color-white" style="font-size: 30px;">h1</p>
                <p>heading</p>
            </div>
            <div class="element" data-sb_ele="paragraph">
                <p class="color-white" style="font-size: 30px;">p</p>
                <p>paragraph</p>
            </div>
            <div class="element" data-sb_ele="img">
                <p class="color-white" style="font-size: 30px;">img</p>
                <p>image</p>
            </div>
        </div>
     </div>
    </div>
    `
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
            <img src="assets/images/sample/resized/${i}.jpg" draggable="false" loading="lazy" alt="">
            <div class="img_details">
                ${i}.jpg
            </div>
        </div>`
        }

        return text;
    }


}

export {eleBar,img}