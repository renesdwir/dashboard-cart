import styled from "styled-components";

const Wrapper = styled.section`
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
const SelectStyled = styled.select`
  min-width: 200px;
  border: 1px solid #e4e4e7;
  padding: 8px 10px;
  font-size: 18px;
  border-radius: 7px;
  color: #3f3f46;
  &:focus {
    outline: none;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Title = styled.p`
  margin-left: 0.1rem;
  margin-bottom: 2px;
`;
const Button = styled.button`
  padding: 7px 8px;
  margin: auto;
  cursor: pointer;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: block;
    margin-top: -15px;
  }
`;
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
interface StyledInputProps {
  category: string[];
  brand: string[];
  maximumPrice: number;
  dataLocalStorage: dataLocalStorageInterface | undefined;
  handleClearFilter: () => void;
  handleChangeFilterCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeFilterBrand: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeMinPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeMaxPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchPannel({
  category,
  brand,
  maximumPrice,
  handleChangeFilterCategory,
  handleChangeFilterBrand,
  handleChangeMinPrice,
  handleChangeMaxPrice,
  dataLocalStorage,
  handleClearFilter,
}: StyledInputProps) {
  return (
    <>
      <Wrapper>
        <input type="checkbox" id="toggle" />
        <label htmlFor="toggle">Search Panel</label>
        <InnerWrapper id="content">
          <div>
            <Title>Category</Title>
            <SelectStyled value={dataLocalStorage?.category ?? ""} onChange={handleChangeFilterCategory}>
              <option disabled value="">
                Filter by Category
              </option>
              {category?.map((dataCategory) => {
                return (
                  <option key={dataCategory} value={dataCategory}>
                    {dataCategory}
                  </option>
                );
              })}
            </SelectStyled>
          </div>
          <div>
            <Title>Brand</Title>
            <SelectStyled value={dataLocalStorage?.brand ?? ""} onChange={handleChangeFilterBrand}>
              <option disabled value="">
                Filter by Brand
              </option>
              {brand?.map((dataBrand) => {
                return (
                  <option key={dataBrand} value={dataBrand}>
                    {dataBrand}
                  </option>
                );
              })}
            </SelectStyled>
          </div>
          <div>
            <Title>Min Price {dataLocalStorage?.minPrice ?? 0}</Title>
            <input
              type="range"
              id="priceMin"
              name="priceMin"
              value={dataLocalStorage?.minPrice ?? 0}
              min="0"
              max={maximumPrice}
              onChange={handleChangeMinPrice}
            />
          </div>
          <div>
            <Title>Max Price {dataLocalStorage?.maxPrice ?? maximumPrice}</Title>
            <input
              type="range"
              id="priceMax"
              name="priceMax"
              value={dataLocalStorage?.maxPrice ?? maximumPrice}
              min="0"
              max={maximumPrice}
              onChange={handleChangeMaxPrice}
            />
          </div>
          <ButtonWrapper>
            <Button onClick={handleClearFilter}>Reset Filter</Button>
          </ButtonWrapper>
        </InnerWrapper>
      </Wrapper>
    </>
  );
}
