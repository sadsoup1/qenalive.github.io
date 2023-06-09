import {
    Button,
    FormControl,
    Input,
    useToast,
    VStack,
    useColorMode
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../../supabase'

export default function LoginTab() {
    //For Supabase
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //React Router
    const navigate = useNavigate()

    //ChakraUI
    const toast = useToast()
    const { colorMode } = useColorMode()

    const SignIn = async function () {
        toast.closeAll() //Closes all previous opened toasts (makes spam clicking submit be less annoying)
        if (email === "" || password === "") { //Can limit what is/isn't acceptable for a password (use methods for comparisons for more complicated checks)
            toast({
                title: "Seems that you forgot to enter your email or password!",
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            })
            return
        }
        try {
            const { data } = await supabase.auth.signInWithPassword({
                email, password
            })
            console.log(data)
            if (data.session) {

                // it worked
                navigate('/', { state: { session: data.session } })

            } else {
                toast({
                    title: "Please check your information or sign up!",
                    position: 'bottom',
                    status: 'error',
                    duration: 5000,
                    isClosable: false,
                })
            }
        } catch (err) {
            toast({
                title: err,
                position: 'bottom',
                status: 'error',
                duration: 3000,
                isClosable: false,
            })
            console.log(err)
        }
    }

    const ForgotPassword = async function () {
        toast.closeAll() //Closes all previous opened toasts (makes spam clicking submit be less annoying)
        if (email === "") { //Can limit what is/isn't acceptable for a password (use methods for comparisons for more complicated checks)
            toast({
                title: "Please enter your email to reset your password!",
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            })
            return
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirect_to: '/updatepass',
        });

        if (error) {
            toast({
                title: error,
                position: 'bottom',
                status: 'error',
                duration: 3000,
                isClosable: false,
            })
        }

        toast({
            title: "Password reset email sent!",
            position: 'bottom',
            status: 'success',
            duration: 5000,
            isClosable: false,
        })


    }

    return (
        <VStack as='form'>
            <FormControl isRequired>
                <Input
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    placeholder='email'
                    type='email'
                    bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
                    color={colorMode === 'light' ? 'gray.800' : 'white'}
                />
            </FormControl>
            <FormControl isRequired pb={3}>
                <Input
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    placeholder='password'
                    type='password'
                    bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
                    color={colorMode === 'light' ? 'gray.800' : 'white'}
                />
            </FormControl>
            <Button onClick={() => SignIn()} bg={colorMode === 'light' ? 'gray.400' : 'gray.600'} color={colorMode === 'light' ? 'gray.800' : 'white'}>Sign In</Button>
            <Button onClick={() => ForgotPassword()} bg={colorMode === 'light' ? 'gray.400' : 'gray.600'} color={colorMode === 'light' ? 'gray.800' : 'white'} mt={3}>Forgot Password</Button>
        </VStack>
    )
}