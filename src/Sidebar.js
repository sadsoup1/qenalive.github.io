import { Avatar, Box, Flex, Icon, Image, Stack } from "@chakra-ui/react";
import { VscArrowLeft, VscArrowRight, VscSearch, VscAdd} from 'react-icons/vsc';

function Sidebar({ isMobile, handleMouseEnter, handleMouseLeave, isCollapsed, onCollapseButtonClick, sizes, isHoveringCollapse, isHoveringExpand, onExpandButtonClick }) {
    return (
        <Flex // Sidebar
            h="100%"
            w="100%"
            bg="gray.50"
            border='1px'
            borderColor='gray.300'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            display='flex'
        >
            {isMobile ? null : (
                <>
                    <Flex // Arrow
                        disabled={isCollapsed}
                        as="button"
                        onClick={onCollapseButtonClick}
                        _hover={{ bg: 'gray.100' }}
                        _active={{ boxShadow: 'outline' }}
                        w='35px'
                        h='30px'
                        bg="white"
                        border='1px'
                        borderColor='gray.300'
                        boxShadow='inner'
                        pos={'absolute'}
                        top={'85px'}
                        left={sizes[0] - 55}
                        borderRadius='xl'
                        justifyContent='left'
                        alignItems='center'
                        display={isHoveringCollapse ? 'flex' : 'none'}
                        marginLeft='30px'
                    >
                        <Icon ml='1.5' as={VscArrowLeft} color="gray.500" />
                    </Flex>
                    <Flex // Arrow
                        disabled={!isCollapsed}
                        as="button"
                        onClick={onExpandButtonClick}
                        _hover={{ bg: 'gray.100' }}
                        _active={{ boxShadow: 'outline' }}
                        w='35px'
                        h='30px'
                        bg="white"
                        border='1px'
                        borderColor='gray.300'
                        boxShadow='inner'
                        pos={'absolute'}
                        top={'85px'}
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


            <Stack
                w='100%'
                h='100%'
                direction={isMobile ? 'row' : 'column'}
            >
                <Flex
                    w={isMobile ? '20%' : '100%'}
                    h={isMobile ? '100%' : '10%'}
                    bg='red.400'
                    justifyContent="center"
                    alignItems="center"
                >
                    <Image src="/qena192.png" maxWidth="100%" maxHeight="100%" />
                </Flex>
                <Box w={isMobile ? '60%' : '100%'} h={isMobile ? '100%' : '20%'} bg='green.400'>
                    <Stack
                        w='100%'
                        h='100%'
                        direction={isMobile ? 'row' : 'column'}
                        justifyContent="center"
                        alignItems={isCollapsed ? "center" : "left"}
                        spacing="40%"
                    >
                        <Flex >
                            <Icon as={VscAdd} fontSize='2xl' ml={!isCollapsed ? 5 : 0} />
                            {!isCollapsed ? "Create room" : undefined}
                        </Flex>
                        <Flex >
                            <Icon as={VscSearch} fontSize='2xl' ml={!isCollapsed ? 5 : 0} />
                            {!isCollapsed ? "Find room" : undefined}
                        </Flex>
                    </Stack>
                </Box>
                {isMobile ? undefined : <Box w={isMobile ? '100%' : '100%'} h={isMobile ? '100%' : '60%'} bg='blue.400'>

                </Box>}
                <Flex
                    w={isMobile ? '20%' : '100%'}
                    h={isMobile ? '100%' : '10%'}
                    bg='purple.400'
                    justifyContent="center"
                    alignItems="center"
                >
                    <Avatar maxWidth="100%" maxHeight="100%" borderRadius="full" />
                </Flex>

            </Stack>
        </Flex>
    )
}

export default Sidebar;