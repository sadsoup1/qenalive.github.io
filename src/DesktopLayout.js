import { Flex } from "@chakra-ui/react";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import './sidebar-split-pane.css'
import Main from "./Main";
import Sidebar from "./Sidebar";

// Desktop is different than Mobile in that the Pane component needs to be listed above the Main component
//  in order to have the sidebar be on the left side of the screen.
function DesktopLayout({ handleMouseEnter, handleMouseLeave, isCollapsed, onCollapseButtonClick, sizes, isHoveringCollapse, isHoveringExpand, onExpandButtonClick, setSizes }) {
    return (
        // This flex needs to be 100% of the parent flex inside App.js
        <Flex
            h="100%"
            w="100%"
        >
            {/* 
                Implements the split pane library I found on npm.
                I have it setup to have one pane and the other pane is the rest of the screen.
                What is inside the pane is the sidebar component that can expand/collapse/be resized.
                The rest of the page is responsive to the sidebar.
            */}
            <SplitPane
                split="vertical"    // Orienation of the split
                sizes={sizes}       // The initial sizes of each pane
                onChange={setSizes} // Function to call when the size changes?
                resizerSize={4}     // Width of the resizer border when you hover/click. Arbitrary number that looks good
                allowResize={!isCollapsed} // Use the isCollapsed state variable to control the allowResize prop

            >
                {/* 
                    This is the pane that is resizable and holds the sidebar
                */}
                <Pane                 // Left pane for the sidebar. These numbers were arbitrary and can be changed
                    minSize={100}     // Minimum size of the pane in px
                    maxSize='50%'     // Maximum size of the pane in %
                >
                    <Sidebar    // Pass along the functions and props from App.js to this component
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
                {/* 
                    The rest of the stuff is all responsive to the size of the pane
                */}
                <Main />

            </SplitPane>
        </Flex>
    )
}

export default DesktopLayout;
