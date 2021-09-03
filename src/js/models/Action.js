export default class Action {
    constructor(ele = document.body) {
        this.ele = ele;
    }

    on(eName, f,ele=this.ele,uc = false) {
        ele.addEventListener(eName, f, uc);
        return this;
    }

    removeEvent(ele=this.ele,eName, f) {
        ele.removeEventListener(eName, f);
        return this;
    }

    mousePos(e) {
        if (!this.x) {
            this.x = e.clientX;
            this.y = e.clientY;
        }

        const obj = {
            x: e.clientX,
            y: e.clientY,
            rX: this.x - e.clientX,
            rY: this.y - e.clientY,
            bX: false,
            bY: false,
        }

        if (this.rX != obj.rX) {
            this.rX = obj.rX;
            obj.bX = true;
        }

        if (this.rY != obj.rY) {
            this.rY = obj.rY;
            obj.bY = true;
            console.log(obj);
        }


        this.rY = obj.rY;
        
        return obj;
    }

    resetPos() {
        this.on('mouseleave',e=>{
            this.x = undefined;
            this.y = undefined;
            console.log("reset");
        },document)
    }

    drag() {

    }

    drop() {

    }

}