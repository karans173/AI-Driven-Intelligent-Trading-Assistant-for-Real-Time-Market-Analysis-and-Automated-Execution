
import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter = ({ 
  value, 
  duration = 2000, 
  prefix = "", 
  suffix = "" 
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = duration / end;
    
    // Handle zero as special case to avoid division by zero
    if (end === 0) {
      setCount(0);
      return;
    }
    
    // Reset counter when value changes
    setCount(0);
    countRef.current = 0;
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    const animateCount = () => {
      countRef.current += 1;
      setCount(countRef.current);
      
      if (countRef.current < end) {
        timerRef.current = window.setTimeout(animateCount, incrementTime);
      }
    };
    
    timerRef.current = window.setTimeout(animateCount, incrementTime);
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, duration]);
  
  return (
    <span className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
