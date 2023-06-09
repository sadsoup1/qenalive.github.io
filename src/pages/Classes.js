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
import { useLocation } from 'react-router-dom';

export default function Classes() {

    // use this function to change the title of the page
    useEffect(() => {
        document.title = 'Classes';
    }, []);

    // use this function to change the favicon to the alert icon
    const useAlert = (() => {
        useEffect(() => {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
            }
            link.href = 'qena_32_dark_alert.png';
        }, []);
    })

    // call the useAlert function to set the favicon
    useAlert();

    // use this function to get the session information
    const location = useLocation();
    const session = location.state?.session;

    // set up state variables for the name modal and user name input fields
    const [showNameModal, setShowNameModal] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // check if the user has entered their name in the user_profile table
    async function check_if_fully_in() {
        const { data: userProfileData, error: userProfileError } = await supabase
            .from('user_profile')
            .select('auth_id')
            .eq('email', session.user.email)

        if (userProfileError) {
            console.log(userProfileError)
            return
        }

        if (userProfileData[0].auth_id == null) {
            setShowNameModal(true);
        }
    }

    // call the check_if_fully_in function to check if the user has entered their name
    check_if_fully_in();

    // set up state variables for the classes and create class modal
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const textColor = useColorModeValue("gray.800", "gray.50");
    const [classes, setClasses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [courseNumber, setCourseNumber] = useState("");
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");

    // fetch the classes from the course table when the component mounts
    useEffect(() => {
        fetchClasses();
    }, []);

    // fetch the classes from the course table
    const fetchClasses = async () => {
        const { data: classes, error } = await supabase
            .from("course")
            .select("course_number, course_name, creation_date, description");
        if (error) console.log("Error fetching classes:", error);
        else setClasses(classes);
    };

    // create a new class in the course table
    const handleCreateCourse = async () => {
        const { error } = await supabase
            .from("course")
            .insert({ course_number: courseNumber, course_name: courseName, description: description });
        if (error) console.log("Error creating course:", error);
        else {
            await fetchClasses();
            setShowModal(false);
        }
    };

    // update the user's name in the user_profile table
    const handleNameSubmit = async () => {
        const userdata = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('user_profile')
            .update({
                first_name: firstName,
                last_name: lastName,
                auth_id: userdata.data.user.id
            })
            .eq('email', session.user.email);

        if (error) {
            console.log(error);
        } else {
            console.log(data);
            setShowNameModal(false);
        }
    };

    // render the component
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
            {showNameModal && (
                <Modal isOpen={showNameModal} onClose={() => setShowNameModal(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Enter Your Name</ModalHeader>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    placeholder="Enter your last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleNameSubmit}>
                                Submit
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
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