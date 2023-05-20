import { Box, Heading, SimpleGrid, Center, useColorMode } from "@chakra-ui/react";
import AddQuestion from './components/AddQuestion';

export default function TestQuestions() {
  const { colorMode } = useColorMode();

  return (
    <Box w="100vw" h="100vh" bg={colorMode === 'light' ? 'gray.100' : 'gray.800'} overflow={"scroll"}>
      <SimpleGrid columns={1} rows={2} spacing={10} spacingY={5} mt="5">
        <Center>
          <Box
            bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}
            w="90%"
            borderRadius="2xl"
            boxShadow="base"
            p="3"
          >
            <Heading p="6" color={colorMode === 'light' ? 'gray.800' : 'white'}>Test Questions</Heading>
            <AddQuestion />
          </Box>
        </Center>
      </SimpleGrid>
    </Box>
  )
}