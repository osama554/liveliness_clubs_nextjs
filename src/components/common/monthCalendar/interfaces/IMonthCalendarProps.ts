import { Dispatch, SetStateAction } from "react";

import IEventModel from "@/components/clubsHome/upcomingEventsList/interfaces/IEventModel";

export default interface IMonthCalendarProps {
    events: IEventModel[];
    selectedDate: string | null
    setSelectedDate: Dispatch<SetStateAction<string | null>>;
    inSidebar?: boolean;
    loading?: boolean;
    searchQuery?: string;
    eventsLength?: number;
    allEventsLength?: number;
    loadedEvents?: number;
    loadMoreEvents?: () => void;
}