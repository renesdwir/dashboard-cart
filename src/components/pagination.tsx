import React from "react";
import styled from "styled-components";
const Container = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
`;
const PaginationWrapper = styled.div`
  margin: 0 1rem;
`;
function Pagination() {
  return (
    <Container>
      <Button>Prev</Button>
      <PaginationWrapper>1/10</PaginationWrapper>
      <Button>Next</Button>
    </Container>
  );
}

export default Pagination;
