import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { SidebarProps } from "../lib/interface";
import { DashboardIcon, LeftIcon, ProductsIcon, RightIcon, ShoppingCartIcon } from "../icons";
import { SidebarButton, SidebarContainer, SidebarMenu, SidebarMenuItem, Text } from "./styledcomponent/sidebar";

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarButton onClick={toggleSidebar}>{isOpen ? <LeftIcon /> : <RightIcon />}</SidebarButton>
      <SidebarMenu>
        <SidebarMenuItem href="/" isOpen={isOpen}>
          <DashboardIcon />
          <Text isOpen={isOpen}>Dashboard</Text>
        </SidebarMenuItem>
        <SidebarMenuItem href="/products" isOpen={isOpen}>
          <ProductsIcon />
          <Text isOpen={isOpen}>Products</Text>
        </SidebarMenuItem>
        <SidebarMenuItem href="/carts" isOpen={isOpen}>
          <ShoppingCartIcon />
          <Text isOpen={isOpen}>Carts</Text>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
