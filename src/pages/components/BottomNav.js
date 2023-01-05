import { Box, Flex } from "@chakra-ui/react";

// TODO
export default function BottomNav() {
    return (
        <Flex display={{base: 'initial', sm: 'none'}}>
            {/* Top Banner */}
            <Flex>
                <Box 
                    bg='pink.300' 
                    h='45px' 
                    w='100vw'
                >
                    Banner
                </Box>
            </Flex>
            {/* Main Middle Content */}
            <Flex>
                <Box 
                    bg='green.300' 
                    h='calc(100vh - 70px - 45px)' 
                    w='100vw'
                    borderTop='4px solid #e3e3e3'
                    borderBottom='4px solid #e3e3e3'
                >
                    Main
                </Box>
            </Flex>
            {/* Bottom Navigation */}
            <Flex>
                <Box 
                    bg='blue.300' 
                    h='70px' 
                    w='100vw'
                >
                    Nav
                </Box>
            </Flex>
        </Flex>
    )
}