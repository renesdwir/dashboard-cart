import React from "react";
import { Title } from "@/src/components/styledcomponent/global";
import Table from "@/src/components/table";
import Pagination from "@/src/components/pagination";

export default function Carts() {
  return (
    <>
      <Title>Carts</Title>
      <Table />
      <Pagination />
    </>
  );
}
