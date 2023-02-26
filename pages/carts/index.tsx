import React, { useState, useEffect } from "react";
import { Title } from "@/src/components/styledcomponent/global";
import Table from "@/src/components/table";
import Pagination from "@/src/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "../api/products";
import { Cart, CartInterface } from "./cartInterface";
interface paginationInterface {
  limit: number;
  page: number;
  totalPage: number;
}

export default function Carts() {
  const [carts, setCarts] = useState<Cart[] | undefined>(undefined);
  const [resultData, setResultData] = useState<Cart[] | undefined>(undefined); //tampilin data
  const [pagination, setPagination] = useState<paginationInterface>({
    limit: 10,
    page: 1,
    totalPage: 1,
  });

  const {
    isLoading,
    error,
    data: fetchedCart,
  } = useQuery<CartInterface>({
    queryKey: ["carts"],
    queryFn: fetchCart,
    staleTime: 60000,
  });

  useEffect(() => {
    if (carts) {
      let dataLength = carts.length;

      setPagination((prev) => {
        return {
          ...prev,
          totalPage: Math.ceil(dataLength / prev.limit),
        };
      });
      const startIndex = (pagination.page - 1) * pagination.limit;
      setResultData(carts.slice(startIndex, startIndex + pagination.limit));
    }
  }, [carts, pagination.page]);

  if (!carts && fetchedCart?.carts) {
    setCarts(fetchedCart.carts);
  }

  const TableHead = ["User ID", "Total Products", "Total Quantity", "Total Price", "View"];
  if (error) return "An error has occurred: " + error;
  return (
    <>
      <Title>Carts</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Table datas={resultData} TableHead={TableHead} />
          <Pagination pagination={pagination} setPagination={setPagination} />
        </div>
      )}
    </>
  );
}
