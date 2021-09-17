import Action from "../models/Action";
import Box from "../views/Box";

const imouseover= new Action(domEle.idoc.body);

//hover box
const hBox= new Box('1px solid dodgerblue');

//selected box

imouseover.on('mouseenter',e=>{
    hBox.crud({append:true});
},domEle.idoc);

imouseover.on('mouseover',e=>{
    //hover box
    hBox.boxStyle(e.target);

    //selected box
})
