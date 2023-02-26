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
interface paginationInterface {
  limit: number;
  page: number;
  totalPage: number;
}
interface paginationPropsInterface {
  pagination: paginationInterface;
  setPagination: React.Dispatch<React.SetStateAction<paginationInterface>>;
}
function Pagination({ pagination, setPagination }: paginationPropsInterface) {
  const handlePaginationPrev = () => {
    setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
  };
  const handlePaginationNext = () => {
    setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
  };
  return (
    <Container>
      <Button disabled={pagination.page === 1} onClick={handlePaginationPrev}>
        Prev
      </Button>
      <PaginationWrapper>
        {pagination.page}/{pagination.totalPage}
      </PaginationWrapper>
      <Button disabled={pagination.page === pagination.totalPage} onClick={handlePaginationNext}>
        Next
      </Button>
    </Container>
  );
}

export default Pagination;
