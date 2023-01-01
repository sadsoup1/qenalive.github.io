import { Avatar, Divider, Flex, Heading, IconButton, Image, useBreakpointValue } from "@chakra-ui/react";
import { VscMenu, VscHome, VscNotebook, VscSettingsGear } from 'react-icons/vsc'
import { useDisclosure } from "@chakra-ui/react"
import NavItem from './NavItem'

const classItems = [
    { name: 'Class 123456' },
    { name: 'Class 22' },
    { name: 'Class 323444' }
]

const NavItems = [
    { name: 'Home', icon: VscHome },
    { name: 'Classes', icon: VscNotebook, classes: classItems},
    { name: 'Settings', icon: VscSettingsGear },
]

export default function SideNav() {
    const { isOpen, onToggle } = useDisclosure();   
    const isWide = useBreakpointValue(
        {
            sm: false,
            lg: true,
        }
    )
    // Collapse sidenav when button is toggled or is less than widescreen
    const open = !isOpen && isWide; 

    return (
        <Flex>
            {/* Normal Desktop size sidebar with expand and contract*/}
            <Flex
                pos="sticky"
                left="5"
                h="95vh"
                mt="2.5vh"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                borderRadius={open ? "30px" : "15px"}
                w={open ? "200px" : "72px"}
                flexDir="column"
                justifyContent="space-between"
                display={{base: 'none', sm: 'flex'}}
            >
                {/* Upper/Middle Portion */}
                <Flex
                    p="5%"
                    flexDir="column"
                    alignItems={open ? "flex-start" : "center"}
                    as="nav"
                >
                    {/* Logos for expanded and compact sidebar */}
                    <Image mt={4} src='/qena192.png' display={open ? "flex" : "none"}/>
                    <Image mt={4} src='/qena64.png' display={open ? "none" : "flex"}/>
                    {/* Hamburger button */}
                    <IconButton
                        background="none"
                        mt={2}
                        _hover={{ background: 'none' }}
                        icon={<VscMenu />}
                        onClick={onToggle}
                        display={isWide ? 'flex' : 'none'}
                    />
                    {/* Pages */}
                    {NavItems.map(item => {
                        let classes = item.classes || [];
                        return ( 
                            <NavItem 
                                key={item.name}
                                name={item.name}
                                icon={item.icon} 
                                open={open} 
                                classes={classes}
                            /> 
                        )
                    })}

                </Flex>
                {/* Lower Portion */}
                <Flex
                    p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems={open ? "flex-start" : "center"}
                    mb={4}
                >
                    <Divider orientation='horizontal' display={open ? "flex" : "none"} />
                    {/* User Info */}
                    <Flex mt={4} align="center">
                        {/* 
                            Avatar becomes the initials of user. We don't need custom avatars 
                            Username will be from session info
                        */}
                        <Avatar name='User Name' size="sm" src='https://brokenlink.sdf' /> 
                        <Flex flexDir="column" ml={4} display={open ? "flex" : "none"}> 
                            <Heading as="h3" size="sm">User Name</Heading> {/* Long names need fixing */}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
        
    );
}