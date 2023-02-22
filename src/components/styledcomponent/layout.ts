import styled from "styled-components";

export const Container = styled.div`
  background: white;
`;
export const Content = styled.div<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? "calc(100vw - 280px)" : "calc(100vw - 75px)")};
  transition: width 0.3s ease-in-out;
  background: white;
  margin-left: ${(props) => (props.isOpen ? "280px" : "75px")};
  float: right;
  padding: 20px;
`;
