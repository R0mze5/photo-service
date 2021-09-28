import { PostSearch, UserSearch } from "@photo-service/contracts";
import { useQuery } from "react-apollo-hooks";
import { useLocation } from "react-router-dom";
import { FatText } from "src/components/FatText";
import { SEARCH } from "./Search.queries";
import { StyledWrapper } from "./Search.styled";

export const Search: React.FC = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search.replace(/\?/, ""));

  const term = params.get("s");

  const { data, loading } = useQuery<{
    searchPost: Array<PostSearch>;
    searchUser: Array<UserSearch>;
  }>(SEARCH, {
    variables: { term },
    skip: !term,
  });

  return (
    <StyledWrapper>
      {!term && <FatText>Search for something</FatText>}
      {loading && <FatText>Loading</FatText>}
      {!!data && <FatText>Found</FatText>}
    </StyledWrapper>
  );
};
