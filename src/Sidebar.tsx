import { Avatar, Box, Flex, Icon, Image, Stack } from "@chakra-ui/react";
import { VscArrowLeft, VscArrowRight } from 'react-icons/vsc';
import CreateRoomModal from './RoomCreatorModal';
import FindRoomModal from './RoomFinderModal';
import RoomList from "./RoomList";
import { useState, MouseEventHandler} from "react";

type SidebarProps = {
    isMobile: boolean,
    handleMouseEnter: Function,
    handleMouseLeave: Function,
    isCollapsed: boolean,
    onCollapseButtonClick: Function,
    sizes: number[],
    isHoveringCollapse: boolean,
    isHoveringExpand: boolean,
    onExpandButtonClick: Function,
}

// This is the sidebar itself
function Sidebar({ isMobile, handleMouseEnter, handleMouseLeave, isCollapsed, onCollapseButtonClick, sizes, isHoveringCollapse, isHoveringExpand, onExpandButtonClick }: SidebarProps) {
    // Get the list of joined rooms to pass to the room list component which gets updated on each new join
    const [joinedRooms, setJoinedRooms] = useState(() => {
        const data = window.localStorage.getItem('JOINED_ROOMS_LIST');
        return data !== null ? JSON.parse(data) : [];
    });

    return (
        <Flex
            h="100%"                        // Height of the sidebar takes up the entire pane size it fits in
            w="100%"                        // Width of the sidebar takes up the entire pane size it fits in
            bg="gray.50"                    // Background color of the sidebar
            borderRight='3px'               // Border of the sidebar
            borderColor='gray.300'          // Border color of the sidebar
            onMouseEnter={handleMouseEnter as MouseEventHandler<HTMLDivElement>} // Function to call when the mouse enters the sidebar
            onMouseLeave={handleMouseLeave as MouseEventHandler<HTMLDivElement>} // Function to call when the mouse leaves the sidebar
            display='flex'                  // TBH i forget what i needed this for but I think it was crucial for the stack?  
        >
            {/* The buttons to collapse/expand the sidebar get hidden/disabled on mobile */}
            {isMobile ? null : (
                <>
                    {/* The button to collapse the sidebar */}
                    <Flex
                        disabled={isCollapsed}
                        as="button"
                        onClick={onCollapseButtonClick as MouseEventHandler<HTMLDivElement>}
                        _hover={{ bg: 'gray.100' }}
                        _active={{ boxShadow: 'outline' }}
                        w='35px'
                        h='30px'
                        bg="white"
                        border='1px'
                        borderColor='gray.300'
                        boxShadow='inner'
                        pos={'absolute'}
                        top={'54px'}
                        left={sizes[0] - 55}
                        borderRadius='xl'
                        justifyContent='left'
                        alignItems='center'
                        display={isHoveringCollapse ? 'flex' : 'none'}
                        marginLeft='30px'
                    >
                        <Icon ml='1.5' as={VscArrowLeft} color="gray.500" />
                    </Flex>
                    {/* The button to expand the sidebar */}
                    <Flex
                        disabled={!isCollapsed}
                        as="button"
                        onClick={onExpandButtonClick as MouseEventHandler<HTMLDivElement>}
                        _hover={{ bg: 'gray.100' }}
                        _active={{ boxShadow: 'outline' }}
                        w='35px'
                        h='30px'
                        bg="white"
                        border='1px'
                        borderColor='gray.300'
                        boxShadow='inner'
                        pos={'absolute'}
                        top={'54px'}
                        left={sizes[0] - 55}
                        borderRadius='xl'
                        justifyContent='left'
                        alignItems='center'
                        display={isHoveringExpand ? 'flex' : 'none'}
                        marginLeft='30px'
                    >
                        <Icon ml='1.5' as={VscArrowRight} color="gray.500" />
                    </Flex>
                </>

            )}

            {/* The sidebar content */}
            <Flex
                w='100%'    // Take up the entire width of the parent component
                h='100%'    // Take up the entire height of the parent component
                direction={isMobile ? 'row' : 'column'} // If mobile, the sidebar is horizontal, otherwise it's vertical
            >
                {/* 
                    This box is the top most box that houses the logo/home button.
                    The widths change depending on the layout the page its in.
                    Numbers are arbitrary and can be changed.
                */}
                <Flex
                    w={isMobile ? '20%' : '100%'}
                    h={isMobile ? '100%' : '72px'}
                    bg='red.400'
                    justifyContent="center"
                    alignItems="center"
                >
                    <Image src="/qena192.png" maxWidth="90%" maxHeight="90%" />
                </Flex>

                {/* 
                    This box is the middle box that houses the create room and find room buttons.
                    The widths change depending on the layout the page its in.
                    Numbers are arbitrary and can be changed.
                */}
                <Box w={isMobile ? '60%' : '100%'} h={isMobile ? '100%' : 'auto'} bg='green.400'>
                    {/* This vertical stack holds the two buttons for create and find rooms */}
                    <Stack
                        direction={isMobile ? 'row' : 'column'}
                        justifyContent="center"
                        alignItems={isCollapsed ? "center" : "left"}
                        padding='16px'
                        spacing='12px'
                    >
                        <CreateRoomModal isCollapsed={isCollapsed} />
                        <FindRoomModal isCollapsed={isCollapsed} setJoinedRooms={setJoinedRooms} />
                    </Stack>
                </Box>

                {/* On mobile layout, hide the list of classes a user is in */}
                {
                    isMobile ? undefined :
                        // Eventually will be a scrollable list of classes in this section
                        <Box
                            w={isMobile ? '100%' : '100%'}
                            h={isMobile ? '100%' : '60%'}
                            bg='blue.400'
                            flex='1'
                        >
                            <RoomList joinedRooms={joinedRooms}/>
                        </Box>
                }

                {/* This box holds the account icon and drop down stuff for settings */}
                <Flex
                    w={isMobile ? '20%' : '100%'}
                    h={isMobile ? '100%' : '72px'}
                    bg='purple.400'
                    justifyContent="center"
                    alignItems="center"
                >
                    <Avatar maxWidth="100%" maxHeight="100%" borderRadius="full" />
                </Flex>

            </Flex>
        </Flex>
    )
}

export default Sidebar;