import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Icon,
    Select
} from '@chakra-ui/react';
import { VscSearch } from 'react-icons/vsc';
import { useState, useEffect } from 'react';


function FindRoomModal({ isCollapsed }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    // This gets the latest rooms from local storage and sets the rooms state variable to it
    const [rooms, setRooms] = useState([]);

    // A list of rooms for selection in the drop down
    const roomOptions = rooms.map((room) => (
        <option key={room.roomCode} value={room.roomCode}>
            {room.roomName}
        </option>
    ));

    // Whenever the modal opens, get the latest rooms from local storage
    useEffect(() => {
        const data = window.localStorage.getItem('ROOMS_LIST');
        if (data !== null) setRooms(JSON.parse(data));
      }, [isOpen]);

    return (
        <>
            <Button onClick={onOpen}>
                <   Icon as={VscSearch} fontSize='2xl' ml={!isCollapsed ? 5 : 0} />
                {!isCollapsed ? "Find room" : undefined}
            </Button>

            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='scale'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Find a Room</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Select placeholder='Select a room'>{roomOptions}</Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default FindRoomModal;