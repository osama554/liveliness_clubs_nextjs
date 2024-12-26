import React from 'react';
import moment from 'moment';
import Image from 'next/image';

import Shimmer from '@/components/shimmer/shimmer';

import IUpcomingEventsListProps from './interfaces/IUpcomingEventsListProps';
import IEventModel from './interfaces/IEventModel';

const noEvents = (
    <div className="flex flex-col gap-14 items-center py-10">
        <Image
            src='/static/noEvents.svg'
            width={215}
            height={144}
            alt="No Events"
        />
        <div className="flex flex-col gap-2 justify-center items-center">
            <h2 className="text-primary font-semibold text-headingSm md:text-headingMd">No Events Available</h2>
            <h3 className="text-secondary text-bodyMd font-normal text-center">
                There are no events scheduled at the moment. Stay tuned for updates and upcoming activities.
            </h3>
        </div>
    </div>
);

const UpcomingEventsList = (props: IUpcomingEventsListProps) => {
    const { events, selectedDate, loading, allEventsLength, eventsLength, loadedEvents, searchQuery, loadMoreEvents } = props;

    const groupedEvents = events.reduce((acc, event) => {
        const dateKey = moment(event.trainingStartDateTime).format('YYYY-MM-DD');
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(event);
        return acc;
    }, {} as Record<string, IEventModel[]>);

    const filteredGroupedEvents = selectedDate
        ? Object.fromEntries(
            Object.entries(groupedEvents).filter(([date]) =>
                moment(date).isSame(moment(selectedDate), 'day')
            )
        )
        : groupedEvents;

    const hasNoEvents = Object.keys(filteredGroupedEvents).length === 0;

    const sortedGroupedEvents = Object.entries(filteredGroupedEvents).sort(([dateA], [dateB]) =>
        moment(dateA).isBefore(moment(dateB)) ? -1 : 1
    );

    return (
        <div className="flex flex-col gap-4 pl-0 xl:pl-8">
            {loading ?
                Array.from({ length: 3 }).map((_, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                        <Shimmer width="7.5rem" height="7.5rem" />
                        <div className="flex flex-col gap-2 w-full">
                            <Shimmer width="30%" height="18px" />
                            <Shimmer width="50%" height="18px" />
                            <Shimmer width="20%" height="14px" />
                            <Shimmer width="40%" height="14px" />
                        </div>
                    </div>
                )) : hasNoEvents ? (
                    <h3 className="text-bodyLg font-semibold text-primary text-center pt-4">
                        {selectedDate ? 'No events on this day' : noEvents}
                    </h3>
                ) : (
                    sortedGroupedEvents.map(([date, events]) => (
                        <div key={date} className="flex flex-col pt-2">
                            <h3 className="text-bodyMd font-semibold text-primary">
                                {moment(date).format('DD MMM')}
                                <span className="text-tertiary">
                                    {` / ${moment(date).format('dddd')}`}
                                </span>
                            </h3>
                            <div className="flex flex-col gap-4 pt-4">
                                {events.map((event, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-[7.5rem] h-[7.5rem] bg-surface-bg rounded-2xl overflow-hidden 
                                                        shadow-[0_0_0_1px_rgba(0,0,0,0.1)] flex items-center justify-center"
                                            >
                                                <Image
                                                    src={event.coverPhotoUrl || '/static/event.svg'}
                                                    alt={event.title}
                                                    width={120}
                                                    height={120}
                                                    className="w-full rounded-2xl"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-1">
                                                    <h3 className="text-surface-dark-green text-bodyMd font-semibold">
                                                        {moment.utc(event.trainingStartDateTime).local().format('hh:mm')} -{' '}
                                                        {moment.utc(event.trainingEndDateTime).local().format('hh:mm')}
                                                    </h3>
                                                    <h2 className="text-primary text-bodyLg font-semibold">
                                                        {event.title}
                                                    </h2>
                                                </div>
                                                <div className="flex flex-col gap-1 items-start">
                                                    <div className="border border-primary shadow-[0_0_0_1px_rgba(0,0,0,0.1)] px-1.5 py-0.5 rounded">
                                                        <h5 className="text-bodySm text-primary font-medium">
                                                            {event.price > 0 ?
                                                                `From ${event.priceCurrency} ${event.price.toFixed(2)}`
                                                                : 'Free'
                                                            }
                                                        </h5>
                                                    </div>
                                                    <div className="flex gap-0.5 items-center w-full max-w-56 md:max-w-full">
                                                        <div className="w-4 h-4 flex justify-center items-center">
                                                            <Image
                                                                src="/static/pin.svg"
                                                                alt="Location"
                                                                width={11}
                                                                height={13}
                                                            />
                                                        </div>
                                                        <h6 className="text-bodySm font-medium text-primary truncate">
                                                            {event.trainingLocationString}
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {events.length > 1 && index < events.length - 1 && (
                                            <span className='border-b border-primary shadow-[0_0_0_1px_rgba(0,0,0,0.1)]'></span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            {(!hasNoEvents) && ((searchQuery && eventsLength > 25) || (!searchQuery && allEventsLength > loadedEvents)) && (
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="bg-primary-button text-primary-button px-5 py-3 rounded-xl text-bodyMd font-semibold mt-6"
                        onClick={loadMoreEvents}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default UpcomingEventsList;