"use client";

import { memo } from "react"
import Image from "next/image";

import Header from "../common/header/header";
import Footer from "../common/footer/footer";

import { clubs } from "../constants";

const HomePage = () => {
    return (
        <>
            <div className="container z-10 relative bg-surface-bg">
                <Header />
            </div>
            <div className="flex flex-col md:flex-row gap-12 md:gap-0 h-[44.5rem] md:h-[27.5rem] xl:h-[34.375rem]">
                <div className="flex-1 pl-4 md:pl-6 lg:pl-10 xl:pl-20 pr-[1.875rem] pt-[3.75rem] md:pt-0 flex justify-center items-center">
                    <div className="flex flex-col gap-12">
                        <h2 className="text-headingLg xl:text-headingXl font-semibold text-primary">
                            Easily find sports and wellness activities.
                        </h2>
                        <div className="flex flex-col md:flex-row gap-4">
                            <button
                                type="button"
                                className="bg-primary-button text-primary-button px-5 py-3 rounded-xl text-bodyMd font-semibold flex gap-2 items-center justify-center"
                            >
                                Explore Clubs
                                <Image
                                    src="/static/arrow-right-black.svg"
                                    alt="Explore"
                                    width={16}
                                    height={16}
                                />
                            </button>
                            <button
                                type="button"
                                className="bg-surface-secondary-medium text-primary px-5 py-3 rounded-xl text-bodyMd font-semibold flex gap-2 items-center justify-center"
                            >
                                Find activities
                                <Image
                                    src="/static/arrow-right.svg"
                                    alt="Explore"
                                    width={16}
                                    height={16}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-5/12 h-full relative">
                    <div
                        className="bg-[url('/static/home-bg.svg')] bg-no-repeat h-full 
                    bg-[-28px] md:bg-[0px] xl:bg-center bg-[length:110%] md:bg-[length:160%] xl:bg-contain"
                    ></div>
                    <div
                        className="absolute top-0 right-0 w-full h-full md:bg-gradient-to-tr 
                        from-[#3C8CF4] from-60% via-[#27F998] to-[#CEEB20] md:opacity-10 md:backdrop-blur-[200px]"
                        style={{
                            maskImage: "radial-gradient(circle at top right, rgba(0,0,0,1) 37%, rgba(0,0,0,0) 55%)",
                            WebkitMaskImage: "radial-gradient(circle at top right, rgba(0,0,0,1) 37%, rgba(0,0,0,0) 55%)",
                        }}
                    ></div>
                </div>
            </div>
            <div className="container flex-col gap-10 flex pb-0 xl:pb-[3.75rem]">
                <div className="flex gap-4">
                    <div className="flex w-full bg-surface-hard gap-2.5 py-[18px] px-4 h-12 lg:h-14 justify-between items-center rounded-xl">
                        <input
                            type="text"
                            name="searchClubs"
                            id="searchClubs"
                            placeholder="Search for clubs"
                            className="focus:outline-none bg-transparent text-primary font-normal text-bodyMd"
                        />
                        <Image
                            src="/static/slash.svg"
                            alt="Search"
                            width={24}
                            height={24}
                        />
                    </div>
                    <div className="flex bg-surface-hard gap-2.5 md:py-4 md:px-6 justify-center items-center rounded-2xl h-12 md:h-auto w-12 md:w-auto cursor-pointer">
                        <h5 className="font-normal text-bodyMd text-primary hidden md:block">Trending</h5>
                        <Image
                            src="/static/down-bg.svg"
                            alt="Trending"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-6 md:pb-10">
                    {clubs.map((item, index) => (
                        <div key={index}
                            className="border border-primary rounded-2xl p-1.5 pb-3 cursor-pointer"
                        >
                            <div className="relative mb-8 md:mb-12">
                                <div className="rounded-xl overflow-hidden h-44 md:h-[13.5rem] xl:h-52">
                                    <Image
                                        src={item.clubImage}
                                        alt={item.title}
                                        width={0}
                                        height={0}
                                        className="w-full"
                                    />
                                </div>
                                <div
                                    className="absolute left-3 md:left-[0.563rem] transform -translate-y-1/2 
                                            w-12 h-12 md:w-16 md:h-16 rounded-2xl
                                            shadow-[0_0_0_1px_rgba(0,0,0,0.1)] flex items-center justify-center"
                                >
                                    <Image
                                        src={item.userImage}
                                        alt="User"
                                        width={0}
                                        height={0}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 px-1.5">
                                <h3 className="text-primary text-bodyXl font-semibold">
                                    {item.title}
                                </h3>
                                <div className="flex gap-2 items-center">
                                    <div className="flex items-center gap-1">
                                        <h6 className="text-bodyMd text-primary font-semibold">{item.rating}</h6>
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
                                        <h6 className="text-bodyMd text-primary font-semibold">({item.reviews})</h6>
                                    </div>
                                    <h6 className="text-bodyMd text-secondary font-normal">{item.members} members</h6>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <h6 className="text-bodySm text-tertiary font-medium">{item.distance}</h6>
                                    <Image
                                        src="/static/dot.svg"
                                        alt=""
                                        width={5}
                                        height={5}
                                    />
                                    <h6 className="text-bodySm text-tertiary font-medium">{item.location}.</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        </>
    );
}

export default memo(HomePage);