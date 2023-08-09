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
            justifyContent="center"
            alignItems="center"
            spacing="40%"
            overflowY="scroll"
            paddingBlock={3}
        >
            {
                joinedRooms.map((room) => {
                    return (
                        <Button 
                            key={room.roomCode}
                            variant="outline" 
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