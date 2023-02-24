import React from "react";
import styled from "styled-components";

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
function TableComponent() {
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>iPhone 14 Pro Max</td>
            <td>Apple</td>
            <td>1000</td>
            <td>100</td>
            <td>Smartphone</td>
          </tr>
          <tr>
            <td>iPhone 14 Pro Max</td>
            <td>Apple</td>
            <td>1000</td>
            <td>100</td>
            <td>Smartphone</td>
          </tr>
          <tr>
            <td>iPhone 14 Pro Max</td>
            <td>Apple</td>
            <td>1000</td>
            <td>100</td>
            <td>Smartphone</td>
          </tr>
          <tr>
            <td>iPhone 14 Pro Max</td>
            <td>Apple</td>
            <td>1000</td>
            <td>100</td>
            <td>Smartphone</td>
          </tr>
          <tr>
            <td>iPhone 14 Pro Max</td>
            <td>Apple</td>
            <td>1000</td>
            <td>100</td>
            <td>Smartphone</td>
          </tr>
          <tr>
            <td>iPhone 14 Pro Max</td>
            <td>Apple</td>
            <td>1000</td>
            <td>100</td>
            <td>Smartphone</td>
          </tr>
          <tr>
            <td>iPhone 14 Pro Max</td>
            <td>Apple</td>
            <td>1000</td>
            <td>100</td>
            <td>Smartphone</td>
          </tr>
          <tr>
            <td>iPhone 14 Pro Max</td>
            <td>Apple</td>
            <td>1000</td>
            <td>100</td>
            <td>Smartphone</td>
          </tr>
          <tr>
            <td>iPhone 14 Pro Max</td>
            <td>Apple</td>
            <td>1000</td>
            <td>100</td>
            <td>Smartphone</td>
          </tr>
          <tr>
            <td>iPhone 14 Pro Max</td>
            <td>Apple</td>
            <td>1000</td>
            <td>100</td>
            <td>Smartphone</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default TableComponent;
