import React from 'react'
import { Icon, ListItem } from '@chakra-ui/react'
import { VscCircleOutline } from 'react-icons/vsc'

// List item components exported to be in a list of current classes in the sidebar
export default function ClassItem({name, open}) {
    return (
        <ListItem 
            fontSize='sm'
            as='button'
            p='1'
            cursor="pointer"
            color='teal.500'
            fontWeight='semibold'
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
            sx={{ '-webkit-tap-highlight-color': 'transparent'}}
        >
            <Icon mr='2' as={VscCircleOutline} />
            {name}
        </ListItem>
    )
}
