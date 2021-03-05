import {mousedown} from '../models/drag';

 const make={};
 
 //box
 let nstyle="padding:30px;box-shadow:inset 0 0 5px"
 make.div=document.createElement('div');
 make.div.style=nstyle;
 make.section=document.createElement('section');
 make.section.style=nstyle;

 make.container=document.createElement('div');
 make.container.className="container";

 //text
 make.heading=document.createElement('h1');
 make.heading.innerText="this is the heading";

 make.paragraph=document.createElement('p');
 make.paragraph.innerText="this is the paragraph";

 //midia
 make.img=document.createElement('img');
 make.img.src="assets/picture.svg";
 make.img.setAttribute('draggable','false')
 
for(const i in make){
    make[i].setAttribute('data-drag','10');
    // console.log(make[i]);
}

 const htmlMockup = {
    div: make.div,
    section: make.section,
    container: make.container,
    heading: make.heading,
    paragraph: make.paragraph,
    img:make.img,

}

export {htmlMockup};