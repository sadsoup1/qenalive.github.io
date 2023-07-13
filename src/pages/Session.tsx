import { Box } from "@chakra-ui/react";
import CommunityChat from "../components/CommunityChat";
import Canvas from "../components/Beta/Canvas";

export default function Session() {
    return (
        <Box>
            <Canvas />
            <CommunityChat />
        </Box>
    );
};