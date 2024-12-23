"use client";

import { memo, useCallback, useEffect, useState } from "react"
import Image from "next/image";
import { useRouter } from "next/navigation";

import Header from "../common/header/header";
import Footer from "../common/footer/footer";
import Sidebar from "../common/sidebar/sidebar";

import { categories } from "../constants";
import IResponseData from "@/app/interfaces/IResponseData";
import IClubModel from "./interfaces/IClubResponse";

const serverUrl = "https://prod-ts-liveliness-server.onrender.com/api";

const HomePage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [clubs, setClubs] = useState<IClubModel[]>([]);
    const [allClubs, setAllClubs] = useState<IClubModel[]>([]);
    const [loadedClubs, setLoadedClubs] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const toggleFilters = useCallback(() => setIsFilterOpen((prev) => !prev), [setIsFilterOpen]);
    const closeSidebar = useCallback(() => setIsFilterOpen(false), [setIsFilterOpen]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory((prev) => (prev === category ? null : category));
    };

    const getAllClubs = async (sport: string) => {
        setIsLoading(true);
        try {
            const path = `${serverUrl}/club/getAllClubsForCommunitySport`;
            const response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sport }),
            });

            if (response.ok) {
                const data: IResponseData<IClubModel> = await response.json();
                const clubs = data.data;

                clubs.sort((a, b) => b.participants.length - a.participants.length);
                setAllClubs(clubs);
                setClubs(clubs.slice(0, 20));
                setIsLoading(false);
                return { data: clubs };
            } else {
                return { error: "Something went wrong" };
            }
        } catch (error) {
            console.log(error)
            return { error: "An unknown error occurred" };
        } finally {
            setIsLoading(false);
        }
    };

    const loadMoreClubs = () => {
        const nextClubs = allClubs.slice(loadedClubs, loadedClubs + 20);
        setClubs((prevClubs) => [...prevClubs, ...nextClubs]);
        setLoadedClubs((prev) => prev + 20);
    };

    const handleApplyFilter = () => {
        if (selectedCategory) {
            getAllClubs(selectedCategory);
        }
        closeSidebar();
    };

    const handleClubClick = (club: IClubModel) => {
        router.push(`/clubs?userId=${club.adminId}&clubName=${club.name}&userName=${club.username}&desciption=${club.bio}&members=${club.participants.length}`);
    };

    useEffect(() => {
        getAllClubs('');
    }, []);

    return (
        <>
            <div className=" container z-10 relative bg-surface-bg">
                <Header />
            </div>
            <div className="flex h-full md:h-[27.5rem] xl:h-[34.375rem] lg:bg-[url('/static/home-bg.svg')] bg-no-repeat 
            lg:bg-[center_right_-14.375rem] xl:bg-[center_right] min-[2600px]:bg-[center_right_30%] bg-auto w-full">
                <div className="container">
                    <div className="flex flex-col gap-14 md:gap-12 w-full md:w-2/4 h-full justify-center pt-14">
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
            </div>
            <div className="container flex-col gap-7 md:gap-10 flex pb-0 xl:pb-[3.75rem] pt-7 md:pt-10">
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
                    <div
                        className="flex bg-surface-hard gap-2.5 md:py-4 md:px-6 justify-center items-center rounded-2xl h-12 md:h-auto w-12 md:w-auto cursor-pointer"
                        onClick={toggleFilters}
                    >
                        <h5 className="font-normal text-bodyMd text-primary hidden md:block">Sports</h5>
                        <Image
                            src="/static/down-bg.svg"
                            alt="Sports"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>
                <div className="pb-6 md:pb-10 flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {!isLoading ? (
                            clubs.length === 0 ? (
                                <div className="col-span-full text-center text-bodyMd text-primary font-semibold">
                                    No Clubs
                                </div>
                            ) : (
                                clubs.map((item, index) => (
                                    <div key={index}
                                        className="border border-primary rounded-2xl p-1.5 pb-3 cursor-pointer"
                                        onClick={() => handleClubClick(item)}
                                    >
                                        <div className="relative mb-8 md:mb-12">
                                            <div className="rounded-xl overflow-hidden h-44 md:h-[13.5rem] xl:h-52">
                                                <Image
                                                    src={item.headerPhoto}
                                                    alt={item.name}
                                                    width={0}
                                                    height={0}
                                                    className="w-full"
                                                />
                                            </div>
                                            <div
                                                className="absolute left-3 md:left-[0.563rem] transform -translate-y-1/2 
                                            w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden 
                                            shadow-[0_0_0_1px_rgba(0,0,0,0.1)] flex items-center justify-center"
                                            >
                                                <Image
                                                    src={item.avatarPhoto}
                                                    alt={item.name}
                                                    width={0}
                                                    height={0}
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1 px-1.5">
                                            <h3 className="text-primary text-bodyXl font-semibold">
                                                {item.name}
                                            </h3>
                                            <div className="flex gap-2 items-center">
                                                {/* <div className="flex items-center gap-1">
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
                                        </div> */}
                                                <h6 className="text-bodyMd text-secondary font-normal">{item.participants.length} members</h6>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <h6 className="text-bodySm text-tertiary font-medium">4.3 km</h6>
                                                <Image
                                                    src="/static/dot.svg"
                                                    alt=""
                                                    width={5}
                                                    height={5}
                                                />
                                                <h6 className="text-bodySm text-tertiary font-medium">{item.locationString}.</h6>
                                            </div>
                                        </div>
                                    </div>
                                )))) : (
                            <div className="loading-state">
                                <div className="loading"></div>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        {loadedClubs < allClubs.length && (
                            <button
                                type="button"
                                className="bg-primary-button text-primary-button px-5 py-3 rounded-xl text-bodyMd font-semibold"
                                onClick={loadMoreClubs}
                            >
                                Load More
                            </button>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
            {isFilterOpen && (
                <Sidebar isOpen={isFilterOpen} heading="Select Sports" onClose={closeSidebar}>
                    <div className="flex flex-col justify-between flex-1">
                        <div className="flex flex-wrap gap-4">
                            {categories.map((item, index) => (
                                <div
                                    key={index}
                                    className={`py-2 px-4 rounded-lg cursor-pointer 
                                        ${selectedCategory === item ? "bg-surface-green" : "bg-surface-secondary-medium"}`}
                                    onClick={() => handleCategoryClick(item)}
                                >
                                    <h4
                                        className={`text-bodyMd font-semibold 
                                        ${selectedCategory === item ? "text-balticSea" : "text-primary"}`}
                                    >
                                        {item}
                                    </h4>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            <button
                                type="button"
                                className="bg-primary-button text-primary-button px-5 py-3 rounded-xl text-bodyMd font-semibold"
                                onClick={handleApplyFilter}
                            >
                                Apply
                            </button>
                            <button
                                type="button"
                                className="bg-surface-secondary-medium text-primary px-5 py-3 rounded-xl text-bodyMd font-semibold"
                                onClick={() => setSelectedCategory(null)}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </Sidebar>
            )}
        </>
    );
}

export default memo(HomePage);