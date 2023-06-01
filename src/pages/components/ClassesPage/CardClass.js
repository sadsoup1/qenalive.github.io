import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { BsArrowUpRight } from "react-icons/bs";

export default function CardClass({ year, classNumber, className, classDescription }) {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const hoverColor = useColorModeValue("gray.200", "gray.900");
  
  return (
    <Box
      rounded={"sm"}
      mx={5}
      my={2.5}
      overflow={"hidden"}
      bg={bgColor}
      border={"1px"}
      _hover={{ bg: hoverColor }}
      h="330px"
      w="450px"
    >
      <Box h={"150px"} borderBottom={"1px"} borderColor="black">
        <Img
          src={
            "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          }
          roundedTop={"sm"}
          objectFit="cover"
          h="full"
          w="full"
        />
      </Box>
      <Box p={4}>
        <Box
          bg="black"
          display={"inline-block"}
          px={2}
          py={1}
          color="white"
          mb={2}
        >
          <Text fontSize={"xs"} fontWeight="medium">
            {year}
          </Text>
        </Box>
        <Heading color={textColor} fontSize={"2xl"} noOfLines={1}>
          {classNumber}: {className}
        </Heading>
        <Text color={textColor} noOfLines={2} isTruncated>
          {classDescription}
        </Text>
      </Box>
      <HStack borderTop={"1px"} color={textColor}>
        <Flex
          p={4}
          alignItems="center"
          justifyContent={"space-between"}
          roundedBottom={"sm"}
          cursor={"pointer"}
          w="full"
        >
          <Text fontSize={"md"} fontWeight={"semibold"}>
            Professor is live
          </Text>
          <BsArrowUpRight />
        </Flex>
      </HStack>
    </Box>
  );
}