import resizeFuns from "../controller/resize";

export default class Box {
    constructor(bor = '', bg = '') {
        this.bor = bor;
        this.bg = bg;
        this.initBox();
    }

    initBox() {
        this.box = document.createElement('div');
        this.box.setAttribute('focusable', "false");
        this.box.style = `position:absolute;pointer-events: none;`;
        this.bor && (this.box.style.border = this.bor);
        this.bg && (this.box.style.background = this.bg);

        resizeFuns.ir.push(()=>this.boxStyle());
    }

    boxStyle(et) {
        et && (this.ele = et);
        if (!this.ele)
            return;
        const style = this.ele.currentStyle || window.getComputedStyle(this.ele);
        const ds = {
            width: this.ele.offsetWidth,
            height: this.ele.offsetHeight,
            margin1: parseFloat(style.marginLeft) + parseFloat(style.marginRight),
            margin2: parseFloat(style.marginTop) + parseFloat(style.marginBottom),
            padding: parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
            border: parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth)
        };

        this.box.style.top = this.ele.offsetTop - parseFloat(style.marginTop) + 'px';
        this.box.style.left = this.ele.offsetLeft - parseFloat(style.marginLeft) + 'px';

        this.box.style.width = ds.width + ds.margin1 + 'px';
        this.box.style.height = ds.height + ds.margin2 + 'px';

        if (this.ele == domEle.idoc.body) {
            this.box.style.top = this.ele.offsetTop + 'px';
            this.box.style.left = this.ele.offsetLeft + 'px';
        }

        // const style = window.getComputedStyle(domEle.idoc.body);
        // const rect = this.ele.getBoundingClientRect();
        // const bs = this.box.style;
        // console.log(rect);

        // // bs.width = rect.width + 'px';
        // // bs.height = rect.height + 'px';
        // this.ele== domEle.idoc.body ?bs.inset='0px 0px 0px 0px':bs.inset = `${rect.top}px ${rect.bottom}px ${rect.right}px ${rect.left}px`;

    }

    crud(obj = {
        del: false,
        append: false,
        dis: ''
    }) {
        obj.del && this.box.remove();
        obj.append && domEle.idev.appendChild(this.box);
        obj.dis && (this.box.style.display = obj.dis);
    }

}