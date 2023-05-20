import React from 'react'
import { Icon, ListItem, useColorModeValue } from '@chakra-ui/react'
import { VscCircleOutline } from 'react-icons/vsc'

// List item components exported to be in a list of current classes in the sidebar
export default function ClassItem({name, open}) {
    const hoverBg = useColorModeValue('blue.100', 'blue.800')
    const hoverColor = useColorModeValue('white', 'gray.50')
    const activeBg = useColorModeValue('blue.200', 'blue.600')
    const activeColor = useColorModeValue('white', 'gray.50')
    const focusBg = useColorModeValue('blue.100', 'blue.600')
    const focusColor = useColorModeValue('white', 'gray.50')
    const bgColor = useColorModeValue('teal.500', 'gray.700')
    const color = useColorModeValue('gray.800', 'gray.50')

    return (
        <ListItem 
            fontSize='sm'
            as='button'
            p='1'
            cursor="pointer"
            color={color}
            fontWeight='semibold'
            bg={bgColor}
            _focus={{
                bg: focusBg,
                color: focusColor,
                borderRadius: 'xl'
            }}
            _hover={{
                bg: hoverBg,
                color: hoverColor,
                borderRadius: 'xl'
            }}
            _active={{
                bg: activeBg,
                color: activeColor,
                borderRadius: 'xl'
            }}
            sx={{ '-webkit-tap-highlight-color': 'transparent'}}
        >
            <Icon mr='2' as={VscCircleOutline} />
            {name}
        </ListItem>
    )
}