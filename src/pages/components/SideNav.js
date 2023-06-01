import { Avatar, Button, Divider, Flex, Heading, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Switch, useBreakpointValue, useColorMode } from "@chakra-ui/react";
import { VscMenu, VscHome, VscNotebook, VscSettingsGear, VscChevronDown, VscBeaker, VscAdd, VscSearch } from 'react-icons/vsc'
import { useDisclosure } from "@chakra-ui/react"
import NavItem from './NavItem'
import supabase from "../../supabase";
import { useNavigate } from "react-router-dom"
import { IsAuthed } from "./RequireAuth";
import { useState } from 'react'

// Current Classes - Implemented later
const classItems = []//[{name: "Course 1"},{name: "Course 2"}, {name: "Course 3"}, {name: "Course 4"}]

// Navigation to different site pages
const NavItems = [
    { name: 'Create Room', icon: VscAdd, to: '/' },
    { name: 'Find Room', icon: VscSearch, to: '/'},
    //{ name: 'Home', icon: VscHome, to: '/' },
    { name: 'Classes', icon: VscNotebook, to: '/', classes: classItems },
    { name: 'Test Questions', icon: VscBeaker, to: '/testQuestions' }
]

export default function SideNav() {

    const [session, setSession] = useState()

    //Router
    const navigate = useNavigate()

    const handleSettingsClick = () => {
        navigate("/settings",  { state: { session }});
    };

    const onSignOut = async function () {
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error);
        navigate('/login');
    };

    // Collapse sidenav when button is toggled or is less than widescreen
    const { isOpen, onToggle } = useDisclosure();
    const isWide = useBreakpointValue({ sm: false, lg: true })
    const open = !isOpen && isWide;

    // Get the color mode from Chakra UI
    const { colorMode, toggleColorMode } = useColorMode();

    // Hide Side nav if user doesn't have auth
    if (!IsAuthed()) {
        return null;
    }

    return (
        <Flex
            pos="sticky"
            boxShadow='md'
            w={open ? "200px" : "72px"}
            flexDir="column"
            justifyContent="space-between"
            display={{ base: 'none', sm: 'flex' }}
            bg={colorMode === "light" ? 'gray.50' : 'gray.800'}
            color={colorMode === "light" ? 'black' : 'white'}
        >
            {/* Upper/Middle Portion */}
            <Flex
                p="5%"
                flexDir="column"
                alignItems={open ? "flex-start" : "center"}
                as="nav"
            >
                {/* Logos for expanded and compact sidebar */}
                <Image mt={4} src='/qena192 text.png' display={open ? "flex" : "none"} />
                <Image mt={4} src='/qena64.png' display={open ? "none" : "flex"} />
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
                            to={item.to}
                            classes={classes}
                        />
                    )
                })}

            </Flex>

            {/* Lower Portion */}
            <Flex
                flexDir="column"
                w="100%"
                alignItems={open ? "flex-start" : "center"}
                mb={4}
            >
                <Divider
                    mb={4}
                    orientation='horizontal'
                    display={open ? "flex" : "none"}
                />

                {/* User Info Menu*/}
                <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<VscChevronDown />}
                        bg='transparent'
                        w='100%'
                    >
                        <Flex align="center" >
                            {/* 
                                Functionality TODO
                                Avatar becomes the initials of user. 
                                We don't need custom avatars but can support them
                                Username will be from session info
                            */}
                            <Avatar name='User Name' size={open ? 'sm' : 'xs'} ml='-2' />
                            <Flex
                                flexDir="column"
                                ml={4}
                                display={open ? "flex" : "none"}
                            >
                                <Heading as='h3' fontWeight='semibold' size="sm"> {/* Long names need fixing */}
                                    User Name
                                </Heading>
                            </Flex>
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        {/* 
                            Functionality TODO 
                            Profile should bring up normal profile stuff to edit
                        */}
                       
                        <MenuItem>
                            <span>Dark Mode &nbsp;</span>
                            <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
                        </MenuItem>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem onClick={() => handleSettingsClick()}>Settings</MenuItem>;
                        <MenuItem onClick={() => onSignOut()}>Sign out</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
}