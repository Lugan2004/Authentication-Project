"use client"
import { useState, useEffect } from "react";

export default function COunter(){
    const [count,setCount] = useState<number>(0);

    useEffect(() =>{
        const savedCount =localStorage.getItem('counter');

        if(savedCount){
            setCount(parseInt(savedCount))
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('counter',count.toString())
    },[count])

    const handleIncrement = (): void =>{
        setCount(count + 1);
    }
    const handleDecrement = (): void =>{
        setCount(count-1);
    }
    return (
        <div>
            <h1>count: {count}</h1>

            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
        </div>
    )
}