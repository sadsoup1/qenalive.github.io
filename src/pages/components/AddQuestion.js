// import { Button, HStack, Input, useToast, useColorMode, Select } from '@chakra-ui/react';
// import { useState } from 'react';
// import supabase from '../../supabase';

// export default function AddQuestion() {
//     const [courseID, setCourse] = useState('');
//     const [questionBody, setQuestion] = useState('');
//     const [loading, setLoading] = useState(false);
//     const toast = useToast();
//     const { colorMode } = useColorMode();

//     async function handleAdd(e) {
//         e.preventDefault();

//         if (!courseID) {
//             toast({
//                 title: 'Cannot add a question without a course name',
//                 position: 'top',
//                 status: 'warning',
//                 duration: 2000,
//                 isClosable: true,
//             });

//             return;
//         }

//         setLoading(true);
//         const {data, error} = await supabase.from('questions').insert([{question_type: questionBody}]);
//         setLoading(false);
//         setCourse('');
//         setQuestion('')


//         toast({
//             title: error || 'Question added',
//             position: 'top',
//             status: error ? 'error' : 'success',
//             duration: 2000,
//             isClosable: true,
//         });
//     }

//     return (
//         <form onSubmit={handleAdd}>
//             <HStack my="4" h="45">
//                 <Select 
//                     size='md'
//                     variant="filled" 
//                     placeholder="Select course"
//                     disabled={loading}
//                     value={courseID}
//                     onChange={e => setCourse(e.target.value)}
//                     bg={colorMode === 'light' ? 'white' : 'gray.800'}
//                     color={colorMode === 'light' ? 'gray.800' : 'white'}
//                 >
//                     <option value="course1">Course 1</option>
//                     <option value="course2">Course 2</option>
//                     <option value="course3">Course 3</option>
//                 </Select>
//                 <Input 
//                     h="100%"
//                     variant="filled" 
//                     placeholder="What is the meaning of life?" 
//                     disabled={loading}
//                     value={questionBody}
//                     onChange={e => setQuestion(e.target.value)}
//                     bg={colorMode === 'light' ? 'white' : 'gray.800'}
//                     color={colorMode === 'light' ? 'gray.800' : 'white'}
//                 />

//                 <Button 
//                     colorScheme="blue" 
//                     px="10" 
//                     h="100%" 
//                     type="submit"
//                     isLoading={loading}
//                     loadingText="Adding"
//                     bg={colorMode === 'light' ? 'blue.500' : 'blue.300'}
//                     _hover={{ bg: colorMode === 'light' ? 'blue.600' : 'blue.400' }}
//                     color={colorMode === 'light' ? 'white' : 'gray.800'}
//                 >
//                     Add
//                 </Button>
//             </HStack>
//         </form>
//     );
// }

import { Button, HStack, Input, useToast, useColorMode, Select } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import supabase from '../../supabase';

export default function AddQuestion() {
    const [courses, setCourses] = useState([]);
    const [courseID, setCourse] = useState('');
    const [questionBody, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { colorMode } = useColorMode();

    useEffect(() => {
        async function fetchCourses() {
            const { data: courses, error } = await supabase.from('course').select('course_name');
            if (error) {
                console.error(error);
                return;
            }
            setCourses(courses);
        }
        fetchCourses();
    }, []);

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
        // const {data, error} = await supabase.from('questions').insert([{question_type: questionBody}]);
        const { error } = await supabase.from('questions').insert([{ question_type: questionBody }]);
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
                <Select
                    size='md'
                    variant="filled"
                    placeholder="Select course"
                    disabled={loading}
                    value={courseID}
                    onChange={e => setCourse(e.target.value)}
                    bg={colorMode === 'light' ? 'white' : 'gray.800'}
                    color={colorMode === 'light' ? 'gray.800' : 'white'}
                >
                    {courses.map(course => (
                        <option key={course.course_name} value={course.course_name}>{course.course_name}</option>
                    ))}
                </Select>
                <Input
                    h="100%"
                    variant="filled"
                    placeholder="What is the meaning of life?"
                    disabled={loading}
                    value={questionBody}
                    onChange={e => setQuestion(e.target.value)}
                    bg={colorMode === 'light' ? 'white' : 'gray.800'}
                    color={colorMode === 'light' ? 'gray.800' : 'white'}
                />

                <Button
                    colorScheme="blue"
                    px="10"
                    h="100%"
                    type="submit"
                    isLoading={loading}
                    loadingText="Adding"
                    bg={colorMode === 'light' ? 'blue.500' : 'blue.300'}
                    _hover={{ bg: colorMode === 'light' ? 'blue.600' : 'blue.400' }}
                    color={colorMode === 'light' ? 'white' : 'gray.800'}
                >
                    Add
                </Button>
            </HStack>
        </form>
    );
}