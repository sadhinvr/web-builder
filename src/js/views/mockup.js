const make={};
 
/**
 * ************
 * 
 * 1.make the element in make object (add mockup)
 * 2.add to final htmlMockup 
 * 
 * ************
 */


//box
//  let nstyle="padding:30px;box-shadow:inset 0 0 5px"
 make.div=document.createElement('div');
//  make.div.style=nstyle;
 make.section=document.createElement('section');
//  make.section.style=nstyle;

 make.container=document.createElement('div');
 make.container.className="container";

 //text
 make.heading=document.createElement('h1');
 make.heading.innerText="this is a heading";

 make.paragraph=document.createElement('p');
 make.paragraph.innerText="this is a paragraph";

 make.link=document.createElement('a');
 make.link.href='javascript: void(0)';
 make.link.innerText="click me";

 //midia
 make.img=document.createElement('img');
 make.img.src="assets/picture.png";
 make.img.setAttribute('draggable','false');

 make.video=document.createElement('video');
 make.video.src="assets/video.mp4";
 make.video.controls='controls';

 make.audio=document.createElement('audio');
 make.audio.src='assets/audio.mp3';
 make.audio.controls='controls';

 
for(const i in make){
    make[i].setAttribute('data-drag','10');
}

 const htmlMockup = {
    div: make.div,
    section: make.section,
    container: make.container,
    heading: make.heading,
    paragraph: make.paragraph,
    img:make.img,
    video:make.video,
    audio:make.audio,
    link:make.link,

}


export {htmlMockup};