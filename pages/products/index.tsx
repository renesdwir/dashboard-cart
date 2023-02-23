import Pagination from "@/src/components/pagination";
import TableComponent from "@/src/components/table";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Title } from "@/src/components/styledcomponent/global";
import SearchPanel from "@/src/components/searchPanel";

const Table = styled(TableComponent)`
  background: red;
  td:first-child,
  th:first-child {
    width: 50%;
    background: red;
  }
`;
const StyledInput = styled.input`
  width: 30%;
  margin-bottom: 10px;
  font-size: 16px;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #d4d4d8;
  &:focus {
    outline: #a1a1aa;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export default function Products() {
  const { isLoading, error, data } = useQuery<any>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://dummyjson.com/products?skip=0&limit=100");
      return await response.json();
    },
  });
  console.log(data);
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;
  return (
    <>
      <Title>Products</Title>
      <SearchPanel />
      <StyledInput placeholder="Search Product" />
      <Table />
      <Pagination />
    </>
  );
}
