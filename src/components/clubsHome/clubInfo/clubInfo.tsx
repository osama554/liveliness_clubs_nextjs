import Image from "next/image";
import React from "react";
import { memo } from "react"

import IClubInfoProps from "./interfaces/IClubInfoProps";

const ClubInfo = (props: IClubInfoProps) => {
    const { desc, instagram, members, name, reviewCount, tiktok, userName, website, youtube } = props;

    const socialLinks = [
        { platform: "Instagram", url: instagram, icon: "/static/instagram.svg" },
        { platform: "YouTube", url: youtube, icon: "/static/youtube.svg" },
        { platform: "TikTok", url: tiktok, icon: "/static/twitter.svg" },
        { platform: "Website", url: website, icon: "/static/web.svg" },
    ];

    return (
        <React.Fragment>
            <div className="flex w-full justify-between gap-3 md:items-center flex-col md:flex-row">
                <div className="flex flex-col gap-2">
                    <h2 className="text-primary text-headingSm md:text-headingMd font-semibold">{name}</h2>
                    {userName.trim() && (
                        <p className="text-bodySm text-primary font-medium">@{userName}</p>
                    )}
                </div>
                <div className="flex gap-5">
                    {socialLinks.map(({ platform, url, icon }, index) => (
                        <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer w-7 h-7 flex justify-center items-center"
                            aria-label={platform}
                        >
                            <Image
                                src={icon}
                                alt={platform}
                                width={20}
                                height={20}
                            />
                        </a>
                    ))}
                </div>
            </div>
            <div className="w-full lg:w-3/4 xl:w-2/4">
                <p className="text-bodyMd text-secondary">{desc}</p>
            </div>
            <div className="flex gap-2 items-center">
                <div className="flex items-center gap-1">
                    {reviewCount > 0 && (
                        <h6 className="text-bodyMd text-primary font-semibold">
                            {reviewCount}
                        </h6>
                    )}
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, index) => {
                            const isFullStar = index < Math.floor(reviewCount);
                            const starType = isFullStar
                                ? "/static/star.svg"
                                : "/static/star-empty.svg";
                            return (
                                <Image
                                    key={index}
                                    src={starType}
                                    alt={`Star ${index + 1}`}
                                    width={9}
                                    height={9}
                                    className="w-3 h-3"
                                />
                            )
                        })}
                    </div>
                    {reviewCount > 0 && (
                        <h6 className="text-bodyMd text-primary font-semibold">({reviewCount})</h6>
                    )}
                </div>
                <Image
                    src="/static/dot.svg"
                    alt=""
                    width={5}
                    height={5}
                />
                <h6 className="text-bodyMd text-secondary font-normal">{members} members</h6>
            </div>
        </React.Fragment>
    )
}

export default memo(ClubInfo);