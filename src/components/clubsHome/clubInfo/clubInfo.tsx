import Image from "next/image";
import React from "react";
import { memo } from "react"

import { socials } from "@/components/constants";

const ClubInfo = () => (
    <React.Fragment>
        <div className="flex w-full justify-between gap-3 md:items-center flex-col md:flex-row">
            <div className="flex flex-col gap-2">
                <h2 className="text-primary text-headingSm md:text-headingMd font-semibold">Running Club</h2>
                <p className="text-bodySm text-primary font-medium">@terrykors123</p>
            </div>
            <div className="flex gap-5">
                {socials.map((icon, index) => {
                    const altText = icon.split("/").pop()?.split(".")[0] || "social-icon";
                    return (
                        <div
                            key={index}
                            className="cursor-pointer w-7 h-7 flex justify-center items-center"
                        >
                            <Image
                                src={icon}
                                alt={altText.charAt(0).toUpperCase() + altText.slice(1)}
                                width={20}
                                height={20}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
        <div className="w-full lg:w-3/4 xl:w-2/4">
            <p className="text-bodyMd text-secondary">
                Terry specializes in personal and professional development, leadership coaching,
                and professional development, leadership coaching professional development, leadership coaching
            </p>
        </div>
        <div className="flex gap-2 items-center">
            <div className="flex items-center gap-1">
                <h6 className="text-bodyMd text-primary font-semibold">4.5</h6>
                <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            src="/static/star.svg"
                            alt={`Star ${index + 1}`}
                            width={9}
                            height={9}
                            className="w-3 h-3"
                        />
                    ))}
                </div>
                <h6 className="text-bodyMd text-primary font-semibold">(23)</h6>
            </div>
            <Image
                src="/static/dot.svg"
                alt=""
                width={5}
                height={5}
            />
            <h6 className="text-bodyMd text-secondary font-normal">199 members</h6>
        </div>
    </React.Fragment>
)

export default memo(ClubInfo);