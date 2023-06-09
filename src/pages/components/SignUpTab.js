import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    Input,
    useToast,
    VStack,
    useColorMode
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import supabase from '../../supabase'
import { useNavigate } from 'react-router-dom'

export default function SignUpTab() {
    // Supabase
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [username, setUsername] = useState('')

    // React Router
    const navigate = useNavigate()

    // ChakraUI
    const toast = useToast()
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [isRepeatPasswordError, setIsRepeatPasswordError] = useState(false)
    const [isUsernameError, setIsUsernameError] = useState(false)

    const SignUp = async function () {

        // Closes all previous opened toasts (makes spam clicking submit be less annoying)
        toast.closeAll()
        
        // Check if any fields are empty
        if (email === "" || password === "" || username === "") {
            toast({
                title: "Please fill in all required fields",
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            })
            return
        }
        
        // @ and '.' symbols in email
        if (!email.includes('.') || !email.includes('@')) { 
            setIsEmailError(true)
            return
        }
        // 8 char minimum password
        if (password.length < 8) { 
            setIsPasswordError(true)
            setIsRepeatPasswordError(false)
            return
        }
        // matching passwords
        if (repeatPassword !== password) { 
            setIsRepeatPasswordError(true)
            return
        }
        // username requirements
        if (username.length < 3 || username.length > 12 || !/^[a-z0-9]+$/.test(username)) { 
            setIsUsernameError(true)
            return
        }

        // Check if email is already taken
        const { data: userProfileEmail, error: userProfileEmailError } = await supabase
            .from('user_profile')
            .select('auth_id')
            .eq('email', email)

        // Check if username is already taken
        const { data: userProfileId, error: userProfileIdError } = await supabase
            .from('user_profile')
            .select('auth_id')
            .eq('username', username)

        if (userProfileEmailError || userProfileIdError) {
            console.log("Error email data")
            console.log(userProfileEmailError)
            console.log("Error id data")
            console.log(userProfileIdError)
            return
        }

        if (userProfileEmail.length > 0 && userProfileEmail[0].auth_id != null) {
            toast({
                title: "Email is already taken",
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            })
            return
        }

        if (userProfileId.length > 0 && userProfileId[0].auth_id != null) {
            toast({
                title: "Username is already taken",
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            })
            return
        }

        try {
            // Sign up the user
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) {
                console.log("Error signing up")
                console.log(user)
                console.log(error)
                return
            }

            // Insert the user's profile data into the user_profile table
            const { data: userProfileInsertData, error: userProfileInsertError } = await supabase
                .from('user_profile')
                .insert({
                    username: username,
                    email: email,
                })

            console.log(userProfileInsertData)
            console.log(userProfileInsertError)

            // toast({
            //     title: "Check your email for verification",
            //     position: 'bottom',
            //     status: 'success',
            //     duration: 3000,
            //     isClosable: false,
            // })
            navigate('/checkverification')

            if (userProfileInsertError) {
                console.log(userProfileInsertError)
                return
            }

            // if (userProfileInsertData) {
            //     // navigate('/', { state: { session: user.session } })
            // }
        } catch (err) {
            toast({
                title: err.message,
                position: 'bottom',
                status: 'error',
                duration: 3000,
                isClosable: false,
            })
            console.log(err)
        }
    }

    useEffect(() => { // using this to highlight missing data fields
        if (email.includes('@') && email.includes('.')) {
            setIsEmailError(false)
        } else {
            setIsEmailError(true)
        }

        if (password.length >= 8) {
            setIsPasswordError(false)
        } else {
            setIsPasswordError(true)
        }

        if (repeatPassword === password) {
            setIsRepeatPasswordError(false)
        } else {
            setIsRepeatPasswordError(true)
        }

        if (username.length >= 3 && username.length <= 12 && /^[a-z0-9]+$/.test(username)) {
            setIsUsernameError(false)
        } else {
            setIsUsernameError(true)
        }

    }, [email, password, repeatPassword, username])

    const { colorMode } = useColorMode()

    return (
        <VStack as='form'>
            <FormControl isRequired isInvalid={isEmailError}>
                <Input
                    value={email}
                    bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
                    onChange={(e) => { setEmail(e.target.value) }}
                    placeholder='email'
                    type='email' />
                {!isEmailError ? (
                    <FormHelperText>
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isRequired isInvalid={isPasswordError}>
                <Input
                    value={password}
                    bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
                    onChange={(e) => { setPassword(e.target.value) }}
                    placeholder='password'
                    type='password' />
                {!isPasswordError ? (
                    <FormHelperText>
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>minimum 8 characters</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isRequired isInvalid={isRepeatPasswordError}>
                <Input
                    value={repeatPassword}
                    bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
                    onChange={(e) => { setRepeatPassword(e.target.value) }}
                    placeholder='re-enter password'
                    type='password' />
                {!isRepeatPasswordError ? (
                    <FormHelperText>
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Passwords don't match.</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isRequired isInvalid={isUsernameError}>
                <Input
                    value={username}
                    bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
                    onChange={(e) => { setUsername(e.target.value.toLowerCase()) }}
                    placeholder='username'
                    type='text' />
                {!isUsernameError ? (
                    <FormHelperText>
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Must be between 3-12 lowercase alphanumeric characters</FormErrorMessage>
                )}
            </FormControl>
            <Button onClick={SignUp} bg={colorMode === 'light' ? 'gray.400' : 'gray.600'} color={colorMode === 'light' ? 'gray.800' : 'white'}>Sign Up</Button>
        </VStack>
    )
}