import { useEffect, useRef } from "react";

function Site() {
    const iframe = useRef<HTMLIFrameElement>(null);
    useEffect(() => {
        window.addEventListener('mousedown',e=>{
            console.log('hello kdjfdjk')
        })
        const idoc = iframe.current?.contentDocument;
        const iwin = iframe.current?.contentWindow;

        const btn = document.createElement('button');

        idoc?.body.append(btn);
    }, []);

    return <iframe ref={iframe}></iframe>;
}

export default Site;
