import { Cart, ProductCartDetail } from "@/pages/carts/cartInterface";
import router from "next/router";
import React from "react";
import styled from "styled-components";
import { Product } from "../../pages/products/productInterface";
import { ViewIcon } from "../icons";

const Container = styled.section`
  overflow-x: auto;
  background: red;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const Table = styled.table`
  border-collapse: collapse;
  box-shadow: 0 5px 10px #e1e5ee;
  background-color: white;
  text-align: left;
  overflow: auto;
  width: 100%;
  border-radius: 5px;
  thead {
    box-shadow: 0 5px 10px #e1e5ee;
    background: linear-gradient(135deg, hsla(197, 100%, 63%, 1) 0%, hsla(294, 100%, 55%, 1) 100%);
  }
  tbody {
    tr {
      &:hover {
        background: #6913d8;
        color: white;
        cursor: pointer;
      }
    }
  }
  th {
    padding: 1rem 2rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-size: 1rem;
    font-weight: 900;
  }

  td {
    padding: 0.5rem 2rem;
  }
  tr:nth-child(even) {
    background-color: #f4f6fb;
  }
`;
const BtnView = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  padding: 3px 6px;
  border-radius: 5px;
  border: none;
  outline: none;
  background: #48c4ff;
  color: white;
  &:hover {
    background: #6f9aff;
  }
`;
const RefactorViewIcon = styled(ViewIcon)`
  text-align: center;
`;
const TableData = styled.td`
  text-align: ${(props) => props.align};
`;

function TableComponent({
  datas,
  TableHead,
}: {
  datas: Product[] | Cart[] | ProductCartDetail[] | undefined;
  TableHead: string[];
}) {
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            {TableHead?.map((head) => {
              return <th key={head}>{head}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {datas &&
            datas.map((data) => {
              if ("brand" in data) {
                // data is a Product
                return (
                  <tr key={data.id}>
                    <td>{data.title}</td>
                    <td>{data.brand}</td>
                    <td>${data.price}</td>
                    <td>{data.stock}</td>
                    <td>{data.category}</td>
                  </tr>
                );
              } else if ("discountPercentage" in data) {
                // data is a Cart
                return (
                  <tr key={data.id}>
                    <TableData align="left">{data.title}</TableData>
                    <TableData align="left">{data.price}</TableData>
                    <TableData align="left">{data.quantity}</TableData>
                    <TableData align="left">{data.total}</TableData>
                    <TableData align="left">{data.discountPercentage}%</TableData>
                    <TableData align="left">${data.discountedPrice}</TableData>
                  </tr>
                );
              } else {
                // data is a Cart
                return (
                  <tr key={data.id}>
                    <TableData align="left">{data.userId}</TableData>
                    <TableData align="left">{data.totalProducts}</TableData>
                    <TableData align="left">{data.totalQuantity}</TableData>
                    <TableData align="left">${data.total}</TableData>
                    <TableData align="left">
                      <BtnView onClick={() => router.push(`/carts/${data.id}`)}>
                        <RefactorViewIcon />
                      </BtnView>
                    </TableData>
                  </tr>
                );
              }
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export default TableComponent;
