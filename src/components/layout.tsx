import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import styled from "styled-components";

const Container = styled.div`
  background: white;
`;
const Content = styled.div<{ isOpen: boolean }>`
  width: ${(props) =>
    props.isOpen ? "calc(100vw - 280px)" : "calc(100vw - 75px)"};
  transition: width 0.3s ease-in-out;
  background: white;
  margin-left: ${(props) => (props.isOpen ? "280px" : "75px")};
  float: right;
`;
const Layout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) setIsOpen(false);
    else setIsOpen(true);
    const handleResize = () => {
      if (window.innerWidth <= 768) setIsOpen(false);
      else setIsOpen(true);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <Content isOpen={isOpen}>{children}</Content>
    </Container>
  );
};

export default Layout;
