import { Box, Center, Heading, SimpleGrid, Flex, useColorModeValue } from "@chakra-ui/react";
import CardClass from "./components/ClassesPage/CardClass";

export default function Classes() {
    const bgColor = useColorModeValue('gray.100', 'gray.700')
    const boxBgColor = useColorModeValue('gray.50', 'gray.600')
    const textColor = useColorModeValue('gray.800', 'gray.50')
    const boxShadowColor = useColorModeValue('base', 'dark-lg')

    return (
        <Box w="100vw" h="100vh" bg={bgColor} overflow={"scroll"}>
            <SimpleGrid columns={1} rows={2} spacing={10} spacingY={5} mt="5">
                <Center>
                    <Box
                        bg={boxBgColor}
                        w="90%"
                        borderRadius="2xl"
                        boxShadow={boxShadowColor}
                        p="3"
                    >
                        <Heading p="6" color={textColor}>Classes</Heading>
                        <Flex flexWrap="wrap">
                            <CardClass></CardClass>
                            <CardClass></CardClass>
                            <CardClass></CardClass>
                            <CardClass></CardClass>
                            <CardClass></CardClass>
                        </Flex>
                    </Box>
                </Center>
            </SimpleGrid>
        </Box>
    );
}