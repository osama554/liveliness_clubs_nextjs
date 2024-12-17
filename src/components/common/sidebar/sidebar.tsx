import Image from "next/image";
import { memo, useEffect, useRef } from "react"

import ISidebarProps from "./interfaces/ISidebarProps";

const Sidebar = (props: ISidebarProps) => {
    const { children, isOpen, onClose } = props;

    const sidebarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div
            ref={sidebarRef}
            className={`fixed top-[5.72rem] right-0 md:right-[1.5rem] bottom-0 md:bottom-6 w-full md:w-[22.75rem] xl:w-[28.813rem] rounded-2xl bg-balticSea 
                z-50 transition-transform duration-500 ease-in-out flex flex-col
                ${isOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"}`}
        >
            <div className="flex flex-col">
                <div className="flex justify-between p-4 items-center">
                    <h3 className="text-headingSm font-normal text-primary">
                        Select Sports
                    </h3>
                    <Image
                        src="/static/close.svg"
                        alt="Close"
                        width={48}
                        height={48}
                        onClick={onClose}
                        className="cursor-pointer"
                    />
                </div>
            </div>
            <div className="px-4 py-3 flex flex-1">
                {children}
            </div>
        </div>
    )
}

export default memo(Sidebar);