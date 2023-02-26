import Pagination from "@/src/components/pagination";
import TableComponent from "@/src/components/table";
import { useQuery } from "@tanstack/react-query";
import { Title } from "@/src/components/styledcomponent/global";
import SearchPanel from "@/src/components/searchPanel";
import { useEffect, useState, SetStateAction } from "react";
import { Product, ProductInterface } from "@/pages/products/productInterface";
import { fetchProduct } from "../api/products";
import { StyledInput } from "@/src/components/styledcomponent/styledinput";

interface dataLocalStorageInterface {
  currentPage: number;
  allPage: number;
  limit: number;
  search: string;
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
}
interface paginationInterface {
  limit: number;
  page: number;
  totalPage: number;
}

export default function Products() {
  const [data, setData] = useState<Product[] | undefined>(undefined); //100 data fixed
  const [dataLocalStorage, setDataLocalStorage] = useState<dataLocalStorageInterface | undefined>(undefined); //filter
  const [newData, setNewData] = useState<Product[] | undefined>(undefined); //tampilin data
  const [resultData, setResultData] = useState<Product[] | undefined>(undefined); //tampilin data
  const [pagination, setPagination] = useState<paginationInterface>({
    limit: 10,
    page: 1,
    totalPage: 1,
  });
  const [category, setCategory] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [maximumPrice, setMaximumPrice] = useState<number>(0);

  const {
    isLoading,
    error,
    data: fetchedData,
  } = useQuery<ProductInterface>({
    queryKey: ["products"],
    queryFn: fetchProduct,
    staleTime: 60000,
  });

  if (!data && fetchedData?.products) {
    const getCategory: string[] = [];
    const getBrand: string[] = [];
    fetchedData?.products.forEach((item, index) => {
      let findIdx = fetchedData?.products.findIndex((obj) => {
        return obj.category === item.category;
      });
      let findIdxBrand = fetchedData?.products.findIndex((obj) => {
        return obj.brand === item.brand;
      });
      if (index === findIdx) {
        getCategory.push(item.category);
      }
      if (index === findIdxBrand) {
        getBrand.push(item.brand);
      }
    });
    let maxPrice = fetchedData?.products.reduce((prev, current) => (prev.price > current.price ? prev : current)).price;

    setMaximumPrice(maxPrice);
    setCategory(getCategory.sort());
    setBrand(getBrand.sort());
    setData(fetchedData.products);

    const localStorageData = localStorage.getItem("dataConfig");
    if (localStorageData) {
      setDataLocalStorage(JSON.parse(localStorageData));
    } else {
      setDataLocalStorage({
        currentPage: 1,
        allPage: 1,
        limit: 10,
        search: "",
        category: "",
        brand: "",
        minPrice: 0,
        maxPrice: maxPrice,
      });
    }
  }

  useEffect(() => {
    if (data) {
      const filteredData = filterData(
        data,
        dataLocalStorage ?? {
          currentPage: 1,
          allPage: 1,
          limit: 10,
          search: "",
          category: "",
          brand: "",
          minPrice: 0,
          maxPrice: maximumPrice,
        }
      );
      if (dataLocalStorage) localStorage.setItem("dataConfig", JSON.stringify(dataLocalStorage)); //ada data di ls
      else {
        setDataLocalStorage({
          currentPage: 1,
          allPage: 1,
          limit: 10,
          search: "",
          category: "",
          brand: "",
          minPrice: 0,
          maxPrice: maximumPrice,
        });
      }
      setNewData(filteredData);
    }
  }, [data, dataLocalStorage]);

  function filterData(data: Product[] | undefined, dataLocalStorage: dataLocalStorageInterface): Product[] {
    let filteredData = data ?? [];

    if (dataLocalStorage.category) {
      filteredData = filteredData.filter((item) => item.category === dataLocalStorage.category);
    }

    if (dataLocalStorage.brand) {
      filteredData = filteredData.filter((item) => item.brand === dataLocalStorage.brand);
    }
    if (dataLocalStorage.minPrice >= 0 || dataLocalStorage.maxPrice >= 0) {
      filteredData = filteredData.filter(
        (item) => item.price >= dataLocalStorage.minPrice && item.price <= dataLocalStorage.maxPrice
      );
    }
    if (dataLocalStorage.search || dataLocalStorage.search === "") {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(dataLocalStorage.search.toLowerCase())
      );
    }
    return filteredData;
  }

  useEffect(() => {
    if (newData) {
      let dataLength = newData.length;

      setPagination((prev) => {
        return {
          ...prev,
          totalPage: Math.ceil(dataLength / prev.limit),
        };
      });
      const startIndex = (pagination.page - 1) * pagination.limit;
      setResultData(newData.slice(startIndex, startIndex + pagination.limit));
    }
  }, [newData, pagination.page]);

  const handleChangeFilterCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDataLocalStorage(((prevState) => ({
      ...prevState,
      category: e.target.value,
    })) as SetStateAction<dataLocalStorageInterface | undefined>);
  };
  const handleChangeFilterBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDataLocalStorage(((prevState) => ({
      ...prevState,
      brand: e.target.value,
    })) as SetStateAction<dataLocalStorageInterface | undefined>);
  };
  const handleChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataLocalStorage(((prevState) => ({
      ...prevState,
      minPrice: +e.target.value,
    })) as SetStateAction<dataLocalStorageInterface | undefined>);
  };
  const handleChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataLocalStorage(((prevState) => {
      return {
        ...prevState,
        maxPrice: +e.target.value,
      };
    }) as SetStateAction<dataLocalStorageInterface | undefined>);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataLocalStorage(((prevState) => {
      return {
        ...prevState,
        search: e.target.value,
      };
    }) as SetStateAction<dataLocalStorageInterface | undefined>);
  };
  const handleClearFilter = () => {
    setDataLocalStorage({
      currentPage: 1,
      allPage: 1,
      limit: 10,
      search: "",
      category: "",
      brand: "",
      minPrice: 0,
      maxPrice: maximumPrice,
    });
  };
  const TableHead = ["Product Name", "Brand", "Price", "Stock", "Category"];
  if (error) return "An error has occurred: " + error;
  return (
    <>
      <Title>Products</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <SearchPanel
            brand={brand}
            category={category}
            handleChangeFilterCategory={handleChangeFilterCategory}
            handleChangeFilterBrand={handleChangeFilterBrand}
            handleChangeMinPrice={handleChangeMinPrice}
            handleChangeMaxPrice={handleChangeMaxPrice}
            dataLocalStorage={dataLocalStorage}
            maximumPrice={maximumPrice}
            handleClearFilter={handleClearFilter}
          />
          <StyledInput placeholder="Search Product" onChange={handleSearch} value={dataLocalStorage?.search} />
          <TableComponent datas={resultData} TableHead={TableHead} />
          <Pagination pagination={pagination} setPagination={setPagination} />
        </div>
      )}
    </>
  );
}
