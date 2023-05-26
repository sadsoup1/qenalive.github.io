import { Center, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode } from "@chakra-ui/react";
import LoginTab from "./components/LoginTab";
import SignUpTab from './components/SignUpTab'

export default function Home(){
    const { colorMode } = useColorMode();

    return(
        <Center
        h='100vh'
        w='100vw'
        >
            <Tabs p='20px' bg={colorMode === 'light' ? 'gray.300' : 'gray.700'} borderRadius='10px' w='30vw'>
                <TabList>
                    <Tab color={colorMode === 'light' ? 'gray.800' : 'whiteAlpha.900'}>Login</Tab>
                    <Tab color={colorMode === 'light' ? 'gray.800' : 'whiteAlpha.900'}>Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <LoginTab />
                    </TabPanel>
                    <TabPanel>
                        <SignUpTab />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Center>
    )
}