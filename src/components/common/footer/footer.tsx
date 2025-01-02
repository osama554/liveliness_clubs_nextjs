import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo } from "react"

const Footer = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-10 pb-6 md:pb-[3.75rem]">
            <div className="pt-[3.75rem] flex flex-col md:flex-row gap-10 md:gap-0 justify-between">
                <div>
                    <Image
                        src="/static/linmo-logo.svg"
                        alt="LINMO"
                        width={97}
                        height={24}
                        className="cursor-pointer"
                        onClick={() => router.push('/')}
                    />
                </div>
                <div className="flex gap-10 md:gap-0 justify-start md:justify-end items-center flex-wrap">
                    <div className="flex flex-col gap-3 w-[11.771rem]">
                        <h4 className="text-primary text-bodyLg font-semibold">Marketplace</h4>
                        <p
                            className="text-bodyMd font-normal text-secondary cursor-pointer"
                            onClick={() => router.push('/')}
                        >
                            Explore
                        </p>
                        <a
                            href="https://www.linmo.app/partnership/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Create"
                            className="text-bodyMd font-normal text-secondary cursor-pointer"
                        >
                            Create your Club
                        </a>
                        <a
                            href="https://www.linmo.app/how-to-use/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Help"
                            className="text-bodyMd font-normal text-secondary cursor-pointer"
                        >
                            Help
                        </a>
                    </div>
                    <div className="flex flex-col gap-3 w-[11.771rem]">
                        <h4 className="text-primary text-bodyLg font-semibold">About</h4>
                        <a
                            href="https://www.linmo.app/how-to-use/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="How to Use"
                            className="text-bodyMd font-normal text-secondary cursor-pointer">
                            How to Use
                        </a>
                        <a
                            href="https://www.linmo.app/updates/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="What&apos;s New"
                            className="text-bodyMd font-normal text-secondary cursor-pointer">
                            What&apos;s New
                        </a>
                        <a
                            href="https://www.linmo.app/how-to-use/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Contact"
                            className="text-bodyMd font-normal text-secondary cursor-pointer">
                            Contact
                        </a>
                    </div>
                    <div className="flex flex-col gap-3 w-[11.771rem]">
                        <h4 className="text-primary text-bodyLg font-semibold">Socials</h4>
                        <a
                            href="https://www.instagram.com/linmo.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="text-bodyMd font-normal text-secondary cursor-pointer">
                            Instagram
                        </a>
                        <a
                            href="https://www.youtube.com/@linmoapp"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Youtube"
                            className="text-bodyMd font-normal text-secondary cursor-pointer">
                            Youtube
                        </a>
                        <a
                            href="https://www.linkedin.com/company/linmoapp"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Linkedin"
                            className="text-bodyMd font-normal text-secondary cursor-pointer">
                            Linkedin
                        </a>
                    </div>
                </div>
            </div>
            <div className="py-10 border-t border-b border-primary flex flex-col md:flex-row items-center gap-10 md:gap-0">
                <div className="flex flex-col gap-3 w-full md:w-2/4 lg:w-[74%]">
                    <h3 className="text-bodyXl font-medium text-primary">
                        Join our newsletter
                    </h3>
                    <p className="text-bodyLg font-normal text-secondary">
                        Keep up to date with us
                    </p>
                </div>
                <div className="w-full md:w-2/4 lg:w-[36%] flex gap-3">
                    <input
                        type="text"
                        placeholder="Enter your email address"
                        className="focus:outline-none bg-surface-hard py-2 px-4 rounded-xl text-tertiary font-normal text-bodyLg flex-1"
                    />
                    <button className="bg-primary-button text-primary-button px-5 py-3 rounded-xl text-bodyMd font-semibold">
                        Submit
                    </button>
                </div>
            </div>
            <div className="flex justify-between flex-col md:flex-row gap-6 items-center">
                <p className="text-tertiary text-bodySm font-normal">
                    © Copyright 2023 verona, Inc. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <p className="text-bodySm text-tertiary font-normal cursor-pointer">
                        Terms of Service
                    </p>
                    <p className="text-bodySm text-tertiary font-normal cursor-pointer">
                        Privacy Policy
                    </p>
                    <p className="text-bodySm text-tertiary font-normal cursor-pointer">
                        Cookies
                    </p>
                </div>
            </div>
        </div>
    );
}

export default memo(Footer);