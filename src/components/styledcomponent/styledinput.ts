import styled from "styled-components";
export const StyledInput = styled.input`
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
