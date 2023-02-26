import { SidebarProps } from "./interfaces/sidebarInterface";
import { DashboardIcon, LeftIcon, ProductsIcon, RightIcon, ShoppingCartIcon } from "../icons";
import { SidebarButton, SidebarContainer, SidebarMenu, SidebarMenuItem, Text } from "./styledcomponent/sidebar";
import { useRouter } from "next/router";

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarButton onClick={toggleSidebar}>{isOpen ? <LeftIcon /> : <RightIcon />}</SidebarButton>
      <SidebarMenu>
        <SidebarMenuItem href="/" isOpen={isOpen} className={currentRoute === "/" ? "active" : ""}>
          <DashboardIcon />
          <Text isOpen={isOpen}>Dashboard</Text>
        </SidebarMenuItem>
        <SidebarMenuItem href="/products" isOpen={isOpen} className={currentRoute === "/products" ? "active" : ""}>
          <ProductsIcon />
          <Text isOpen={isOpen}>Products</Text>
        </SidebarMenuItem>
        <SidebarMenuItem
          href="/carts"
          isOpen={isOpen}
          className={currentRoute === "/carts" || currentRoute === "/carts/[id]" ? "active" : ""}
        >
          <ShoppingCartIcon />
          <Text isOpen={isOpen}>Carts</Text>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
