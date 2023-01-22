import { Box, Button, Center, Flex, Input, InputGroup, InputLeftElement, SimpleGrid } from "@chakra-ui/react"
import { IoIosSearch } from 'react-icons/io'

export default function Home() {
    return (
        <Box w='100vw' h='100vh' bg='gray.100'>
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
                            <Button border='1px' borderColor='gray.200' m={4} ml='14'>
                                Create a Room
                            </Button>
                        </Flex>
                        
                    </Flex>
                </Center>
                <Center>
                    <Box 
                        bg='gray.50' 
                        h='80vh'
                        w='90%'
                        borderRadius='2xl'
                        boxShadow='base'
                    >
                    </Box>
                </Center>
            </SimpleGrid>
        </Box>
    )
}