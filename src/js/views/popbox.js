function viewSiteNav(e) {
    const popCls = domEle.pop_box.classList;
    const popstyle = domEle.pop_box.style;
    const eRect = e.target.getBoundingClientRect();
    popstyle.top= eRect.bottom+'px';
    popstyle.left= eRect.right+'px';

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

export {viewSiteNav}