import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { Container, Content } from "./styledcomponent/layout";

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
