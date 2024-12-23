import ICreatorModel from "../../clubsHome/interfaces/ICreatorModel";
import ILocationModel from "../../clubsHome/interfaces/ILocationModel";

export default interface IClubModel {
    clubId: string;
    name: string;
    username: string;
    bio: string;
    adminId: string;
    link: string;
    participants: string[];
    clubPhotos: string[];
    requestedParticipants: string[];
    location: ILocationModel;
    locationString: string;
    headerPhoto: string;
    avatarPhoto: string;
    category: string;
    type: string;
    createdAt: string;
    clubInstagram: string;
    clubYouTube: string;
    clubTikTok: string;
    clubWebsite: string;
    isPostAllowed: boolean;
    isHidden: boolean;
    isDeleted: boolean;
    isVerified: boolean;
    admin: ICreatorModel;
}