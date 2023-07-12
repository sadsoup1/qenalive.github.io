import React from 'react';
import { Avatar, Box, Flex, Icon, Image, Stack } from "@chakra-ui/react";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import './sidebar-split-pane.css'
import { VscArrowLeft, VscArrowRight, VscSearch, VscAdd, VscTriangleUp} from 'react-icons/vsc';
import { useState, useEffect } from 'react'
import { useMediaQuery } from "@chakra-ui/react";


function InPane({ isMobile, handleMouseEnter, handleMouseLeave, isCollapsed, onCollapseButtonClick, sizes, isHoveringCollapse, isHoveringExpand, onExpandButtonClick }) {
  return (
    <Flex // Sidebar
      h="100%"
      w="100%"
      bg="gray.50"
      border='1px'
      borderColor='gray.300'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      display='flex'
    >
      {isMobile ? null : (
        <>
          <Flex // Arrow
            disabled={isCollapsed}
            as="button"
            onClick={onCollapseButtonClick}
            _hover={{ bg: 'gray.100' }}
            _active={{ boxShadow: 'outline' }}
            w='35px'
            h='30px'
            bg="white"
            border='1px'
            borderColor='gray.300'
            boxShadow='inner'
            pos={'absolute'}
            top={'85px'}
            left={sizes[0] - 55}
            borderRadius='xl'
            justifyContent='left'
            alignItems='center'
            display={isHoveringCollapse ? 'flex' : 'none'}
            marginLeft='30px'
          >
            <Icon ml='1.5' as={VscArrowLeft} color="gray.500" />
          </Flex>
          <Flex // Arrow
            disabled={!isCollapsed}
            as="button"
            onClick={onExpandButtonClick}
            _hover={{ bg: 'gray.100' }}
            _active={{ boxShadow: 'outline' }}
            w='35px'
            h='30px'
            bg="white"
            border='1px'
            borderColor='gray.300'
            boxShadow='inner'
            pos={'absolute'}
            top={'85px'}
            left={sizes[0] - 55}
            borderRadius='xl'
            justifyContent='left'
            alignItems='center'
            display={isHoveringExpand ? 'flex' : 'none'}
            marginLeft='30px'
          >
            <Icon ml='1.5' as={VscArrowRight} color="gray.500" />
          </Flex>
        </>

      )}
      

      <Stack
        w='100%'
        h='100%'
        direction={isMobile ? 'row' : 'column'}
      >
      <Flex 
        w={isMobile ? '20%': '100%'} 
        h={isMobile ? '100%': '10%'} 
        bg='red.400' 
        justifyContent="center" 
        alignItems="center"
      >
        <Image src="/qena192.png" maxWidth="100%" maxHeight="100%"/>
      </Flex>
      <Box w={isMobile ? '60%': '100%'} h={isMobile ? '100%': '20%'} bg='green.400'>
        <Stack 
          w='100%' 
          h='100%' 
          direction={isMobile ? 'row' : 'column'} 
          justifyContent="center" 
          alignItems={isCollapsed ? "center" : "left" }
          spacing="40%"
        >
          <Flex >
            <Icon as={VscAdd} fontSize='2xl' ml={!isCollapsed ? 5 : 0}/>
            {!isCollapsed ? "Create room" : undefined}
          </Flex>
          <Flex >
            <Icon as={VscSearch} fontSize='2xl' ml={!isCollapsed ? 5 : 0}/>
            {!isCollapsed ? "Find room" : undefined}
          </Flex>
        </Stack>
      </Box>
      {isMobile ? undefined : <Box w={isMobile ? '100%': '100%'} h={isMobile ? '100%': '60%'} bg='blue.400'>

      </Box>}
      <Flex
        w={isMobile ? '20%': '100%'} 
        h={isMobile ? '100%': '10%'} 
        bg='purple.400' 
        justifyContent="center" 
        alignItems="center" 
      >
        <Avatar maxWidth="100%" maxHeight="100%" borderRadius="full"/>
      </Flex>
        
      </Stack>
    </Flex>
  )
}

function OutsidePane() {
  return (
    <Flex
      h="100%"
      w="100%"
      bg="white"
      boxShadow='inner'
    >

    </Flex>
  )
}

