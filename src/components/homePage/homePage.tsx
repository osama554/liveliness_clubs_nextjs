"use client";

import { memo, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import Image from "next/image";

import { categories, serverUrl } from "@/components/constants";

import Header from "@/components/common/header/header";
import Footer from "@/components/common/footer/footer";
import Sidebar from "@/components/common/sidebar/sidebar";
import Shimmer from "@/components/shimmer/shimmer";

import IResponseData from "@/app/interfaces/IResponseData";
import IClubModel from "@/components/homePage/interfaces/IClubResponse";

const shimmerJSX = (
    <>
        <div className="border border-primary rounded-2xl p-1.5 pb-3 cursor-pointer">
            <div className="relative mb-8 md:mb-12">
                <div className="rounded-xl overflow-hidden h-44 md:h-[13.5rem] xl:h-52">
                    <Shimmer height="216px" />
                </div>
                <div
                    className="absolute left-3 md:left-[0.563rem] transform -translate-y-1/2 
                                            w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden 
                                            shadow-[0_0_0_1px_rgba(0,0,0,0.1)] flex items-center justify-center"
                >
                    <Shimmer height="64px" />
                </div>
            </div>
            <div className="flex flex-col gap-1 px-1.5">
                <Shimmer height="20px" width="35%" />
                <div className="flex gap-2 items-center">
                    <Shimmer height="20px" width="20%" />
                </div>
                <div className="flex gap-2 items-center">
                    <Shimmer height="20px" width="20%" />
                </div>
            </div>
        </div>
        <div className="border border-primary rounded-2xl p-1.5 pb-3 cursor-pointer">
            <div className="relative mb-8 md:mb-12">
                <div className="rounded-xl overflow-hidden h-44 md:h-[13.5rem] xl:h-52">
                    <Shimmer height="216px" />
                </div>
                <div
                    className="absolute left-3 md:left-[0.563rem] transform -translate-y-1/2 
                                            w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden 
                                            shadow-[0_0_0_1px_rgba(0,0,0,0.1)] flex items-center justify-center"
                >
                    <Shimmer height="64px" />
                </div>
            </div>
            <div className="flex flex-col gap-1 px-1.5">
                <Shimmer height="20px" width="35%" />
                <div className="flex gap-2 items-center">
                    <Shimmer height="20px" width="20%" />
                </div>
                <div className="flex gap-2 items-center">
                    <Shimmer height="20px" width="20%" />
                </div>
            </div>
        </div>
    </>
)

const HomePage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [clubs, setClubs] = useState<IClubModel[]>([]);
    const [allClubs, setAllClubs] = useState<IClubModel[]>([]);
    const [loadedClubs, setLoadedClubs] = useState(20);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const toggleFilters = useCallback(() => setIsFilterOpen((prev) => !prev), [setIsFilterOpen]);
    const closeSidebar = useCallback(() => setIsFilterOpen(false), [setIsFilterOpen]);

    const handleCategoryClick = useCallback((category: string) => {
        setSelectedCategory((prev) => (prev === category ? null : category));
    }, []);

    const getAllClubs = useCallback(async (sport: string) => {
        setIsLoading(true);
        try {
            const path = `${serverUrl}/club/getAllClubsForCommunitySport`;
            const response = await fetch(path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
    }, []);

    const loadMoreClubs = useCallback(() => {
        const sourceClubs = searchQuery ? clubs : allClubs;
        const nextClubs = sourceClubs.slice(loadedClubs, loadedClubs + 20);
        setClubs((prevClubs) => [...prevClubs, ...nextClubs]);
        setLoadedClubs((prev) => prev + 20);
    }, [searchQuery, clubs, allClubs, loadedClubs]);

    const handleSearch = useCallback(() => {
        const filteredClubs = allClubs.filter((club) =>
            club.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setClubs(filteredClubs.slice(0, 20));
        setLoadedClubs(20);
    }, [searchQuery, allClubs]);

    const handleApplyFilter = useCallback(() => {
        if (selectedCategory) {
            getAllClubs(selectedCategory);
        }
        closeSidebar();
    }, [selectedCategory, getAllClubs, closeSidebar]);

    const handleClubClick = useCallback((club: IClubModel) => {
        const {
            adminId,
            name,
            username,
            bio,
            participants,
            admin,
            headerPhoto,
            avatarPhoto,
            clubInstagram,
            clubYouTube,
            clubTikTok,
            clubWebsite
        } = club;
        router.push(`/clubs?userId=${adminId}&clubName=${name}&userName=${username}
            &desciption=${bio}&members=${participants.length}&reviewCount=${admin.reviewCount}
            &headerPhoto=${encodeURIComponent(headerPhoto)}&avatarPhoto=${encodeURIComponent(avatarPhoto)}&instagram=${clubInstagram}
            &youtube=${clubYouTube}&tiktok=${clubTikTok}&website=${clubWebsite}`);
    }, [router]);

    useEffect(() => {
        handleSearch();
    }, [searchQuery, handleSearch]);

    useEffect(() => {
        getAllClubs("");
    }, [getAllClubs]);

    return (
        <>
            <div className=" container z-10 sticky top-0 bg-surface-bg">
                <Header />
            </div>
            <div className="flex h-full md:h-[27.5rem] xl:h-[34.375rem] lg:bg-[url('/static/home-bg.svg')] bg-no-repeat 
            lg:bg-[center_right_-14.375rem] xl:bg-[center_right] min-[2600px]:bg-[center_right_30%] bg-auto w-full">
                <div className="container">
                    <div className="flex flex-col gap-14 md:gap-12 w-full md:w-2/4 h-full justify-center pt-14">
                        <h2 className="text-headingLg xl:text-headingXl font-semibold text-primary">
                            Find your sports and wellness community Explore Clubs Find activities
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
                        className="flex bg-surface-hard gap-2.5 md:py-4 md:px-6 justify-center items-center rounded-2xl h-12 md:h-auto w-12 md:w-auto cursor-pointer"
                        onClick={toggleFilters}
                    >
                        <h5 className="font-normal text-bodyMd text-primary hidden md:block">Sports</h5>
                        <Image
                            src="/static/filtersSmall.svg"
                            alt="Filter"
                            className="block md:hidden"
                            width={16}
                            height={16}
                        />
                        <Image
                            src="/static/down-bg.svg"
                            alt="Sports"
                            width={24}
                            height={24}
                            className="hidden md:block"
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
                                                    width={410}
                                                    height={216}
                                                    className="w-full h-full object-cover"
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
                                                    width={64}
                                                    height={64}
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1 px-1.5">
                                            <h3 className="text-primary text-bodyXl font-semibold">
                                                {item.name}
                                            </h3>
                                            <div className="flex gap-2 items-center">
                                                <div className="flex items-center gap-1">
                                                    {item.admin.reviewCount > 0 && (
                                                        <h6 className="text-bodyMd text-primary font-semibold">{item.admin.reviewCount}</h6>
                                                    )}
                                                    <div className="flex gap-1">
                                                        {Array.from({ length: 5 }).map((_, index) => {
                                                            const isFullStar = index < Math.floor(item.admin.reviewCount);
                                                            const starType = isFullStar
                                                                ? "/static/star.svg"
                                                                : "/static/star-empty.svg";
                                                            return (
                                                                (
                                                                    <Image
                                                                        key={index}
                                                                        src={starType}
                                                                        alt={`Star ${index + 1}`}
                                                                        width={9}
                                                                        height={9}
                                                                        className="w-3 h-3"
                                                                    />
                                                                )
                                                            )
                                                        })}
                                                    </div>
                                                    {item.admin.reviewCount > 0 && (
                                                        <h6 className="text-bodyMd text-primary font-semibold">({item.admin.reviewCount})</h6>
                                                    )}
                                                </div>
                                                <h6 className="text-bodyMd text-secondary font-normal">{item.participants.length} members</h6>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                {/* <h6 className="text-bodySm text-tertiary font-medium">4.3 km</h6> */}
                                                {/* <Image
                                                    src="/static/dot.svg"
                                                    alt=""
                                                    width={5}
                                                    height={5}
                                                /> */}
                                                <h6 className="text-bodySm text-tertiary font-medium">{item.locationString}.</h6>
                                            </div>
                                        </div>
                                    </div>
                                ))))
                            : shimmerJSX
                        }
                    </div>
                    {(searchQuery && clubs.length > 20) || (!searchQuery && allClubs.length > loadedClubs) && (
                        <div className="flex justify-center">
                            <button
                                type="button"
                                className="bg-primary-button text-primary-button px-5 py-3 rounded-xl text-bodyMd font-semibold"
                                onClick={loadMoreClubs}
                            >
                                Load More
                            </button>
                        </div>
                    )}
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