import IEventModel from "../../interfaces/IEventModel";

export default interface IUpcomingEventsListProps {
    events: IEventModel[];
    selectedDate: string | null;
    loading: boolean;
    searchQuery: string;
    eventsLength: number;
    allEventsLength: number;
    loadedEvents: number;
    loadMoreEvents: () => void;
}