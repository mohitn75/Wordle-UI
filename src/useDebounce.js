import React, {useEffect, useState} from "react";

export default function useDebounce(value, delay){
    const[debouncedValue, setDebouncedValue] = useState(value || null);

    useEffect(() => {
        const val = setTimeout(() => {
            setDebouncedValue(value);
        }, delay || 500);
        return () => {
            clearTimeout(val);
        }
    },[value, delay])
    return debouncedValue;
}