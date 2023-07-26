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


function FindRoomModal({ isCollapsed, setJoinedRooms }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    // This gets the latest rooms from local storage and sets the rooms state variable to it
    const [rooms, setRooms] = useState([]);

    // This is the room that is selected in the drop down
    const [selectedRoom, setSelectedRoom] = useState("");

    // This updates the selectedRoom variable whenever the user selects a room in the drop down
    const handleRoomSelect = (event) => {
        setSelectedRoom(event.target.value);
    };

    // A list of rooms for selection in the drop down. Disabled rooms that are already joined
    const roomOptions = rooms.map((room) => {
        const joinedRooms = window.localStorage.getItem('JOINED_ROOMS_LIST') || [];
        const isJoined = joinedRooms.includes(room.roomCode);
        return (
            <option 
                key={room.roomCode} 
                value={room.roomCode} 
                disabled={isJoined}
            >
                {room.roomName}
            </option>
        );
      });

    // Whenever the modal opens, get the latest rooms from local storage
    useEffect(() => {
        const data = window.localStorage.getItem('ROOMS_LIST');
        if (data !== null) setRooms(JSON.parse(data));
    }, [isOpen]);

    // Function to actually join the room when user clicks join with a selection
    function joinRoom() {
        const roomList = JSON.parse(window.localStorage.getItem('ROOMS_LIST')) || [];
        const joinedRooms = JSON.parse(window.localStorage.getItem('JOINED_ROOMS_LIST')) || [];
        let joinedRoom = roomList.find(room => room.roomCode === selectedRoom);

        // If the user has no stored rooms, create the list with the joined room
        if (joinedRooms.length === 0) {
            localStorage.setItem('JOINED_ROOMS_LIST', JSON.stringify([joinedRoom]));
        } else {
            // Otherwise, add the joined room to the list, if they aren't already in the room
            if (!joinedRooms.find(room => room.roomCode === joinedRoom.roomCode)) {
                joinedRooms.push(joinedRoom);
                localStorage.setItem('JOINED_ROOMS_LIST', JSON.stringify(joinedRooms));
            }
        }

        setJoinedRooms(joinedRooms); // Send out the room list to Sidebar.js
        setSelectedRoom("");
        onClose();
    }

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
                        <Select
                            placeholder='Select a room'
                            onChange={handleRoomSelect}
                        >
                            {roomOptions}
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='gray'
                            mr={3}
                            onClick={joinRoom}
                            isDisabled={!selectedRoom}
                        >
                            Join
                        </Button>
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