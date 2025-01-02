import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useCallback, useRef, useState } from "react";

const isAuthenticated = true;

const Header = () => {
    // const [theme,setTheme] = useState<string>("dark");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLImageElement | null>(null);
    const router = useRouter();

    const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), [setMenuOpen]);

    // useEffect(() => {
    //     if (theme === "dark") {
    //         document.documentElement.classList.add("dark");
    //     } else {
    //         document.documentElement.classList.remove("dark");
    //     }
    // }, [theme]);

    // const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <div className="flex py-[22px] items-center relative">
            <div className="flex-1 justify-start gap-6 hidden lg:flex">
                <Image
                    src="/static/linmo-logo.svg"
                    alt="LINMO"
                    width={97}
                    height={24}
                    className="cursor-pointer"
                    onClick={() => router.push('/')}
                />
                <span className="border border-primary"></span>
                <p
                    className="text-bodyMd font-semibold text-secondary cursor-pointer"
                    onClick={() => router.push('/')}
                >
                    Explore
                </p>
                {isAuthenticated && (
                    <a
                        href="https://www.linmo.app/partnership/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Create"
                        className="text-bodyMd font-semibold text-secondary cursor-pointer"
                    >
                        Create
                    </a>
                )}
                {/* <p className="text-bodyMd font-semibold text-secondary cursor-pointer">
                    Sell
                </p> */}
            </div>
            <div className="flex-1 justify-end hidden lg:flex gap-4">
                {/* <div className="flex gap-4 items-center">
                    {isAuthenticated && (
                        <div className="bg-theme-box w-12 h-12 rounded-xl flex justify-center items-center">
                            <Image
                                src="/static/search.svg"
                                alt="Search"
                                width={20}
                                height={20}
                                className="cursor-pointer"
                            />
                        </div>
                    )}
                    <button
                        type="button"
                        className="bg-primary-button text-primary-button px-5 py-3 rounded-xl text-bodyMd font-semibold"
                    >
                        {isAuthenticated ? "Connect wallet" : "Login"}
                    </button>
                    {isAuthenticated && (
                        <div
                            data-calendar-toggle
                            className="bg-theme-box w-12 h-12 rounded-xl flex justify-center items-center cursor-pointer"
                        >
                            <Image
                                src="/static/cart.svg"
                                alt="Search"
                                width={20}
                                height={20}
                            />
                        </div>
                    )}
                </div> */}
                {/* <div
                    // onClick={toggleTheme}
                    className="flex items-center justify-between p-1 rounded-2xl bg-theme-box cursor-pointer"
                >
                    <div
                        className={`flex items-center justify-center p-3 rounded-xl transition-colors 
                            ${theme === "light" ? "bg-active-box shadow-sm" : "bg-theme-box"}`}
                    >
                        {theme === "light"
                            ? <Image
                                src="/static/sun.svg"
                                alt="Dark"
                                width={16}
                                height={16}
                            />
                            : <Image
                                src="/static/dark-sun.svg"
                                alt="Dark"
                                width={16}
                                height={16}
                            />}
                    </div>
                    <div
                        className={`flex items-center justify-center p-3 rounded-xl transition-colors 
                            ${theme === "dark" ? "bg-active-box shadow-sm" : "bg-theme-box"
                            }`}
                    >
                        {theme === "light"
                            ? <Image
                                src="/static/moon.svg"
                                alt="Light"
                                width={16}
                                height={16}
                            />
                            : <Image
                                src="/static/dark-moon.svg"
                                alt="Light"
                                width={16}
                                height={16}
                            />}
                    </div>
                </div> */}
            </div>
            <div className="flex lg:hidden justify-between w-full">
                <div className="flex gap-6 items-center">
                    <Image
                        src="/static/logo-mobile.svg"
                        alt="LINMO"
                        width={20}
                        height={16}
                        className="cursor-pointer"
                        onClick={() => router.push('/')}
                    />
                    <Image
                        src="/static/search.svg"
                        alt="Search"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                </div>
            </div>
            <Image
                src="/static/menu.svg"
                alt="Menu"
                width={24}
                height={24}
                className="cursor-pointer lg:hidden"
                onClick={toggleMenu}
                ref={buttonRef}
            />
            {menuOpen && (
                <nav
                    className="absolute top-full right-0 w-full bg-theme-box shadow-sm z-50 rounded-xl"
                    ref={menuRef}
                >
                    <ul className="flex flex-col p-4 gap-4">
                        <li>
                            <p className="text-bodyMd font-semibold text-secondary cursor-pointer">
                                Explore
                            </p>
                        </li>
                        {isAuthenticated && (
                            <li>
                                <p className="text-bodyMd font-semibold text-secondary cursor-pointer">
                                    Create
                                </p>
                            </li>
                        )}
                        {/* <li>
                            <p className="text-bodyMd font-semibold text-secondary cursor-pointer">
                                Sell
                            </p>
                        </li> */}
                        {/* <li>
                            <button
                                type="button"
                                className="bg-primary-button text-primary-button px-5 py-3 rounded-xl text-bodyMd font-semibold"
                            >
                                {isAuthenticated ? "Connect wallet" : "Login"}
                            </button>
                        </li> */}
                    </ul>
                </nav>
            )}
        </div>
    )
};

export default memo(Header);