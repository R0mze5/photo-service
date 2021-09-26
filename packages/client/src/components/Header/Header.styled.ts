import { Link } from "react-router-dom";
import styled from "styled-components";
import Input from "../Input";

export const Container = styled.header`
  width: 100%;
  border-bottom: ${({ theme }) => theme.boxBorder};
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0;
  background-color: #fff;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  display: flex;
  justify-content: center;
`;

export const HeaderColumn = styled.div`
  flex: 1;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }

  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

export const SearchInput = styled(Input)`
  background-color: ${({ theme }) => theme.bgColor};
  padding: 5px;
  height: auto;
  font-size: 14px;
  width: 70%;

  &::placeholder {
    opacity: 0.8;
    font-weight: 400;
    border-radius: 3px;
  }
`;

export const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;
