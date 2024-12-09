import IEventModel from "./IEventModel";

export default interface IEventsByMonth {
    [key: string]: IEventModel[];
}