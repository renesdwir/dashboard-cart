import { ReactNode } from "react";
import Sidebar from "./sidebar";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  display: flex;
`;
const Content = styled.div`
  background: red;
  flex-grow: 1;
  padding: 10px;
`;
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Sidebar />
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
