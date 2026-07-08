"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseTimerOptions {
  duration: number;
  onComplete?: () => void;
}

export default function useTimer({
  duration,
  onComplete,
}: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stop = useCallback(() => {
    setIsRunning(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    setTimeLeft(duration);
  }, [duration, stop]);

  const start = useCallback(() => {
    if (intervalRef.current) return;

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          stop();
          onComplete?.();
          return 0;
        }

        return previous - 1;
      });
    }, 1000);
  }, [onComplete, stop]);

  const pause = useCallback(() => {
    stop();
  }, [stop]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    stop,
    reset,
  };
}