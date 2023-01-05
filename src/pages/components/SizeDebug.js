import { Flex, Text } from "@chakra-ui/react";

export default function SizeDebug() {
    return (
        <Flex
            pos="absolute"
            top="0vh" 
            left="50vw"
            backgroundColor={['red', 'orange', 'yellow', 'green', 'blue', 'purple']}
        >
            <Text display={['initial','none','none','none','none']}>
                Small
            </Text>
            <Text display={['none','initial','none','none','none']}>
                Medium
            </Text>
            <Text display={['none','none','initial','none','none']}>
                Large
            </Text>
            <Text display={['none','none','none','initial','none']}>
                Extra Large
            </Text>
            <Text display={['none','none','none','none','initial']}>
                Extra Extra Large
            </Text>
        </Flex>
    )
}