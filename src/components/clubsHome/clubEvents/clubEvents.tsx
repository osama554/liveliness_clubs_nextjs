import { memo } from "react"

import MonthCalendar from "@/components/common/monthCalendar/monthCalendar";
import UpcomingEventsList from "../upcomingEventsList/upcomingEventsList";

import IMonthCalendarProps from "@/components/common/monthCalendar/interfaces/IMonthCalendarProps";

const ClubEvents = (props: IMonthCalendarProps) => {
    const { events, selectedDate, setSelectedDate, loading = false } = props;
    return (
        <div className="flex gap-2 pb-4">
            <div className="w-[391px] hidden xl:block">
                <MonthCalendar
                    events={events}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </div>
            <div className="flex-1">
                <UpcomingEventsList
                    events={events}
                    selectedDate={selectedDate}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default memo(ClubEvents);