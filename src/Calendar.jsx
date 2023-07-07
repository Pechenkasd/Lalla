import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, } from 'date-fns';
import axios from 'axios';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [contributions, setContributions] = useState([]);

    useEffect(() => {
        fetchContributions();
    }, []);

    const fetchContributions = async () => {
        try {
            const response = await axios.get(`https://dpg.gg/test/calendar.json`);
            setContributions(response.data);
        } catch (error) {
            console.log('Error fetching contributions:', error);
        }
    };
    const getContributionCount = (date) => {
        const contribution = contributions.find((item) => item.date === date);
        return contribution ? contribution.count : 0;
    };

    const getColorClass = (count) => {
        switch (true) {
            case count >= 30:
                return 'red';
            case count >= 20:
                return 'blue';
            case count >= 10:
                return 'green';
            case count >= 1:
                return 'yellow';
            default:
                return 'white';
        }
    };

    const getTooltipText = (count) => {
        if (count === 0) {
            return 'Нет контрибуций';
        } else {
            return `${count}-контрибуций`;
        }
    };

    const renderCalendar = () => {
        const monthStart = startOfMonth(selectedDate);
        const monthEnd = endOfMonth(selectedDate);
        const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

        return (
            <div className="calendar">
                <div className="calendar-header">
                    <h2>{format(selectedDate, 'MMMM yyyy')}</h2>
                </div>
                <div className="calendar-grid">
                    {days.map((day) => {
                        const dayNumber = format(day, 'd');
                        const contributionCount = getContributionCount(format(day, 'yyyy-MM-dd'));
                        const colorClass = getColorClass(contributionCount);
                        const tooltipText = getTooltipText(contributionCount);

                        return (
                            <div
                                key={day.getTime()}
                                className={`calendar-day ${isSameMonth(day, selectedDate) ? 'current-month' : 'other-month'} ${colorClass}`}
                                onClick={() => setSelectedDate(day)}
                            >
                                <div className="day-number">{dayNumber}</div>
                                <div className="contribution-count" title={`${tooltipText} ${format(day, 'dd.MM.yyyy')}`}>
                                    {contributionCount}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return <div className="calendar-container">{renderCalendar()}</div>;
};

export default Calendar;
