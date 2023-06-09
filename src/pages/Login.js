import { Center, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode, Image } from "@chakra-ui/react";
import LoginTab from "./components/LoginTab";
import SignUpTab from './components/SignUpTab'
import { useEffect } from "react";

export default function Login() {
    const { colorMode } = useColorMode();

    // use this function to change the title of the page
    useEffect(() => {
        document.title = 'Login';
    }, []);

    return (
        <Center
            h='100vh'
            w='100vw'
            flexDirection='column'
        >
            <Image src='qena192 text.png' alt='Qena Logo' boxSize='100px' mb={2} />
            <Tabs p='20px' isFitted bg={colorMode === 'light' ? 'gray.300' : 'gray.700'} borderRadius='10px' w='300px'>
                <TabList>
                    <Tab color={colorMode === 'light' ? 'gray.800' : 'whiteAlpha.900'}>Login</Tab>
                    <Tab color={colorMode === 'light' ? 'gray.800' : 'whiteAlpha.900'}>Sign Up</Tab>
                </TabList>
                <TabPanels p={0}>
                    <TabPanel p={0} pt={3}>
                        <LoginTab />
                    </TabPanel>
                    <TabPanel p={0} pt={3}>
                        <SignUpTab />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Center>
    )
}