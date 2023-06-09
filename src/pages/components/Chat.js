import { useState, useEffect } from 'react';
import { Input, Button, HStack, Box, Table, Tbody, Tr, Badge, Td } from '@chakra-ui/react';
import supabase from '../../supabase';

export default function Chat() {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Subscribe to new messages in the chat messages table
        // const chat = supabase.channel('custom-insert-channel')
        supabase.channel('custom-insert-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'chat' },
                payload => {
                    fetchData()
                    console.log('Change received!', payload);
                }
            )
            .subscribe();
    }, []);

    async function fetchData() {
        let { data: messages, error } = await supabase.from('chat').select('*');
        console.log(error);
        setMessages(messages);
    }

    useEffect(() => {
        fetchData();
    }, []);



    const handleSubmit = async e => {
        e.preventDefault();

        const userdata = await supabase.auth.getUser()

        const { data: userProfileData, error: userProfileError } = await supabase
            .from('user_profile')
            .select('username')
            .eq('auth_id', userdata.data.user.id)

        if (userProfileError) {
            console.log(userProfileError)
        }

        // Insert the new message into the chat messages table
        const { data, error } = await supabase.from('chat').insert({
            message: newMessage,
            sender_id: userProfileData[0].username,
            created_at: new Date().toISOString(),
        });

        if (error) {
            console.log(data);
            console.log(error);
        } else {
            // Clear the input field after the message is sent
            setNewMessage('');
        }
    };

    return (
        <Box maxW="500px" maxH="360px" mx="auto" my="auto" >
            <Table size='sm' variant="unstyled" >
                <Tbody>
                    {messages.map(message => (
                        <Tr key={message.id}>
                            <Td>{message.message}</Td>
                            <Td><Badge>{message.sender_id}</Badge></Td>
                            <Td>{new Date(message.created_at).toLocaleTimeString()}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <form onSubmit={handleSubmit}>
                <HStack my="4" h="45">
                    <Input
                        type="text"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                    />
                    <Button type="submit">Send</Button>
                </HStack>
            </form>
        </Box>
    );
}