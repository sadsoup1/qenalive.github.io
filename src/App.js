import React from 'react';
import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from 'react'
import { useMediaQuery } from "@chakra-ui/react";
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';


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
        <MobileLayout
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
        <DesktopLayout
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
