import { Flex } from "@chakra-ui/react";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import './sidebar-split-pane.css';
import Main from "./Main";
import Sidebar from "./Sidebar";

function MobileLayout({ handleMouseEnter, handleMouseLeave, isCollapsed, onCollapseButtonClick, sizes, isHoveringCollapse, isHoveringExpand, onExpandButtonClick, setSizes }) {
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
                <Main />

                <Pane               // Left pane for the sidebar
                    minSize={100}     // Minimum size of the pane in px
                    maxSize='50%'     // Maximum size of the pane in %

                >
                    <Sidebar
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

export default MobileLayout;
