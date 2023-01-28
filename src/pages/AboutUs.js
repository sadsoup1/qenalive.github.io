import { Box, Flex, useColorMode } from "@chakra-ui/react";

import Hero from "./components/AboutUs/Hero";
import StaffProfiles from "./components/AboutUs/StaffProfiles";
import NavBar from "./components/AboutUs/NavBar";

function BetaPage() {
  const { colorMode } = useColorMode();

  return (
    <Box w="100%" h="100%" bg={colorMode === "dark" ? "grey.100" : "white"}>
      <Flex justifyContent="center" alignItems="center">
        <Box maxWidth={1444}>
          <NavBar />
          <Hero />
          <StaffProfiles />
        </Box>
      </Flex>
    </Box>
  );
}
export default BetaPage;
