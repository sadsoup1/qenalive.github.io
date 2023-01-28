import { Box, Center, Heading, SimpleGrid, Flex } from "@chakra-ui/react";
import CardClass from "./components/ClassesPage/CardClass";

export default function Classes() {
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
            <Heading p="6">Classes</Heading>
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
