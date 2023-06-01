import { useState, useEffect } from "react";
import {
    Box,
    Center,
    Heading,
    SimpleGrid,
    Flex,
    useColorModeValue,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import CardClass from "./components/ClassesPage/CardClass";
import supabase from '../supabase'

export default function Classes() {
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const textColor = useColorModeValue("gray.800", "gray.50");
    const [classes, setClasses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [courseNumber, setCourseNumber] = useState("");
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        const { data: classes, error } = await supabase
            .from("course")
            .select("course_number, course_name, creation_date, description");
        if (error) console.log("Error fetching classes:", error);
        else setClasses(classes);
    };

    const handleCreateCourse = async () => {
        // const { data, error } = await supabase
        const { error } = await supabase
            .from("course")
            .insert({ course_number: courseNumber, course_name: courseName, description: description });
        if (error) console.log("Error creating course:", error);
        else {
            await fetchClasses();
            setShowModal(false);
        }
    };

    return (
        <Box w="100vw" h="100vh" bg={bgColor} overflow={"scroll"}>
            <SimpleGrid columns={1} rows={2} spacing={10} spacingY={5} mt="5">
                <Center>
                    <Box w="95%" p="3">
                        <Flex justify="space-between" align="center">
                            <Heading p="6" color={textColor}>
                                Classes
                            </Heading>
                            <Button onClick={() => setShowModal(true)}>Create Class</Button>
                        </Flex>
                        <Flex flexWrap="wrap">
                            {classes.map((classInfo) => (
                                <CardClass
                                    key={classInfo.id}
                                    year={classInfo.creation_date}
                                    classNumber={classInfo.course_number}
                                    className={classInfo.course_name}
                                    classDescription={classInfo.description}
                                />
                            ))}
                        </Flex>
                    </Box>
                </Center>
            </SimpleGrid>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Class</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Course Number</FormLabel>
                            <Input
                                placeholder="Enter course number"
                                value={courseNumber}
                                onChange={(e) => setCourseNumber(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Course Name</FormLabel>
                            <Input
                                placeholder="Enter course name"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleCreateCourse}>
                            Create
                        </Button>
                        <Button onClick={() => setShowModal(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}