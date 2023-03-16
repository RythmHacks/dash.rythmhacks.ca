import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri"
import './Modal.scss'

type ModalProps = {
    isOpened: boolean,
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode,
    closeButtonPresent: boolean
}
const Modal: React.FC<ModalProps> = ({ isOpened, setIsOpened, children, closeButtonPresent }) => {
    return <>
        <div
            className="modal-overlay absolute w-full h-full place-content-center z-index-50 bg-black/10"
            style={{ 
                display: isOpened ? "flex" : "none"
            }}
        >
            <div 
                className="modal w-8/12 h-5/6 min-w-96 m-auto p-4 rounded-lg z-index-50 bg-[#202430] shadow-xl shadow-black/25" 
            >
                {children}
                { closeButtonPresent && 
                    <button className="close-button style-none bg-transparent" onClick={() => setIsOpened(false)}>
                        <RiCloseFill size={24} />
                    </button>
                }
            </div>
        </div>
    </>
}

export default Modal