function Desktop({ handleMouseEnter, handleMouseLeave, isCollapsed, onCollapseButtonClick, sizes, isHoveringCollapse, isHoveringExpand, onExpandButtonClick, setSizes }) {
  return (
    <Flex
      h="100%"
      w="100%"
    >
      <SplitPane
        split="vertical"    // Orienation of the split
        sizes={sizes}       // The initial sizes of each pane
        onChange={setSizes} // Function to call when the size changes?
        resizerSize={4}     // Width of the resizer border when you hover/click
        allowResize={!isCollapsed} // Use the isCollapsed state variable to control the allowResize prop

      >
        <Pane               // Left pane for the sidebar
          minSize={100}     // Minimum size of the pane in px
          maxSize='50%'     // Maximum size of the pane in %

        >
          <InPane
            isMobile={false}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            isCollapsed={isCollapsed}
            onCollapseButtonClick={onCollapseButtonClick}
            sizes={sizes}
            isHoveringCollapse={isHoveringCollapse}
            isHoveringExpand={isHoveringExpand}
            onExpandButtonClick={onExpandButtonClick}
          />

        </Pane>
        <OutsidePane />

      </SplitPane>
    </Flex>
  )
}

function Mobile({ handleMouseEnter, handleMouseLeave, isCollapsed, onCollapseButtonClick, sizes, isHoveringCollapse, isHoveringExpand, onExpandButtonClick, setSizes }) {
  return (
    <Flex
      h="100%"
      w="100%"
    >
      <SplitPane
        split="horizontal"    // Orienation of the split
        sizes={sizes}       // The initial sizes of each pane
        onChange={setSizes} // Function to call when the size changes?
        resizerSize={4}     // Width of the resizer border when you hover/click
        allowResize={!isCollapsed} // Use the isCollapsed state variable to control the allowResize prop

      >
        <OutsidePane />

        <Pane               // Left pane for the sidebar
          minSize={100}     // Minimum size of the pane in px
          maxSize='50%'     // Maximum size of the pane in %

        >
          <InPane
            isMobile={true}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            isCollapsed={isCollapsed}
            onCollapseButtonClick={onCollapseButtonClick}
            sizes={sizes}
            isHoveringCollapse={isHoveringCollapse}
            isHoveringExpand={isHoveringExpand}
            onExpandButtonClick={onExpandButtonClick}
          />

        </Pane>

      </SplitPane>
    </Flex>
  )
}


function App() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const [sizes, setSizes] = useState([150]); // Array of default sizes for the panes. Only 1 pane

  // Handles showing/hiding the button to collapse sidebar if hovering over sidebar
  const [isHoveringCollapse, setIsHoveringCollapse] = useState(false);
  const [isHoveringExpand, setIsHoveringExpand] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);

  // Set defaults of each display mode of the sidenav when sizes change
  useEffect(() => {
    if (isMobile) {
      // console.log('isMobile', isMobile)
      setSizes(['90%'])
      setIsCollapsed(true)
      setIsHoveringCollapse(false)
      setIsHoveringExpand(false)
    } else {
      // console.log('isDesktop', !isMobile)
      setSizes([150])
      setIsCollapsed(false)
      setIsHoveringCollapse(false)
      setIsHoveringExpand(false)
    }
  }, [isMobile]);

  function handleMouseEnter() {
    if (!isCollapsed) {
      setIsHoveringCollapse(true);
      setIsHoveringExpand(false);
    } else {
      setIsHoveringExpand(true);
      setIsHoveringCollapse(false);
    }
  }

  function handleMouseLeave() {
    if (!isCollapsed) {
      setIsHoveringCollapse(false);
      setIsHoveringExpand(false);
    } else {
      setIsHoveringExpand(false);
      setIsHoveringCollapse(false);
    }
  }

  function onCollapseButtonClick() {
    setIsCollapsed(true);
    setSizes([100]);
    setIsHoveringCollapse(false);
    setIsHoveringExpand(true);
  }

  function onExpandButtonClick() {
    setIsCollapsed(false);
    setSizes([150]);
    setIsHoveringCollapse(true);
    setIsHoveringExpand(false);
  }

  return (
    <Flex
      h="100vh"
      w="100vw"
    >
      {isMobile ? (
        <Mobile
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          isCollapsed={isCollapsed}
          onCollapseButtonClick={onCollapseButtonClick}
          sizes={sizes}
          isHoveringCollapse={isHoveringCollapse}
          isHoveringExpand={isHoveringExpand}
          onExpandButtonClick={onExpandButtonClick}
          setSizes={setSizes}
        />
      ) : (
        <Desktop
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          isCollapsed={isCollapsed}
          onCollapseButtonClick={onCollapseButtonClick}
          sizes={sizes}
          isHoveringCollapse={isHoveringCollapse}
          isHoveringExpand={isHoveringExpand}
          onExpandButtonClick={onExpandButtonClick}
          setSizes={setSizes}
        />
      )
      }

    </Flex>

  );

}

export default App;
