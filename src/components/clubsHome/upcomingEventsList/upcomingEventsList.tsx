import React from 'react';
import moment from 'moment';
import Image from 'next/image';

import IEventModel from '../interfaces/IEventModel';
import IUpcomingEventsListProps from './interfaces/IUpcomingEventsListProps';

const UpcomingEventsList = (props: IUpcomingEventsListProps) => {
    const { events, selectedDate } = props;

    const groupedEvents = events.reduce((acc, event) => {
        const dateKey = moment(event.trainingStartDateTime).format('DD MMM');
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(event);
        return acc;
    }, {} as Record<string, IEventModel[]>);

    const filteredGroupedEvents = selectedDate
        ? Object.fromEntries(
            Object.entries(groupedEvents).filter(([date]) =>
                moment(date, 'DD MMM').isSame(moment(selectedDate), 'day')
            )
        )
        : groupedEvents;

    const hasNoEvents = selectedDate && Object.keys(filteredGroupedEvents).length === 0;

    return (
        <div className="flex flex-col gap-4 pl-0 xl:pl-8">
            {hasNoEvents && (
                <h3 className="text-bodyLg font-semibold text-primary">
                    No events on this day
                </h3>
            )}
            {Object.entries(filteredGroupedEvents).map(([date, events]) => (
                <div key={date} className="flex flex-col pt-2">
                    <h3 className="text-bodyMd font-semibold text-primary">
                        {date}
                        <span className="text-tertiary">
                            {` / ${moment(events[0].trainingStartDateTime).format('dddd')}`}
                        </span>
                    </h3>
                    <div className="flex flex-col gap-4 pt-4">
                        {events.map((event, index) => (
                            <React.Fragment key={index}>
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-[7.5rem] h-[7.5rem] bg-surface-bg rounded-2xl 
                                            shadow-[0_0_0_1px_rgba(0,0,0,0.1)] flex items-center justify-center"
                                    >
                                        <Image
                                            src={event.coverPhotoUrl || '/static/event.svg'}
                                            alt={event.title}
                                            width={120}
                                            height={120}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-surface-dark-green text-bodyMd font-semibold">
                                                {moment(event.trainingStartDateTime).format('hh:mm')} -{' '}
                                                {moment(event.trainingEndDateTime).format('hh:mm')}
                                            </h3>
                                            <h2 className="text-primary text-bodyLg font-semibold">
                                                {event.title}
                                            </h2>
                                        </div>
                                        <div className="flex flex-col gap-1 items-start">
                                            {event.price > 0 && (
                                                <div className="border border-primary shadow-[0_0_0_1px_rgba(0,0,0,0.1)] px-1.5 py-0.5 rounded">
                                                    <h5 className="text-bodySm text-primary font-medium">
                                                        From {event.priceCurrency} {event.price.toFixed(2)}
                                                    </h5>
                                                </div>
                                            )}
                                            <div className="flex gap-0.5 items-center">
                                                <div className="w-4 h-4 flex justify-center items-center">
                                                    <Image
                                                        src="/static/pin.svg"
                                                        alt="Location"
                                                        width={11}
                                                        height={13}
                                                    />
                                                </div>
                                                <h6 className="text-bodySm font-medium text-primary">
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
            ))}
        </div>
    );
};

export default UpcomingEventsList;