import {
  Heading,
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Text,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import React from "react";

const Hero = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      padding="50"
      gap={15}
      justifyContent="space-between"
      alignItems="center"
      flexWrap={"wrap"}
    >
      <Box>
        <Heading
          fontWeight="extrabold"
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          bg={colorMode === "dark" ? "white" : "gray.700"}
          bgClip="text"
        >
          IMPROVE CLASSROOM ENGAGEMENT WITH
        </Heading>

        <Heading
          fontWeight="extrabold"
          bgGradient="linear(to-l, #3FEDFD, #383A95, #F73A94)"
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          bgClip="text"
        >
          QenA
        </Heading>
        {/* <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
          <a href="#about"> Learn more</a>
        </Button> */}
        <br />
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci
          phasellus egestas tellus rutrum tellus pellentesque eu. Euismod in
          pellentesque massa placerat duis ultricies. Egestas purus viverra
          accumsan in nisl nisi scelerisque eu ultrices. Pulvinar pellentesque
          habitant morbi tristique. In tellus integer feugiat scelerisque varius
          morbi enim nunc. Nisi est sit amet facilisis magna. Tincidunt arcu non
          sodales neque sodales ut etiam sit. Diam donec adipiscing tristique
          risus nec. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien
          et ligula. Volutpat est velit egestas dui id ornare arcu. Risus sed
          vulputate odio ut. Dignissim diam quis enim lobortis scelerisque
          fermentum dui. Facilisi cras fermentum odio eu feugiat pretium.
          Integer enim neque volutpat ac. Adipiscing elit duis tristique
          sollicitudin nibh sit amet. Lobortis feugiat vivamus at augue. In
          mollis nunc sed id semper risus. Eleifend donec pretium vulputate
          sapien. Viverra orci sagittis eu volutpat odio facilisis mauris.
          Consectetur adipiscing elit pellentesque habitant morbi. Felis donec
          et odio pellentesque diam volutpat commodo. Vitae turpis massa sed
          elementum tempus. Et odio pellentesque diam volutpat commodo sed
          egestas. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet.
          Mi tempus imperdiet nulla malesuada pellentesque elit. Ipsum
          suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Urna
          duis convallis convallis tellus. Fringilla phasellus faucibus
          scelerisque eleifend donec pretium vulputate sapien nec. Viverra
          maecenas accumsan lacus vel facilisis volutpat est velit egestas.
          Venenatis tellus in metus vulputate eu scelerisque felis. Potenti
          nullam ac tortor vitae purus faucibus ornare suspendisse. Bibendum
          arcu vitae elementum curabitur vitae nunc sed velit. Sed viverra
          tellus in hac habitasse platea. Pellentesque sit amet porttitor eget
          dolor morbi. Lobortis elementum nibh tellus molestie nunc non.
          Habitant morbi tristique senectus et netus et malesuada fames ac. In
          dictum non consectetur a. Libero id faucibus nisl tincidunt eget. Nisl
          purus in mollis nunc sed id semper risus in. Morbi blandit cursus
          risus at. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum
          enim. Egestas congue quisque egestas diam in arcu. Massa placerat duis
          ultricies lacus sed turpis. Volutpat sed cras ornare arcu dui vivamus
          arcu. Ornare arcu dui vivamus arcu felis bibendum ut tristique et.
          Turpis tincidunt id aliquet risus feugiat. At consectetur lorem donec
          massa sapien. Nunc sed velit dignissim sodales ut eu sem integer
          vitae. Sit amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Tincidunt tortor aliquam nulla facilisi. In hac
          habitasse platea dictumst. Risus in hendrerit gravida rutrum quisque.
          Sed ullamcorper morbi tincidunt ornare massa eget egestas purus.
          Ullamcorper sit amet risus nullam. Mi proin sed libero enim sed
          faucibus turpis. Suspendisse ultrices gravida dictum fusce ut
          placerat. Metus aliquam eleifend mi in nulla. Amet consectetur
          adipiscing elit ut aliquam. Hendrerit gravida rutrum quisque non
          tellus. Pellentesque dignissim enim sit amet. Viverra nibh cras
          pulvinar mattis. Diam phasellus vestibulum lorem sed risus ultricies.
          Ut pharetra sit amet aliquam id diam maecenas. Turpis nunc eget lorem
          dolor sed viverra. Est ultricies integer quis auctor elit. Enim sit
          amet venenatis urna cursus. In nibh mauris cursus mattis molestie a.
          Euismod in pellentesque massa placerat duis ultricies lacus sed
          turpis. Mi sit amet mauris commodo. Nunc consequat interdum varius sit
          amet mattis vulputate enim. Quisque egestas diam in arcu cursus
          euismod quis.
        </Text>
      </Box>
    </Flex>
  );
};

export default Hero;
