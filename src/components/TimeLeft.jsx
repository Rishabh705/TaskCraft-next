'use client'

import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";

// Custom hook to check if the component is mounted
const useIsMounted = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);  // Set the mounted state to true when the component is mounted
    }, []);

    return isMounted;  // Return the mounted state
};

const CountdownTimer = ({ task }) => {
    const due_date = task.due_date;  // Extract due date from the task prop
    const isMounted = useIsMounted();  // Check if the component is mounted

    // Function to calculate the time left until the due date
    const calculateTimeLeft = () => {
        const difference = new Date(due_date) - new Date();  // Calculate the difference in milliseconds
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            difference: difference,
        };

        // If the due date is in the future, calculate the time left
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),  // Days left
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),  // Hours left
                minutes: Math.floor((difference / 1000 / 60) % 60),  // Minutes left
                seconds: Math.floor((difference / 1000) % 60),  // Seconds left
            };
        }
        return timeLeft;  // Return the time left object
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);  // State to store the time left
    const [badgeVariant, setBadgeVariant] = useState('default');  // State to store the badge variant

    useEffect(() => {
        if (!isMounted) return;  // If the component is not mounted, do nothing

        // Set up an interval to update the time left every second
        const timer = setInterval(() => {
            const updatedTimeLeft = calculateTimeLeft();  // Calculate the updated time left
            setTimeLeft(updatedTimeLeft);  // Update the time left state

            // Check if time left is 30 minutes or less to update badge variant
            if (updatedTimeLeft.difference <= 1800 * 1000) {  // 30 minutes in milliseconds
                setBadgeVariant('destructive');  // Set badge variant to 'destructive'
            } else {
                setBadgeVariant('default');  // Set badge variant to 'default'
            }
        }, 1000);  // Update every second

        return () => clearInterval(timer);  // Cleanup the interval on component unmount
    }, [due_date, isMounted]);  // Dependencies: run effect when due_date or isMounted changes

    // Render nothing if not mounted
    if (!isMounted) return null;

    // Render the countdown timer with the current time left
    return (
        <Badge variant={badgeVariant}>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </Badge>
    );
};

export default CountdownTimer;
