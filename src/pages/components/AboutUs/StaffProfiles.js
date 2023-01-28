import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Link,
    Badge,
    useColorModeValue,
    IconButton,
    Flex,
  } from '@chakra-ui/react';
  
  export default function StaffProfiles() {
    return (
      <Flex py={6} alignItems={'center'} flexDirection={'column'}>
        
        <Box
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          margin='10'
          textAlign={'center'}
        >
          <Avatar size={'xl'} alt={'Avatar Alt'} mb={4} pos={'relative'} />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            Aditya Chandraker
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            Founder
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}
          >
            Premed student, CS minor, Pianist, and a fan of spicy food
          </Text>
          <Flex
            flexWrap={'wrap'}
            justifyItems={'center'}
            alignContent="center"
            columnGap={2}
            rowGap={1}
            p={3}
          >
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}
            >
              #tabletennis
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}
            >
              #chess
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}
            >
              #art
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}
            >
              #taekwondo
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}
            >
              #academics
            </Badge>
          </Flex>
          <Stack>
            <Link
              href={'mailto: aditya.chandraker@uconn.edu'}
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
            >
              aditya.chandraker@uconn.edu
            </Link>
          </Stack>
        </Box> 
      </Flex>
    );
  }
  