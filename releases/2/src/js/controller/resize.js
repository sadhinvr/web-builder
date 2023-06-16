import Action from "../models/Action";

const resizeFuns= {r:[],ir:[]}
const resize = new Action(window);

resize.on('resize',e=>{
    resizeFuns.r.forEach(cur=>cur());
})

resize.on('resize',e=>{
    resizeFuns.ir.forEach(cur=>cur());
},domEle.iwin);

export default resizeFuns;
