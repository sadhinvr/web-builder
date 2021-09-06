import Action from "../models/Action";

const clickAction = new Action(domEle.body);

clickAction.on('click', e => {
    // console.log('click');

    // console.log(e.target);
    if ([...domEle.btns].includes(e.target)) {
        e.target.classList.contains('js-elebar') && eleBar();
    }

});

function eleBar() {
    //display popup(left-side)
    domEle.popup.classList.toggle('d-none');

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