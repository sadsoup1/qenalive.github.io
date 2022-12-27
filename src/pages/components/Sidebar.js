import { Avatar, Divider, Flex, Heading, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FiMenu } from 'react-icons/fi'

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")

    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            mt="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize === "small" ? "15px" : "30px"}
            w={navSize === "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                alignItems="flex-start"
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize === "small") changeNavSize("large")
                        else changeNavSize("small")
                    }}
                />
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize === "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" />
                    <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">User Name</Heading>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}