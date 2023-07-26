import { Button, Stack } from "@chakra-ui/react";

// The component lists all of the users current rooms. The passed parameter is the list of rooms joined
// It gets updated by the room finder modal
function RoomList({joinedRooms}) {

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