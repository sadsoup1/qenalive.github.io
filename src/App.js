import React from 'react';
import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from 'react'
import { useMediaQuery } from "@chakra-ui/react";
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';


function App() {
  // isMobile is true if the window width is beyond 768 pixels
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  // Sizes is the current size of the 1 pane we have, hence 1 value in the right array. setSeizes is the function to update the sizes
  const [sizes, setSizes] = useState([150]);

  // Handles showing/hiding the button to collapse sidebar if hovering over sidebar
  const [isHoveringCollapse, setIsHoveringCollapse] = useState(false);
  const [isHoveringExpand, setIsHoveringExpand] = useState(false);

  // Separate state variable to control the collapsed state of the sidebar
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Set defaults of each display mode of the sidenav when sizes change
  useEffect(() => {
    if (isMobile) {
      setSizes(['90%'])             // Set the height of the sidebar to 10% of the screen height. 90 is the height of the main pane
      setIsCollapsed(true)          // Collapse the sidebar to prevent it from being able to be resized
      setIsHoveringCollapse(false)  // Hide the button since mobile should not have options to change size
      setIsHoveringExpand(false)    // Hide the button since mobile should not have options to change size
    } else {
      setSizes([150])               // Default the sidebar size to 150 pixels
      setIsCollapsed(false)         // By default when switching the sidebar is able to be moved
      setIsHoveringCollapse(false)  // Hide the button to collapse the sidebar expanded
      setIsHoveringExpand(false)    // Hide this button because the sidebar since the mouse is probably not hovering over the sidebar
    }
  }, [isMobile]);

  // Show/Hide the collapse/expand button when hovering over the sidebar
  function handleMouseEnter() {
    if (!isCollapsed) {
      // If the sidebar is expanded, show the button to collapse and hide the one to expand
      setIsHoveringCollapse(true);
      setIsHoveringExpand(false);
    } else {
      // If the sidebar is collapsed, show the button to expand and hide the one to collapse
      setIsHoveringExpand(true);
      setIsHoveringCollapse(false);
    }
  }

  // Hide all buttons when leaving the hover
  function handleMouseLeave() {
    setIsHoveringCollapse(false);
    setIsHoveringExpand(false);
  }

  // After clicking to collapse the sidebar, 
  function onCollapseButtonClick() {
    setIsCollapsed(true);         // Set the sidebar to collapsed
    setSizes([100]);              // Set the size of the sidebar to 100 pixels, the default arbitrary size
    setIsHoveringCollapse(false); // Hide the button to collapse since it was collapsed
    setIsHoveringExpand(false);   // Hide the button to expand since the mouse wouldnt be near it on a click of collapse
  }

  // After clicking to expand the sidebar,
  function onExpandButtonClick() {
    setIsCollapsed(false);        // Set the sidebar to expanded
    setSizes([150]);              // Default the sidebar to the opened size
    setIsHoveringCollapse(true);  // Show the button to collapse since the mouse would be hovering in the area
    setIsHoveringExpand(false);   // Hide the button to expand since it was expanded
  }

  return (
    // Everything fits inside this flex container that is the entire screen
    <Flex
      h="100vh"
      w="100vw"
    >
      {/* 
        Depending on the isMobile flag, the layout is either desktop or mobile orientated.
        They implement the same functions so you only need to edit things once.
      */}
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
