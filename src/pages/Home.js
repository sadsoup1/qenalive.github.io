import {  useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import supabase from "../supabase"
import Sidebar from "./components/Sidebar"
import { Flex } from "@chakra-ui/react"

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
        <Flex>
            <Sidebar />
        </Flex>
    )
}