
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
            Rife
        </div>
        <div class="col color-white">
            Custom
        </div>
        <div class="col color-white">
            Vendor
        </div>
    </div>

    <div class="wraper">

    <div class="row"><p class="color-white">box</p></div>

        <div class="row">
            <div class="element" data-sb_ele="div">
                <img src="assets/images/div.svg"/>
                <p class="color-white">div</p>
            </div>
            <div class="element" data-sb_ele="section">
                <img src="assets/images/section.svg"/>
                <p class="color-white">section</p>
            </div>
            <div class="element" data-sb_ele="container">
                <img src="assets/images/frame.svg"/>
                <p class="color-white">.container</p>
            </div>
        </div>

        <div class="row"><p class="color-white">Text</p></div>

        <div class="row">
            <div class="element" data-sb_ele="heading">
                <img src="assets/images/heading.svg"/>
                <p class="color-white">h1</p>
            </div>
            <div class="element" data-sb_ele="paragraph">
                <img src="assets/images/paragraph.svg"/>
                <p class="color-white">p</p>
            </div>
            <div class="element" data-sb_ele="img">
                <img src="assets/images/image.svg"/>
                <p class="color-white">img</p>
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