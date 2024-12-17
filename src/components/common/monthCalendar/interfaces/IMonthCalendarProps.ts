import { Dispatch, SetStateAction } from "react";

import IEventModel from "@/components/clubsHome/interfaces/IEventModel";

export default interface IMonthCalendarProps {
    events: IEventModel[];
    selectedDate: string | null
    setSelectedDate: Dispatch<SetStateAction<string | null>>;
    inSidebar?: boolean;
}