import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";

export default function PostWithLike() {
  const [liked, setLiked] = useState(false);

  return (
    <Box
      rounded={"sm"}
      mx={5}
      my={2.5}
      overflow={"hidden"}
      bg="white"
      border={"1px"}
      _hover={{ bg: "#f5f5f5" }}
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
            2023
          </Text>
        </Box>
        <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
          PNB 3251: Bio of the Brain
        </Heading>
        <Text color={"gray.500"} noOfLines={2}>
          We will be learning about the brain and how it works. Cool!
        </Text>
      </Box>
      <HStack borderTop={"1px"} color="black">
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
