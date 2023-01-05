import React from 'react'
import { Flex, Icon, List, Text } from '@chakra-ui/react'
import ClassItem from './ClassItem'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'

export default function NavItem({name, icon, open, to, classes}) {
    const navigate = useNavigate()
    const [session, setSession] = useState()

    return (
        <Flex flexDir='column' w='100%' >
            <Flex
                as='button'
                p='4'
                mt='20px'
                w='100%'
                cursor="pointer"
                color='teal.500'
                fontWeight='semibold'
                onClick={() => {navigate(to, { state: { session }})}}
                _focus={{
                    bg: 'blue.100',
                    color: 'white',
                    borderRadius: 'xl'
                }}
                _hover={{
                    bg: 'blue.100',
                    color: 'white',
                    borderRadius: 'xl'
                }}
                _active={{
                    bg: 'blue.200',
                    color: 'white',
                    borderRadius: 'xl'
                }}
                sx={{ 'WebkitTapHighlightColor': 'transparent'}}
            >
                <Icon ml='1' as={icon} fontSize="2xl" />
                <Text ml={open ? '20px' : '0px'} display={open ? "flex" : "none"}> {name} </Text>
            </Flex>
            <List 
                spacing={3}
                display={open ? "initial" : "none"}
                ml='6'
            >
                {classes.map(item => {
                    return (
                        <ClassItem key={item.name} name={item.name} />
                    )
                })}
            </List>
        </Flex>
    )
}