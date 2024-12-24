"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { serverUrl, tabs } from "../constants";

import Header from "../common/header/header";
import ClubInfo from "./clubInfo/clubInfo";
import ClubEvents from "./clubEvents/clubEvents";
import ClubReviews from "./clubReviews/clubReviews";
import Sidebar from "../common/sidebar/sidebar";
import MonthCalendar from "../common/monthCalendar/monthCalendar";

import IEventModel from "./interfaces/IEventModel";
import IResponseData from "@/app/interfaces/IResponseData";

const ClubsHome = () => {
    const [activeTab, setActiveTab] = useState("Events");
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState<IEventModel[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const searchParams = useSearchParams();

    const userId = searchParams.get("userId");
    const clubName = searchParams.get("clubName");
    const userName = searchParams.get("userName");
    const desciption = searchParams.get("desciption");
    const members = searchParams.get("members");
    const reviewCount = Number(searchParams.get("reviewCount")) || 0;
    const headerPhoto = searchParams.get("headerPhoto");
    const avatarPhoto = searchParams.get("avatarPhoto");
    const instagram = searchParams.get("instagram");
    const youtube = searchParams.get("youtube");
    const tiktok = searchParams.get("tiktok");
    const website = searchParams.get("website");

    const toggleFilters = useCallback(() => setIsFilterOpen((prev) => !prev), [setIsFilterOpen]);
    const closeSidebar = useCallback(() => setIsFilterOpen(false), [setIsFilterOpen]);

    const getEvents = useCallback(async () => {
        setIsLoading(true);
        try {
            const path = `${serverUrl}/event/admin/${userId}`;
            const response = await fetch(path, {
                method: "GET"
            });

            if (response.ok) {
                const data: IResponseData<IEventModel> = await response.json();
                const events = data.data;
                setEvents(events);

                setIsLoading(false);
                return { data: events };
            } else {
                return { error: "Something went wrong" };
            }
        } catch (error) {
            console.log(error)
            return { error: "An unknown error occurred" };
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId?.trim()) {
            getEvents();
        }
    }, [userId, getEvents]);

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderContent = () => {
        switch (activeTab) {
            case "Deals":
            case "Events":
                return (
                    <ClubEvents
                        events={filteredEvents}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        loading={isLoading}
                    />
                );
            case "Reviews":
                return <ClubReviews />
            default:
                return (
                    <ClubEvents
                        events={filteredEvents}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        loading={isLoading}
                    />
                )
        }
    };

    return (
        <div className="container">
            <Header />
            <div className="w-full relative mb-[4.5rem] md:mb-[5.5rem]">
                <div className="rounded-xl overflow-hidden h-[198px] md:h-[300px] xl:h-[380px]">
                    <Image
                        src={headerPhoto || ''}
                        alt="Header"
                        width={1280}
                        height={380}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div
                    className="absolute left-2 md:left-6 transform -translate-y-1/2 
                w-20 h-20 md:w-[7.5rem] md:h-[7.5rem] rounded-2xl overflow-hidden 
                shadow-[0_0_0_1px_rgba(0,0,0,0.1)] flex items-center justify-center"
                >
                    <Image
                        src={avatarPhoto || ''}
                        alt="User"
                        width={120}
                        height={120}
                        className="w-full"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3 md:gap-6">
                <ClubInfo
                    name={clubName || ''}
                    userName={userName || ''}
                    desc={desciption || ''}
                    members={members || ''}
                    reviewCount={reviewCount}
                    instagram={instagram || ''}
                    youtube={youtube || ''}
                    tiktok={tiktok || ''}
                    website={website || ''}
                />
                <div className="flex flex-col lg:flex-row gap-2 xl:pt-4">
                    <div className="w-full lg:w-[391px] flex flex-col">
                        <div className="flex gap-4 items-center max-w-full xl:max-w-[379px] xl:mb-4">
                            <div
                                className="hidden xl:flex bg-surface-hard gap-2.5 py-4 px-6 justify-center items-center rounded-2xl h-12 lg:h-14 cursor-pointer"
                                onClick={toggleFilters}
                            >
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
                    <div className="flex gap-4 flex-1">
                        <div className="flex w-full bg-surface-hard gap-2.5 py-[18px] px-4 h-12 lg:h-14 justify-between items-center rounded-xl">
                            <input
                                type="text"
                                name="searchEvents"
                                id="searchEvents"
                                placeholder="Search for events"
                                className="focus:outline-none bg-transparent text-primary font-normal text-bodyMd"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Image
                                src="/static/slash.svg"
                                alt="Search"
                                width={24}
                                height={24}
                            />
                        </div>
                        <div
                            className="flex bg-surface-hard gap-2.5 md:py-4 md:px-6 justify-center items-center rounded-2xl h-12 lg:h-14 w-12 md:w-auto cursor-pointer"
                            onClick={toggleFilters}
                        >
                            <h5 className="font-normal text-bodyMd text-primary hidden md:block">Filters</h5>
                            <Image
                                src="/static/filtersSmall.svg"
                                alt="Filter"
                                className="block md:hidden"
                                width={16}
                                height={16}
                            />
                            <Image
                                src="/static/filters.svg"
                                alt="Sports"
                                width={24}
                                height={24}
                                className="hidden md:block"
                            />
                        </div>
                    </div>
                </div>
                {renderContent()}
            </div>
            {isFilterOpen && (
                <Sidebar isOpen={isFilterOpen} heading="Select Date" onClose={closeSidebar}>
                    <div className="flex flex-col justify-between flex-1">
                        <div className="flex flex-wrap gap-4">
                            <MonthCalendar
                                events={events}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                inSidebar={true}
                            />
                        </div>
                        <button
                            type="button"
                            className="bg-primary-button text-primary-button px-5 py-3 rounded-xl text-bodyMd font-semibold"
                        >
                            Apply
                        </button>
                    </div>
                </Sidebar>
            )}
        </div>
    )
}

export default memo(ClubsHome);