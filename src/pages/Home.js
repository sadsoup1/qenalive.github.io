import { Box, Button, Center, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, SimpleGrid, useDisclosure } from "@chakra-ui/react"
import { IoIosSearch } from 'react-icons/io'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import supabase from '../supabase'
import { useState } from 'react'


export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [id, setRoomID ] = useState('')
    const [name, setRoomName ] = useState('')

    const CreateRoom = async function () {
        const { data, error } = await supabase
        .from('rooms')
        .insert([
            { id, name },
        ])

        onClose()
    }

    return (
        <Box w='100vw' h='100vh' bg='gray.100' overflow={'scroll'}>
            <SimpleGrid 
                columns={1} 
                rows={2} 
                spacing={10} 
                spacingY={5}
                mt='5'
            >
                <Center>
                    <Flex 
                        bg='gray.50' 
                        minH='8vh'
                        w='90%'
                        borderRadius='2xl'
                        boxShadow='base'
                    >
                        <Flex w='75%'>
                            <InputGroup m={4}>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<IoIosSearch color='gray' />}
                                />
                                <Input bg='gray.100' type='search' placeholder='Find a room to join' />
                            </InputGroup>
                        </Flex>
                        <Flex>
                            <Button border='1px' borderColor='gray.200' m={4} ml='14' onClick={onOpen} >
                                Create a Room
                            </Button>

                            
                        </Flex>
                        
                    </Flex>
                </Center>
                <Center>
                    <Box 
                        bg='gray.50' 
                        h='85vh'
                        w='90%'
                        borderRadius='2xl'
                        boxShadow='base'
                    >
                    </Box>
                </Center>
            </SimpleGrid>
            
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Create a new room</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired>
                        <FormLabel>Room ID</FormLabel>
                        <Input onChange={(e)=>{setRoomID(e.target.value)}} placeholder='ABCD-1234' />
                        <FormLabel mt={10}>Room Name</FormLabel>
                        <Input mb={5} onChange={(e)=>{setRoomName(e.target.value)}} placeholder='Class Name - Section Name' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={CreateRoom}>Create room</Button>
                    <Button mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}