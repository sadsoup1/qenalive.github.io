import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import supabase from '../../supabase';

export default function AddQuestion() {
    const [courseID, setCourse] = useState('');
    const [questionBody, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast()

    async function handleAdd(e) {
        e.preventDefault();

        if (!courseID) {
            toast({
                title: 'Cannot add a question without a course name',
                position: 'top',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            });

            return;
        }

        setLoading(true);
        const {data, error} = await supabase.from('questions').insert([{question_type: questionBody}]);
        setLoading(false);
        setCourse('');
        setQuestion('')


        toast({
            title: error || 'Question added',
            position: 'top',
            status: error ? 'error' : 'success',
            duration: 2000,
            isClosable: true,
        });
    }

    return (
        <form onSubmit={handleAdd}>
            <HStack my="4" h="45">
            <Input 
                    h="100%"
                    variant="filled" 
                    placeholder="CourseName-123" 
                    disabled={loading}
                    value={courseID}
                    onChange={e => setCourse(e.target.value)}
                />
                <Input 
                    h="100%"
                    variant="filled" 
                    placeholder="What is the meaning of life?" 
                    disabled={loading}
                    value={questionBody}
                    onChange={e => setQuestion(e.target.value)}
                />
                
                <Button 
                    colorScheme="blue" 
                    px="10" 
                    h="100%" 
                    type="submit"
                    isLoading={loading}
                    loadingText="Adding"
                >
                    Add
                </Button>
            </HStack>
        </form>
    );
}