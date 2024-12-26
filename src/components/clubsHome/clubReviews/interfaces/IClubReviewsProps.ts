import IReviewModel from "./IReviewModel";

export default interface IClubReviewsProps {
    reviews: IReviewModel[];
    loading: boolean;
}