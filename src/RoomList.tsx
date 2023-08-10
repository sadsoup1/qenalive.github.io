import { Button, Stack } from "@chakra-ui/react";

type Room = {
    roomCode: string,
    roomName: string,
}

type Props = {
    joinedRooms: Array<Room>,
}

// The component lists all of the users current rooms. The passed parameter is the list of rooms joined
// It gets updated by the room finder modal
function RoomList({joinedRooms}: Props) {

    return (
        <Stack
            w='100%'
            h='100%'
            direction='column'
            spacing="12px"

            //TODO(Alex) adds unwanted padding to the right uncomment after fix
            // overflowY="scroll"
            padding='16px'
        >
            {
                joinedRooms.map((room) => {
                    return (
                        <Button justifyContent="left"
                            key={room.roomCode}
                            size="lg"
                        >
                            {room.roomName}
                        </Button>
                    );
                })
            }
        </Stack>

    );
}

export default RoomList;