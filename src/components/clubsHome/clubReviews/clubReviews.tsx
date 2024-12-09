import { reviewCards } from "@/components/constants";
import Image from "next/image";
import { memo } from "react"

const ClubReviews = () => {
    const reviews = Array.from({ length: 5 }, (_, stars) =>
        reviewCards.filter((card) => card.stars === stars + 1).length
    );
    const totalReviews = reviews.reduce((acc, count) => acc + count, 0);
    const averageRating =
        reviews.reduce((sum, count, index) => sum + count * (index + 1), 0) /
        totalReviews;

    const getStarFill = (index: number) => {
        const rating = averageRating - index;
        if (rating >= 1) return "full";
        if (rating > 0) return "partial";
        return "empty";
    };

    return (
        <div className="flex flex-col gap-10 pb-10 md:pb-20">
            <div className="flex flex-row-reverse md:flex-row gap-6 p-3 my-6 border rounded-2xl border-primary shadow-[0_0_0_0.5px_rgba(0,0,0,0.1)]">
                <div className="flex-none md:flex-1">
                    <div className="flex justify-center items-center flex-col bg-transparent md:bg-surface-hard rounded-lg gap-2 py-[2.313rem]">
                        <h2 className="text-headingMd text-primary font-semibold">
                            {averageRating.toFixed(1)}
                        </h2>
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, index) => {
                                const fillType = getStarFill(index);
                                return (
                                    <Image
                                        key={index}
                                        src={fillType === "full"
                                            ? "/static/star.svg"
                                            : fillType === "partial"
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
                        {reviews.slice().reverse().map((count, index) => {
                            const starRating = 5 - index;
                            const percentage = (count / totalReviews) * 100 || 0;

                            return (
                                <div key={starRating} className="flex gap-3 items-center">
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
                                        className="bg-surface-green h-2 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    ></span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {reviewCards.map((card, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-3 p-3 border rounded-2xl border-primary shadow-[0_0_0_0.5px_rgba(0,0,0,0.1)] h-48"
                    >
                        <div className="flex gap-3">
                            <div className="rounded-xl overflow-hidden w-10 h-10 flex justify-center items-center">
                                <Image
                                    src="/static/review-user.svg"
                                    alt={card.name}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-primary text-bodyLg font-semibold">
                                    {card.name}
                                </h3>
                                <p className="text-tertiary text-bodySm font-medium">
                                    {card.date}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {Array.from({ length: card.stars }).map((_, index) => (
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
                        <p className="text-primary text-bodyMd font-normal">
                            {card.review}
                        </p>
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default memo(ClubReviews);