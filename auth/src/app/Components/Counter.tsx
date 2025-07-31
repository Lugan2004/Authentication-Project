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
        if(count>0){
            setCount(count-1);
        }       
    }
    return (
        <div>
            <h1 className="text-3xl font-bold center">count: {count}</h1>

            <button onClick={handleIncrement} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 mx-2 px-4 rounded">Increment</button>
            <button onClick={handleDecrement} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 mx-2 px-4 rounded">Decrement</button>
        </div>
    )
}