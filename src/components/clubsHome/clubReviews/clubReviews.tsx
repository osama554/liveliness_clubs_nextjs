import Image from "next/image";
import { memo } from "react"
import moment from "moment";

import Shimmer from "@/components/shimmer/shimmer";

import IClubReviewsProps from "./interfaces/IClubReviewsProps";

const avreageRatingShimmer = (
    <div className="flex flex-row-reverse md:flex-row gap-6 p-3 my-6 border rounded-2xl border-primary shadow-[0_0_0_0.5px_rgba(0,0,0,0.1)]">
        <div className="flex-none md:flex-1">
            <Shimmer height="162px" />
        </div>
        <div className="flex-auto md:flex-1">
            <div className="flex flex-col gap-3 p-3">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Shimmer key={index} height="20px" />
                ))}
            </div>
        </div>
    </div>
);

const reviewCardShimmer = Array.from({ length: 3 }).map((_, index) => (
    <div
        key={index}
        className="flex flex-col gap-3 p-3 border rounded-2xl border-primary shadow-[0_0_0_0.5px_rgba(0,0,0,0.1)] h-48"
    >
        <div className="flex gap-3">
            <Shimmer width="46px" height="40px" />
            <div className="flex flex-col w-full gap-1 justify-center">
                <Shimmer height="14px" width="50%" />
                <Shimmer height="14px" width="50%" />
            </div>
        </div>
        <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
                <Shimmer key={index} width="16px" height="16px" circle />
            ))}
        </div>
        <Shimmer height="20px" />
        <Shimmer height="20px" />
    </div>
));

const noReviews = (
    <div className="flex flex-col gap-14 items-center">
        <Image
            src='/static/noReviews.svg'
            width={248}
            height={130}
            alt="No Reviews"
        />
        <div className="flex flex-col gap-2 justify-center items-center">
            <h2 className="text-primary font-semibold text-headingSm md:text-headingMd">No Reviews Yet</h2>
            <h3 className="text-secondary text-bodyMd font-normal text-center">
                It looks like there are no reviews yet. Be the first to share your experience!
            </h3>
        </div>
    </div>
);

const ClubReviews = (props: IClubReviewsProps) => {
    const { reviews, loading, loadMore } = props;
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews || 0;

    const starCounts = Array(5).fill(0);
    reviews.forEach(review => {
        if (review.rating >= 1 && review.rating <= 5) {
            starCounts[review.rating - 1] += 1;
        }
    });

    const getStarFill = (index: number) => {
        return averageRating >= index + 1 ? 'full' : 'empty';
    };

    return (
        <div className="flex flex-col gap-10 pb-10 md:pb-20">
            {loading ? avreageRatingShimmer : (
                <div className="flex flex-row-reverse md:flex-row gap-6 p-3 my-6 border rounded-2xl border-primary shadow-[0_0_0_0.5px_rgba(0,0,0,0.1)]">
                    <div className="flex-none md:flex-1">
                        <div className="flex justify-center h-full items-end md:items-center flex-col bg-transparent md:bg-surface-hard rounded-lg gap-2 py-[2.313rem]">
                            <h2 className="text-headingMd text-primary font-semibold">
                                {totalReviews > 0
                                    ? averageRating.toFixed(1)
                                    : "0"}
                            </h2>
                            <div className="flex gap-1">
                                {Array.from({ length: 5 }).map((_, index) => {
                                    const fillType = getStarFill(index);
                                    return (
                                        <Image
                                            key={index}
                                            src={fillType === "full"
                                                ? "/static/star.svg"
                                                : "/static/star-empty.svg"
                                            }
                                            alt={`Star ${index + 1}`}
                                            width={9}
                                            height={9}
                                            className="w-3 h-3"
                                        />
                                    )
                                })}
                            </div>
                            <h6 className="text-bodyMd text-secondary font-normal">
                                {totalReviews} reviews
                            </h6>
                        </div>
                    </div>
                    <div className="flex-auto md:flex-1">
                        <div className="flex flex-col gap-3 p-3">
                            {starCounts.reverse().map((count, index) => {
                                const starRating = 5 - index;
                                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 100;
                                const barColor = totalReviews > 0 ? 'bg-surface-green' : 'bg-surface-hard';

                                return (
                                    <div key={index} className="flex gap-3 items-center">
                                        <h4 className="text-bodySm text-primary font-medium">
                                            {starRating}
                                        </h4>
                                        <Image
                                            src="/static/star.svg"
                                            alt={`${starRating} stars`}
                                            width={16}
                                            height={16}
                                        />
                                        <span
                                            className={`h-2 rounded-full ${barColor}`}
                                            style={{ width: `${percentage}%` }}
                                        ></span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            <div className={`grid ${totalReviews === 0 && !loading && 'grid-cols-1 md:grid-cols-1 xl:grid-cols-1'} grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8`}>
                {totalReviews > 0 ?
                    reviews.map((card, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-3 p-3 border rounded-2xl border-primary shadow-[0_0_0_0.5px_rgba(0,0,0,0.1)] h-48"
                        >
                            <div className="flex gap-3">
                                <div className="rounded-xl overflow-hidden w-10 h-10 flex justify-center items-center">
                                    <Image
                                        src={card.reviewer.mainProfilePhoto}
                                        alt={card.reviewer.name}
                                        width={40}
                                        height={40}
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-primary text-bodyLg font-semibold">
                                        {card.reviewer.name}
                                    </h3>
                                    <p className="text-tertiary text-bodySm font-medium">
                                        {moment(card.createdAt).format('DD MMM YYYY')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {Array.from({ length: 5 }).map((_, index) => {
                                    const isFullStar = index < Math.floor(card.rating);
                                    const starType = isFullStar
                                        ? "/static/star.svg"
                                        : "/static/star-empty.svg"
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
                            <p className="text-primary text-bodyMd font-normal line-clamp-4">
                                {card.review}
                            </p>
                        </div>
                    )) : loading ? reviewCardShimmer : noReviews
                }
            </div>
            {totalReviews > 25 && (
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="bg-primary-button text-primary-button px-5 py-3 rounded-xl text-bodyMd font-semibold mt-6"
                        onClick={loadMore}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}

export default memo(ClubReviews);