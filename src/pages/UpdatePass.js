import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
    useColorMode,
    VStack,
    Box,
    Center,
    Image,
} from '@chakra-ui/react';
import supabase from '../supabase';

export default function UpdatePass() {
    // React Router
    const navigate = useNavigate();

    // Chakra UI
    const toast = useToast();
    const { colorMode } = useColorMode();

    // State
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Event handlers
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            toast({
                title: 'Passwords do not match',
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            });
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password,
            });

            if (error) {
                throw error;
            }

            toast({
                title: 'Password updated successfully',
                position: 'bottom',
                status: 'success',
                duration: 5000,
                isClosable: false,
            });

            navigate('/');
        } catch (error) {
            toast({
                title: error.message,
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            });
        }
    };

    return (
        <Center
            h='100vh'
            w='100vw'
            flexDirection='column'
        >
            <Image src='qena192 text.png' alt='Qena Logo' boxSize='100px' mb={2} />

            <Box
                bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
                p={8}
                borderRadius={8}
                boxShadow="lg"
            >
                <VStack as="form" onSubmit={handleSubmit} spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            bg={colorMode === 'light' ? 'white' : 'gray.700'}
                            color={colorMode === 'light' ? 'gray.800' : 'white'}
                            _placeholder={{ color: colorMode === 'light' ? 'gray.400' : 'gray.500' }}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            bg={colorMode === 'light' ? 'white' : 'gray.700'}
                            color={colorMode === 'light' ? 'gray.800' : 'white'}
                            _placeholder={{ color: colorMode === 'light' ? 'gray.400' : 'gray.500' }}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        bg={colorMode === 'light' ? 'gray.400' : 'gray.600'}
                        color={colorMode === 'light' ? 'gray.800' : 'white'}
                        _hover={{ bg: colorMode === 'light' ? 'gray.500' : 'gray.700' }}
                    >
                        Update Password
                    </Button>
                </VStack>
            </Box>

        </Center>
    );
}