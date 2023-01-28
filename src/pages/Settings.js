import { Box, Heading, SimpleGrid, Center } from "@chakra-ui/react";

export default function Settings() {
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
            <Heading p="6">Settings</Heading>
          </Box>
        </Center>
      </SimpleGrid>
    </Box>
    )
}