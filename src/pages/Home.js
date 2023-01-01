import {  useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import supabase from "../supabase"
import { Flex } from "@chakra-ui/react"
import SideNav from "./components/SideNav"
import SizeDebug from "./components/SizeDebug"
import Interface from "./components/Interface"
import BottomNav from "./components/BottomNav"

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
        <Flex bgGradient='linear(to-r, #F9FBFC, #E3E3E3)'>
            <SizeDebug />
            <SideNav />
            <Interface />
            <BottomNav />
        </Flex>
    )
}