import React from "react";
import { RiCloseFill } from "react-icons/ri"
import './Modal.scss'

type ModalProps = {
    isOpened: boolean,
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode,
    title?: string,
    closeButtonPresent?: boolean,
    closable?: boolean,
}
const Modal: React.FC<ModalProps> = ({ isOpened, setIsOpened, children, title, closeButtonPresent, closable=true }) => {
    return <>
        <div
            className={`modal-overlay fixed top-0 w-[100vw] h-[100vh] place-content-center z-index-50 dark:bg-black/10`}
            style={{ 
                display: isOpened ? "flex" : "none"
            }}
            onClick={() => 
                {if (closable) {
                    setIsOpened(false)
                }}
            }
        >
            
            <div 
                className="modal w-10/12 lg:w-6/12 m-auto p-4 md:p-8 rounded-lg z-index-50 bg-light1 dark:bg-dark3 dark:shadow-xl dark:shadow-black/25"
                onClick={event => event.stopPropagation()}>
                <div className="flex justify-between mb-4">
                    <h2>{title}</h2>
                    { closeButtonPresent && 
                    <button className="close-button style-none bg-transparent cursor-pointer" onClick={() => setIsOpened(false)}>
                        <RiCloseFill size={24} />
                    </button>
                    }
                </div>
                {children}
            </div>
        </div>
    </>
}

export default Modal