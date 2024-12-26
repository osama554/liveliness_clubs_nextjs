import moment from 'moment';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';

import IEventsByMonth from '@/components/clubsHome/upcomingEventsList/interfaces/IEventsByMonth';
import IMonthCalendarProps from './interfaces/IMonthCalendarProps';
import IEventModel from '@/components/clubsHome/upcomingEventsList/interfaces/IEventModel';

const MonthCalendar = (props: IMonthCalendarProps) => {
    const { events, selectedDate, inSidebar = false, setSelectedDate } = props;

    const [currentMonth, setCurrentMonth] = useState(moment());
    const [localSelectedDate, setLocalSelectedDate] = useState<moment.Moment | null>(
        selectedDate ? moment(selectedDate) : null
    );

    const groupEventsByMonth = (events: IEventModel[]): IEventsByMonth => {
        return events.reduce((acc: IEventsByMonth, event: IEventModel) => {
            const month = moment(event.trainingStartDateTime).format("MMMM YYYY");
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push(event);
            return acc;
        }, {} as Record<string, IEventModel[]>);
    };

    const eventsByMonth = groupEventsByMonth(events);

    const hasEventOnDate = (date: moment.Moment) => {
        const monthKey = date.format('MMMM YYYY');
        if (eventsByMonth[monthKey]) {
            return eventsByMonth[monthKey].some((event) => moment(event.trainingStartDateTime).isSame(date, 'day'));
        }
        return false;
    };

    useEffect(() => {
        if (selectedDate) {
            const newDate = moment(selectedDate);
            setLocalSelectedDate(newDate);
            setCurrentMonth(newDate);
        } else {
            setLocalSelectedDate(null);
            setCurrentMonth(moment());
        }
    }, [selectedDate]);

    const handlePreviousMonth = () => {
        setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentMonth(currentMonth.clone().add(1, 'month'));
    };

    const handleDateClick = (date: moment.Moment) => {
        if (localSelectedDate && localSelectedDate.isSame(date, 'day')) {
            setLocalSelectedDate(null);
            setSelectedDate(null);
        } else {
            setLocalSelectedDate(date);
            setSelectedDate(date.toISOString());
        }
    };

    const renderCalendar = () => {
        const startOfMonth = currentMonth.clone().startOf('month');
        const endOfMonth = currentMonth.clone().endOf('month');
        const startOfWeek = startOfMonth.clone().startOf('week');
        const endOfWeek = endOfMonth.clone().endOf('week');

        const calendar = [];
        const day = startOfWeek.clone();

        while (day.isBefore(endOfWeek, 'day')) {
            calendar.push(
                <div
                    className="grid grid-cols-7 mt-2"
                    key={day.format('YYYY-MM-DD')}
                >
                    {[...Array(7)].map(() => {
                        const currentDay = day.clone();
                        day.add(1, 'day');

                        const isCurrentMonth = currentDay.month() === currentMonth.month();
                        const isSelectedDate = localSelectedDate && currentDay.isSame(localSelectedDate, 'day');
                        const isToday = currentDay.isSame(moment(), 'day');
                        const hasEvent = hasEventOnDate(currentDay);

                        let backgroundClass = '';
                        let textClass = '';

                        if (isSelectedDate) {
                            backgroundClass = 'bg-surface-medium';
                            textClass = 'text-primary';
                        } else if (isToday) {
                            backgroundClass = 'bg-surface-green';
                            textClass = 'text-surface-dark-bg';
                        }

                        return (
                            <div
                                key={currentDay.format('YYYY-MM-DD')}
                                className={`flex flex-col items-center justify-center cursor-pointer 
                                    rounded-lg xl:rounded-2xl w-8 h-8 xl:w-12 xl:h-12
                                    ${isCurrentMonth ? 'text-primary' : 'text-secondary'}
                                    ${currentDay.month() !== currentMonth.month() ? 'text-tertiary' : ''}
                                    ${backgroundClass}`}
                                onClick={() => handleDateClick(currentDay)}
                            >
                                <h2 className={`text-center ${textClass} text-bodySm font-medium xl:text-bodyLg md:font-semibold`}
                                >
                                    {currentDay.date()}
                                </h2>
                                {hasEvent && <span className='bg-surface-green w-1 h-1 rounded-full overflow-hidden'></span>}
                            </div>
                        );
                    })}
                </div>
            );
        }
        return calendar;
    };

    return (
        <div className={`flex flex-col bg-surface-hard rounded-xl ${inSidebar ? 'p-4 w-full' : 'p-6'}`}>
            <div
                className={`flex justify-between items-center border-b border-primary ${inSidebar ? "pb-4 mb-4" : "pb-6 mb-6"}`}
            >
                <button
                    className="w-6 h-6 flex justify-center items-center"
                    onClick={handlePreviousMonth}
                >
                    <Image
                        src="/static/left.svg"
                        width={6}
                        height={12}
                        alt="Previous"
                    />
                </button>
                <h3 className={`text-primary text-center text-bodyXl font-semibold xl:text-headingSm xl:font-normal`}>
                    {currentMonth.format('MMMM')}
                    <span className='text-tertiary'>
                        {currentMonth.format(' YYYY')}
                    </span>
                </h3>

                <button
                    className="w-6 h-6 flex justify-center items-center"
                    onClick={handleNextMonth}
                >
                    <Image
                        src="/static/right.svg"
                        width={6}
                        height={12}
                        alt="Next"
                    />
                </button>
            </div>
            <div className={`grid grid-cols-7 text-center text-secondary text-bodySm font-medium xl:text-bodyMd xl:font-normal`}>
                <h2>Sun</h2>
                <h2>Mon</h2>
                <h2>Tue</h2>
                <h2>Wed</h2>
                <h2>Thu</h2>
                <h2>Fri</h2>
                <h2>Sat</h2>
            </div>

            <div>{renderCalendar()}</div>
        </div>
    );
};

export default memo(MonthCalendar);