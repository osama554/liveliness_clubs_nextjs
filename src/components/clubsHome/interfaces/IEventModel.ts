
import ICreatorModel from "./ICreatorModel";
import ILocationModel from "./ILocationModel";

export default interface IEventModel {
    trainingId?: string;
    type: string;
    coverPhotoUrl: string;
    optionalPhotos: string[];
    sport: string;
    title: string;
    description: string;
    cancelled: boolean;
    deleted: boolean;
    participants: string[];
    participantsLimit: number;
    isUnlimitedParticipants: boolean;
    trainingLocationString: string;
    trainingLocation: ILocationModel;
    trainingStartDateTime: string;
    trainingEndDateTime: string;
    commentCount: number;
    link: string;
    likedBy: string[];
    createdAt: string;
    paymentMethods: string[];
    price: number;
    priceCurrency: string | undefined;
    clubId: string;
    otherPaymentMethod: string;
    creator: ICreatorModel | string;
    creatorUid?: string;
    titles?: string[];
    subscriptionsAllowed?: string[];
    isRepeatEvent?: boolean;
    repeatEventFrequency?: number;
    comments?: string[];
    sessionId?: string;
    isOnline: boolean;
}