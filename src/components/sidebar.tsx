import { useState } from "react";
import styled from "styled-components";

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? "200px" : "50px")};
  background-color: #ccc;
  transition: width 0.3s ease-in-out;
`;

const SidebarButton = styled.button`
  display: block;
  width: 100%;
  height: 50px;
  border: none;
  background-color: #333;
  color: #fff;
  font-size: 1.2rem;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SidebarMenuItem = styled.li`
  padding: 10px;
  font-size: 1rem;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarButton onClick={toggleSidebar}>
        {isOpen ? "Close" : "Open"}
      </SidebarButton>
      <SidebarMenu>
        <SidebarMenuItem>Menu 1</SidebarMenuItem>
        <SidebarMenuItem>Menu 2</SidebarMenuItem>
        <SidebarMenuItem>Menu 3</SidebarMenuItem>
        <SidebarMenuItem>Menu 4</SidebarMenuItem>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
