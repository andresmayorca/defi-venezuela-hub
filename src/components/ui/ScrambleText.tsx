"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

interface ScrambleTextProps {
  text: string;
  speed?: number;
  iterations?: number;
  className?: string;
  onComplete?: () => void;
}

export function ScrambleText({
  text,
  speed = 20,
  iterations = 10,
  className = "",
  onComplete,
}: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iterRef = useRef(0);

  useEffect(() => {
    iterRef.current = 0;

    intervalRef.current = setInterval(() => {
      const progress = iterRef.current / iterations;

      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i / text.length < progress) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iterRef.current += 1;

      if (iterRef.current > iterations) {
        clearInterval(intervalRef.current!);
        setDisplayed(text);
        onComplete?.();
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, iterations, onComplete]);

  return <span className={className}>{displayed}</span>;
}
