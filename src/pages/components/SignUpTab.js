// import {
//     Button,
//     FormControl,
//     FormErrorMessage,
//     FormHelperText,
//     FormLabel,
//     Input,
//     useToast,
//     VStack,
//     useColorMode
// } from '@chakra-ui/react'
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import supabase from '../../supabase'

// export default function LoginTab() {
//     //For Supabase
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [repeatPassword, setRepeatPassowrd] = useState('')



//     //React Router
//     const navigate = useNavigate()

//     //ChakraUI
//     const toast = useToast()
//     const [isEmailError, setIsEmailError] = useState(false)
//     const [isPasswordError, setIsPasswordError] = useState(false)
//     const [isRepeatPasswordError, setIsRepeatPasswordError] = useState(false)

//     const SignIn = async function () {

//         toast.closeAll() //Closes all previous opened toasts (makes spam clicking submit be less annoying)

//         if (email === "" || password === "") { //Can limit what is/isn't acceptable for a password (use methods for comparisons for more complicated checks)
//             toast({
//                 title: "Seems that you forgot to enter your email or password!",
//                 position: 'bottom',
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: false,
//             })
//             return
//         }

//         if (password !== repeatPassword) {
//             toast({
//                 title: "Please make sure both passwords entered are the same",
//                 position: 'bottom',
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: false,
//             })
//             return
//         }

//         try {
//             const { data } = await supabase.auth.signUp({
//                 email, password
//             })
//             if (data) { navigate('/', { state: { session: data.session } }) }
//         } catch (err) {
//             toast({
//                 title: err,
//                 position: 'bottom',
//                 status: 'error',
//                 duration: 3000,
//                 isClosable: false,
//             })
//             console.log(err)
//         }
//     }

//     useEffect(() => { //using this to highlight missing data fields
//         console.log(password.length)
//         if (!email.includes('.') || !email.includes('@')) { //@ and '.' symbols
//             setIsEmailError(true)
//         } else if (email.includes('@') && email.includes('.')) {
//             setIsEmailError(false)
//             if (password.length < 8) { //8 char password
//                 setIsPasswordError(true)
//                 setIsRepeatPasswordError(false)
//             } else if (password.length >= 8) {
//                 setIsPasswordError(false)
//                 if (repeatPassword !== password) { //matching passwords
//                     setIsRepeatPasswordError(true)
//                 } else if (repeatPassword === password) {
//                     setIsRepeatPasswordError(false)
//                 }
//             }
//         }

//     }, [email, password, repeatPassword])

//     const { colorMode } = useColorMode()

//     return (
//         <VStack as='form'>
//             <FormControl isRequired isInvalid={isEmailError}>
//                 <FormLabel>Email</FormLabel>
//                 <Input
//                     value={email}
//                     bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
//                     onChange={(e) => { setEmail(e.target.value) }}
//                     placeholder='rsmith@gmail.com'
//                     type='email' />
//                 {!isEmailError ? (
//                     <FormHelperText>
//                     </FormHelperText>
//                 ) : (
//                     <FormErrorMessage>Email is required.</FormErrorMessage>
//                 )}
//             </FormControl>
//             <FormControl isRequired isInvalid={isPasswordError}>
//                 <FormLabel>Password</FormLabel>
//                 <Input
//                     value={password}
//                     bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
//                     onChange={(e) => { setPassword(e.target.value) }}
//                     placeholder='password'
//                     type='password' />
//                 {!isPasswordError ? (
//                     <FormHelperText>
//                     </FormHelperText>
//                 ) : (
//                     <FormErrorMessage>Password is required.</FormErrorMessage>
//                 )}
//             </FormControl>
//             <FormControl isRequired isInvalid={isRepeatPasswordError}>
//                 <FormLabel>Re-enter Password</FormLabel>
//                 <Input
//                     value={repeatPassword}
//                     bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
//                     onChange={(e) => { setRepeatPassowrd(e.target.value) }}
//                     placeholder='re-enter password'
//                     type='password' />
//                 {!isRepeatPasswordError ? (
//                     <FormHelperText>
//                     </FormHelperText>
//                 ) : (
//                     <FormErrorMessage>Passwords don't match.</FormErrorMessage>
//                 )}
//             </FormControl>
//             <Button onClick={SignIn} bg={colorMode === 'light' ? 'gray.400' : 'gray.600'} color={colorMode === 'light' ? 'gray.800' : 'white'}>Sign Up</Button>
//         </VStack>
//     )
// }

import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    useToast,
    VStack,
    useColorMode
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../../supabase'

export default function SignUpTab() {
    // For Supabase
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

    const SignUp = async function () {
        toast.closeAll() // Closes all previous opened toasts (makes spam clicking submit be less annoying)
        const userdata = await supabase.auth.getUser()

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

        if (!email.includes('.') || !email.includes('@')) { // @ and '.' symbols
            setIsEmailError(true)
            return
        }

        if (password.length < 8) { // 8 char password
            setIsPasswordError(true)
            setIsRepeatPasswordError(false)
            return
        }

        if (repeatPassword !== password) { // matching passwords
            setIsRepeatPasswordError(true)
            return
        }

        // Check if email is already taken
        const { data: userProfileData, error: userProfileError } = await supabase
            .from('user_profile')
            .select('auth_id')
            .eq('email', email)

        if (userProfileError) {
            console.log(userProfileError)
            return
        }

        if (userProfileData.length > 0 && userProfileData[0].auth_id != null) {
            toast({
                title: "Email is already taken",
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

            toast({
                title: "Check your email for verification",
                position: 'bottom',
                status: 'success',
                duration: 3000,
                isClosable: false,
            })

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
    }, [email, password, repeatPassword])

    const { colorMode } = useColorMode()

    return (
        <VStack as='form'>
            <FormControl isRequired isInvalid={isEmailError}>
                <FormLabel>Email</FormLabel>
                <Input
                    value={email}
                    bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
                    onChange={(e) => { setEmail(e.target.value) }}
                    placeholder='rsmith@gmail.com'
                    type='email' />
                {!isEmailError ? (
                    <FormHelperText>
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isRequired isInvalid={isPasswordError}>
                <FormLabel>Password</FormLabel>
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
                    <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isRequired isInvalid={isRepeatPasswordError}>
                <FormLabel>Re-enter Password</FormLabel>
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
            <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                    value={username}
                    bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
                    onChange={(e) => { setUsername(e.target.value) }}
                    placeholder='rsmith14'
                    type='text' />
            </FormControl>
            <Button onClick={SignUp} bg={colorMode === 'light' ? 'gray.400' : 'gray.600'} color={colorMode === 'light' ? 'gray.800' : 'white'}>Sign Up</Button>
        </VStack>
    )
}