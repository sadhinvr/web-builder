import { useEffect, useRef, useState } from "react";
import Element from "./Element";

function AddElement(props: { activeOption: Number }) {
    const [floating, setFloating] = useState(-1);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const elements = [
        {
            name: "Div",
            icon: (
                <svg
                    viewBox='0 0 64 64'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M47 17H17V47H47V17ZM17 16C16.4477 16 16 16.4477 16 17V47C16 47.5523 16.4477 48 17 48H47C47.5523 48 48 47.5523 48 47V17C48 16.4477 47.5523 16 47 16H17Z'
                        fill='currentColor'
                    ></path>
                </svg>
            ),
            raw: { tagName: "div", props: [], child: [] },
        },

        {
            name: "Paragraph",
            icon: (
                <svg
                    viewBox='0 0 64 64'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M47 17H17V47H47V17ZM17 16C16.4477 16 16 16.4477 16 17V47C16 47.5523 16.4477 48 17 48H47C47.5523 48 48 47.5523 48 47V17C48 16.4477 47.5523 16 47 16H17Z'
                        fill='currentColor'
                    ></path>
                </svg>
            ),
            raw: { tagName: "p", props: [], child: ["this is a pragraph."] },
        },
    ];

    const mhandle = (e: MouseEvent) => {
        console.log("mouse move ");
        e.preventDefault();
        setPos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (id: number) => {
        console.log(id);
        return () => {
            setFloating(id);
            window.addEventListener("mousemove", mhandle);
        };
    };

    useEffect(() => {
        console.log('use effects ')
        window.addEventListener("mouseup", (e) => {
            setFloating(-1);
            // window.removeEventListener("mousemove", mhandle);
            console.log("up");
        });
    }, []);

    return (
        <div
            className='addElement'
            style={props.activeOption == 2 ? {} : { display: "none" }}
        >
            <div className='addElement_heading'>Structure</div>
            <div className='elements'>
                {elements.map((cur, i) => {
                    return (
                        <Element
                            id={i}
                            key={cur.name}
                            icon={cur.icon}
                            name={cur.name}
                            click={handleClick}
                        ></Element>
                    );
                })}
            </div>

            <div className='floating' style={{ left: pos.x, top: pos.y }}>
                {floating != -1 ? (
                    <div className='element'>
                        <div className='ele_icon'>
                            {elements[floating].icon}
                        </div>
                        <div className='ele_name'>
                            {elements[floating].name}
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default AddElement;
