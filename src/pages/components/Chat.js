import { useState, useEffect } from 'react';
import { Input, Button, HStack, Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import supabase from '../../supabase';

export default function Chat() {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Subscribe to new messages in the chat messages table
        const chat = supabase.channel('custom-insert-channel')
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
        setMessages(messages);
    }

    useEffect(() => {
        fetchData();
    }, []);



    const handleSubmit = async e => {
        e.preventDefault();

        const userdata = await supabase.auth.getUser()

        // Insert the new message into the chat messages table
        const { data, error } = await supabase.from('chat').insert({
            message: newMessage,
            sender_id: userdata.data.user.id,
            created_at: new Date().toISOString(),
        });

        if (error) {
            console.log(error);
        } else {
            // Clear the input field after the message is sent
            setNewMessage('');
        }
    };

    return (
        <Box>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Message</Th>
                        <Th>Sender ID</Th>
                        <Th>Created At</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {messages.map(message => (
                        <Tr key={message.id}>
                            <Td>{message.message}</Td>
                            <Td>{message.sender_id}</Td>
                            <Td>{new Date(message.created_at).toLocaleString()}</Td>
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