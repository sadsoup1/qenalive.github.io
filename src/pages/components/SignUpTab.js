import { 
    Button,
    FormControl, 
    FormErrorMessage,
    FormHelperText,
    FormLabel,  
    Input,  
    useToast,  
    VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../../supabase'

export default function LoginTab(){
    //For Supabase
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassowrd] = useState('')



    //React Router
    const navigate = useNavigate()

    //ChakraUI
    const toast = useToast()
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [isRepeatPasswordError,setIsRepeatPasswordError] = useState(false)

    const SignIn = async function(){

        toast.closeAll() //Closes all previous opened toasts (makes spam clicking submit be less annoying)

        if (email === "" || password === ""){ //Can limit what is/isn't acceptable for a password (use methods for comparisons for more complicated checks)
            toast({
                title: "Seems that you forgot to enter your email or password!",
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            })
            return
        }

        if (password !== repeatPassword){
            toast({
                title: "Please make sure both passwords entered are the same",
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            })
            return
        }

        try{
            const { data } = await supabase.auth.signUp({
                email, password
            })
            if (data) { navigate('/', { state: {session: data.session }}) }
        }catch(err){
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

    useEffect(()=>{ //using this to highlight missing data fields
        console.log(password.length)
        if (!email.includes('.') || !email.includes('@')){ //@ and '.' symbols
            setIsEmailError(true)
        } else if (email.includes('@') && email.includes('.')){
            setIsEmailError(false)
            if(password.length < 8){ //8 char password
                setIsPasswordError(true)
                setIsRepeatPasswordError(false)
            } else if(password.length >= 8){
                setIsPasswordError(false)
                if(repeatPassword !== password){ //matching passwords
                    setIsRepeatPasswordError(true)
                } else if(repeatPassword === password){
                    setIsRepeatPasswordError(false)
                }
            } 
        }
        
    }, [email, password, repeatPassword])

    return(
        <VStack as='form'>
            <FormControl isRequired isInvalid={isEmailError}>
                <FormLabel>Email</FormLabel>
                <Input 
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder='rsmith@gmail.com' 
                type='email' />
                {!isEmailError ? (
                    <FormHelperText>
                    asdf
                    </FormHelperText>
                    ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isRequired isInvalid={isPasswordError}>
                <FormLabel>Password</FormLabel>
                <Input 
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder='password' 
                type='password' />
                {!isPasswordError ? (
                    <FormHelperText>
                    asfd
                    </FormHelperText>
                    ) : (
                    <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isRequired isInvalid={isRepeatPasswordError}>
                <FormLabel>Re-enter Password</FormLabel>
                <Input 
                value={repeatPassword}
                onChange={(e)=>{setRepeatPassowrd(e.target.value)}}
                placeholder='re-enter password' 
                type='password' />
                {!isRepeatPasswordError ? (
                    <FormHelperText>
                    asdf
                    </FormHelperText>
                    ) : (
                    <FormErrorMessage>Passwords don't match.</FormErrorMessage>
                )}
            </FormControl>
            <Button onClick={SignIn} bg='gray.300'>Sign Up</Button>
        </VStack>
    )
}