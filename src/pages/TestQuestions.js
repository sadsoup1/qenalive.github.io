import { Box, Heading, SimpleGrid, Center } from "@chakra-ui/react";
import AddQuestion from './components/AddQuestion';

export default function TestQuestions() {
    return (
        <Box w="100vw" h="100vh" bg="gray.100" overflow={"scroll"}>
      <SimpleGrid columns={1} rows={2} spacing={10} spacingY={5} mt="5">
        <Center>
          <Box
            bg="gray.50"
            w="90%"
            borderRadius="2xl"
            boxShadow="base"
            p="3"
          >
            <Heading p="6">Test Questions</Heading>
            <AddQuestion/>
          </Box>
        </Center>
      </SimpleGrid>
    </Box>
    )
}