import { Box, Heading } from "@chakra-ui/react";

export default function Settings() {
    return (
        <Box w='100vw' h='100vh' bg='gray.100'>
            <Heading pos='fixed' top='50vh' right='50vw'>
                Settings
            </Heading>
        </Box>
    )
}