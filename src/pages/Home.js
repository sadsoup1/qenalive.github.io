import {  useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import supabase from "../supabase"

export default function Home(){

    //Router
    const navigate = useNavigate()
    const {state} = useLocation()

    //Supabase
    const [session, setSession] = useState()

    

    useEffect(()=>{
        if (!state || !supabase.auth.getSession()){
            navigate('/login')
        }
    }, [state, navigate])
    
    return(
        <>
            <h1>Home</h1>
        </>
    )
}