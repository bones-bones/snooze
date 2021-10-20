import { useEffect, useCallback, useRef } from 'react';

// https://javascript.plainenglish.io/usetimeout-react-hook-3cc58b94af1f
export const useTimeout = (
    callback: () => void,
    timeout: number = 0
): (() => void) => {
    const timeoutIdRef = useRef<NodeJS.Timeout>();
    const cancel = useCallback(() => {
        const timeoutId = timeoutIdRef.current;
        if (timeoutId) {
            timeoutIdRef.current = undefined;
            clearTimeout(timeoutId);
        }
    }, [timeoutIdRef]);

    useEffect(() => {
        timeoutIdRef.current = setTimeout(callback, timeout) as any;
        return cancel;
    }, [callback, timeout, cancel]);

    return cancel;
};
