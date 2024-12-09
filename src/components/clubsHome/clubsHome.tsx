"use client";

import { memo, useState } from "react";
import Image from "next/image";

import { dummyEvents, tabs } from "../constants";

import Header from "../common/header/header";
import ClubInfo from "./clubInfo/clubInfo";
import ClubEvents from "./clubEvents/clubEvents";
import ClubReviews from "./clubReviews/clubReviews";

const ClubsHome = () => {
    const [activeTab, setActiveTab] = useState("Reviews");
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const renderContent = () => {
        switch (activeTab) {
            case "Deals":
                return <ClubEvents events={dummyEvents} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />;
            case "Events":
                return <ClubEvents events={dummyEvents} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />;
            case "Reviews":
                return <ClubReviews />
            default:
                return <ClubEvents events={dummyEvents} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />;
        }
    };

    return (
        <div className="container">
            <Header />
            <div className="w-full relative mb-[4.5rem] md:mb-[5.5rem]">
                <div className="rounded-xl overflow-hidden">
                    <Image
                        src="/static/clubHeader.svg"
                        alt="Header"
                        width={0}
                        height={0}
                        className="w-full"
                    />
                </div>
                <div
                    className="absolute left-2 md:left-6 transform -translate-y-1/2 
                w-20 h-20 md:w-[7.5rem]  md:h-[7.5rem] bg-surface-bg rounded-2xl border border-primary
                shadow-[0_0_0_1px_rgba(0,0,0,0.1)] flex items-center justify-center"
                >
                    <Image
                        src="/static/userImagePlaceholder.svg"
                        alt="User"
                        width={120}
                        height={120}
                        className="w-full"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3 md:gap-6">
                <ClubInfo />
                <div className="flex flex-col lg:flex-row gap-2 xl:pt-4">
                    <div className="w-full md:w-[391px] flex md:hidden xl:flex flex-col">
                        <div className="flex gap-4 items-center max-w-full md:max-w-[379px] mb-4">
                            <div className="hidden xl:flex bg-surface-hard gap-2.5 py-4 px-6 justify-center items-center rounded-2xl h-12 lg:h-14">
                                <h5 className="font-normal text-bodyMd text-primary">Filters</h5>
                                <Image
                                    src="/static/filters.svg"
                                    alt="Filters"
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <div className="flex p-1 bg-surface-hard rounded-2xl h-14 w-full">
                                {tabs.map((tab, index) => (
                                    <div
                                        key={index}
                                        className={`py-3.5 px-4 rounded-xl cursor-pointer flex-1 justify-center items-center 
                                        ${activeTab === tab ? "bg-active-box" : "bg-surface-hard"}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        <h5
                                            className={`text-bodyMd text-center ${activeTab === tab
                                                ? "text-primary font-medium"
                                                : "text-secondary font-normal"}`}
                                        >
                                            {tab}
                                        </h5>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex">
                        <div className="flex gap-3 w-full items-center">
                            <div className="flex w-full bg-surface-hard gap-2.5 py-[18px] px-4 h-12 lg:h-14 justify-between items-center rounded-xl xl:mb-4">
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
                            <div className="hidden sm:flex xl:hidden bg-surface-hard gap-2.5 py-4 px-6 justify-center items-center rounded-2xl h-12">
                                <h5 className="hidden md:block font-normal text-bodyMd text-primary">Filters</h5>
                                <Image
                                    src="/static/filters.svg"
                                    alt="Filters"
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <div className="w-12 overflow-hidden flex sm:hidden bg-surface-hard gap-2.5 justify-center items-center rounded-2xl h-12">
                                <Image
                                    src="/static/filters.svg"
                                    alt="Filters"
                                    width={16}
                                    height={16}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {renderContent()}
            </div>
        </div>
    )
}

export default memo(ClubsHome);