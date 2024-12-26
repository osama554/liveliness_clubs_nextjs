"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { useSearchParams } from "next/navigation";

import { serverUrl, tabs } from "../constants";

import Header from "../common/header/header";
import ClubInfo from "./clubInfo/clubInfo";
import ClubEvents from "./clubEvents/clubEvents";
import ClubReviews from "./clubReviews/clubReviews";
import Sidebar from "../common/sidebar/sidebar";
import MonthCalendar from "../common/monthCalendar/monthCalendar";
import Footer from "../common/footer/footer";
import Shimmer from "../shimmer/shimmer";

import IResponseData from "@/app/interfaces/IResponseData";
import IEventModel from "./upcomingEventsList/interfaces/IEventModel";
import IReviewModel from "./clubReviews/interfaces/IReviewModel";

const ClubsHome = () => {
    const [activeTab, setActiveTab] = useState("Events");
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState<IEventModel[]>([]);
    const [allEvents, setAllEvents] = useState<IEventModel[]>([]);
    const [reviews, setReviews] = useState<IReviewModel[]>([]);
    const [loadedEvents, setLoadedEvents] = useState(25);
    const [searchQuery, setSearchQuery] = useState("");
    const searchParams = useSearchParams();

    const userId = searchParams.get("userId");
    const clubName = searchParams.get("clubName");
    const userName = searchParams.get("userName");
    const desciption = searchParams.get("desciption");
    const members = Number(searchParams.get("members")) || 0;
    const headerPhoto = searchParams.get("headerPhoto");
    const avatarPhoto = searchParams.get("avatarPhoto");
    const instagram = searchParams.get("instagram");
    const youtube = searchParams.get("youtube");
    const tiktok = searchParams.get("tiktok");
    const website = searchParams.get("website");

    const toggleFilters = useCallback(() => setIsFilterOpen((prev) => !prev), [setIsFilterOpen]);
    const closeSidebar = useCallback(() => setIsFilterOpen(false), [setIsFilterOpen]);

    const loadMoreEvents = useCallback(() => {
        const sourceEvents = searchQuery ? events : allEvents;
        const nextEvents = sourceEvents.slice(loadedEvents, loadedEvents + 25);
        setEvents((prevEvents) => [...prevEvents, ...nextEvents]);
        setLoadedEvents((prev) => prev + 25);
    }, [searchQuery, events, allEvents, loadedEvents]);

    const getEvents = useCallback(async () => {
        if (!userId) return;

        setIsLoading(true);
        try {
            const path = `${serverUrl}/event/admin/${userId}`;
            const response = await fetch(path, {
                method: "GET"
            });

            if (response.ok) {
                const data: IResponseData<IEventModel> = await response.json();
                let events = data.data;

                events = events.filter((event) => !event.deleted &&
                    moment(event.trainingStartDateTime).isSameOrAfter(moment(), 'day'));

                setAllEvents(events);
                setEvents(events.slice(0, 25));
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
        getEvents();
    }, [userId, getEvents]);

    const getReviews = useCallback(async () => {
        if (!userId) return;
        setIsLoading(true);
        try {
            const path = `${serverUrl}/reviews/getAll/${userId}`;
            const response = await fetch(path, {
                method: "GET"
            });

            if (response.ok) {
                const data: IResponseData<IReviewModel> = await response.json();
                const reviews = data.data;
                console.log(reviews)

                setReviews(reviews.slice(0, 25));
                setIsLoading(false);
                return { data: reviews };
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
        getReviews();
    }, [userId, getReviews]);

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews || 0;

    const handleReset = useCallback(() => {
        setSelectedDate(null);
    }, []);

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
                        allEventsLength={allEvents.length}
                        eventsLength={events.length}
                        loadedEvents={loadedEvents}
                        searchQuery={searchQuery}
                        loadMoreEvents={loadMoreEvents}
                    />
                );
            case "Reviews":
                return <ClubReviews reviews={reviews} loading={isLoading} />
            default:
                return (
                    <ClubEvents
                        events={filteredEvents}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        loading={isLoading}
                        allEventsLength={allEvents.length}
                        eventsLength={events.length}
                        loadedEvents={loadedEvents}
                        searchQuery={searchQuery}
                        loadMoreEvents={loadMoreEvents}
                    />
                )
        }
    };

    return (
        <>
            <div className=" container z-10 sticky top-0 bg-surface-bg">
                <Header />
            </div>
            <div className="container">
                {isLoading ? (
                    <div className="w-full relative mb-[4.5rem] md:mb-[5.5rem]">
                        <Shimmer height="300px" />
                        <div
                            className="absolute left-2 md:left-6 transform -translate-y-1/2 
                w-20 h-20 md:w-[7.5rem] md:h-[7.5rem] rounded-2xl overflow-hidden 
                shadow-[0_0_0_1px_rgba(0,0,0,0.1)] flex items-center justify-center"
                        >
                            <Shimmer height="7.5rem" />

                        </div>
                    </div>
                ) : (
                    <div className="w-full relative mb-[4.5rem] md:mb-[5.5rem]">
                        <div className="rounded-xl overflow-hidden h-[198px] md:h-[300px] xl:h-[380px]">
                            <Image
                                src={headerPhoto || ''}
                                alt="Header"
                                width={1280}
                                height={380}
                                className="w-full h-full object-cover rounded-xl"
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
                                className="w-full rounded-2xl"
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="container">
                <div className="flex flex-col gap-3 md:gap-6">
                    <ClubInfo
                        name={clubName || ''}
                        userName={userName || ''}
                        desc={desciption || ''}
                        members={members}
                        reviewCount={averageRating}
                        instagram={instagram || ''}
                        youtube={youtube || ''}
                        tiktok={tiktok || ''}
                        website={website || ''}
                        loading={isLoading}
                        totalReviews={totalReviews}
                    />
                    <div className="flex flex-col lg:flex-row gap-2 xl:pt-4">
                        <div className="w-full lg:w-[391px] flex flex-col">
                            <div className="flex gap-4 items-center max-w-full xl:max-w-[379px] xl:mb-4">
                                {/* <div
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
                                </div> */}
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
                    <Footer />
                </div>
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
                        <div className="flex flex-col gap-2">
                            <button
                                type="button"
                                className="bg-primary-button text-primary-button px-5 py-3 rounded-xl text-bodyMd font-semibold"
                                onClick={() => selectedDate && closeSidebar()}
                            >
                                Apply
                            </button>
                            <button
                                type="button"
                                className="bg-transparent text-primary px-5 py-3 rounded-xl text-bodyMd font-semibold"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </Sidebar>
            )}
        </>
    )
}

export default memo(ClubsHome);