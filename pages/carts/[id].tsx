import { Title } from "@/src/components/styledcomponent/global";
import Table from "@/src/components/table";
import { BackIcon } from "@/src/icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { fetchCartDetail, fetchUser } from "../api/products";
import { CartDetail, UserInterface } from "../../interface/cartInterface";

const BackWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 15px;
  &:hover {
    color: #6913d8;
  }
`;
const WrapperInfo = styled.section`
  border-radius: 8px;
  padding: 2px;
  margin: 20px auto;
  background: #e4e4e7;
  border: #d4d4d8;
  box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15), -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
  label {
    display: flex;
    align-items: center;
    padding: 10px;
    font-weight: 500;
    cursor: pointer;
    &:before {
      content: "+";
      transition: transform 0.2s;
      font-weight: 600;
      margin-right: 20px;
    }
  }
  input[type="checkbox"] {
    display: none;
    &:checked + label + #content {
      max-height: 400px;
      padding: 10px 10px 20px;
    }
    &:checked + label {
      &:before {
        content: "-";
        transition: transform 0.2s;
        font-weight: 600;
        margin-right: 20px;
      }
    }
  }
  #content {
    color: #555;
    padding: 0 10px;
    line-height: 26px;
    max-height: 0;
    overflow-x: auto;
    width: 100%;
    transition: max-height 0.3s, padding 0.3s;
  }
`;
const InnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const WrapperContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 50%;
  padding-left: 10px;
  background: ;
  p {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 12px;
  }
  h5 {
    margin: -10px 0 0 0;
    font-size: 18px;
  }
`;
const TitleCustom = styled(Title)`
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 30px;
`;
function CartById() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { isLoading, error, data } = useQuery<CartDetail>({
    queryKey: ["carts", id],
    queryFn: () => fetchCartDetail(id),
    enabled: !!id,
  });
  const {
    isLoading: isLoadingUser,
    error: isErrorUser,
    data: dataUser,
  } = useQuery<UserInterface>({
    queryKey: ["user", data?.userId],
    queryFn: () => fetchUser(data?.userId),
    enabled: !!data?.userId,
  });
  const TableHead = ["Product Name", "Price", "Qty", "Amount", "Disc %", "Disc Amount"];

  if (error || isErrorUser) return "An error has occurred: " + error;
  return (
    <>
      <BackWrapper onClick={() => router.push(`/carts`)}>
        <BackIcon />
        Back
      </BackWrapper>
      <Title>Cart Details</Title>
      {isLoading || isLoadingUser ? (
        <div>Loading...</div>
      ) : (
        <>
          <WrapperInfo>
            <input type="checkbox" id="toggle" defaultChecked />
            <label htmlFor="toggle">Detail Info</label>
            <InnerWrapper id="content">
              <WrapperContentInfo>
                <p>Email</p>
                <h5>{dataUser?.email}</h5>
              </WrapperContentInfo>
              <WrapperContentInfo>
                <p>Username</p>
                <h5>{dataUser?.username}</h5>
              </WrapperContentInfo>
              <WrapperContentInfo>
                <p># Of Items</p>
                <h5>{data?.totalQuantity}</h5>
              </WrapperContentInfo>
              <WrapperContentInfo>
                <p>Total Amount</p>
                <h5>${data?.total}</h5>
              </WrapperContentInfo>
            </InnerWrapper>
          </WrapperInfo>
          <TitleCustom>Product List</TitleCustom>
          <Table datas={data?.products} TableHead={TableHead} />
        </>
      )}
    </>
  );
}

export default CartById;
