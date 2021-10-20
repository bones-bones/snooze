import { useEffect, useRef } from 'react';
import { clearRequestInterval, requestInterval } from './requestInterval';

type Delay = number | null;
type TimerHandler = (...args: any[]) => void;

export const useRequestInterval = (callback: TimerHandler, delay: Delay) => {
    const savedCallbackRef = useRef<TimerHandler>();
    useEffect(() => {
        savedCallbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const handler = (...args: any[]) => savedCallbackRef.current!(...args);

        if (delay !== null) {
            const intervalId = requestInterval(handler, delay);
            return () => clearRequestInterval(intervalId.value!);
        }
    }, [delay]);
};
