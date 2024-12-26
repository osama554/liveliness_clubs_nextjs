import IReviewerModel from "./IReviewerModel";

export default interface IReviewModel {
    reviewId: string;
    userId: string;
    reviewerId: string;
    trainingId: string;
    review: string;
    rating: number;
    createdAt: string;
    reviewer: IReviewerModel;
}