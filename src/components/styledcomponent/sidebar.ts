import styled from "styled-components";
import Link from "next/link";

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${(props) => (props.isOpen ? "280px" : "75px")};
  background-color: #f1f1f1;
  transition: width 0.3s ease-in-out;
`;

export const SidebarButton = styled.button`
  display: block;
  width: 100%;
  height: 50px;
  border: none;
  background-color: #333;
  color: #fff;
  font-size: 1.2rem;
  margin: 0;
  cursor: pointer;
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const SidebarMenuItem = styled(Link)<{ isOpen: boolean }>`
  padding: 18px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  margin: 0;
  justify-content: ${(props) => (props.isOpen ? "start" : "center")};
  &:hover {
    background: #6913d8;
    transition: 0.1s linear;
    color: white;
  }
  &.active {
    background: #6913d8;
    color: white;
  }
`;
export const Text = styled.p<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "inline-block" : "none")};
  margin-left: 8px;
  font-size: 20px;
  transition-delay: 2s;
`;
