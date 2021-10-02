import { PostSearch, UserSearch } from "@photo-service/contracts";
import { useQuery } from "react-apollo-hooks";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { FatText } from "src/components/FatText";
import { PostsContainer } from "src/components/PostsContainer";
import { UserCard } from "src/components/UserCard";
import { SEARCH } from "./Search.queries";
import {
  StyledSection,
  StyledCardsWrapper,
  StyledWrapper,
} from "./Search.styled";

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
      <Helmet>
        <title>searching for {term} | Photo service</title>
      </Helmet>
      {!term && <FatText>Search for something</FatText>}
      {loading && <FatText>Loading</FatText>}
      {!loading && data?.searchUser && (
        <StyledCardsWrapper>
          {!data?.searchUser?.length ? (
            <FatText>No users found</FatText>
          ) : (
            <StyledSection>
              {data.searchUser.map((user) => (
                <UserCard key={user.userName} {...user}></UserCard>
              ))}
            </StyledSection>
          )}
        </StyledCardsWrapper>
      )}
      {!loading && data?.searchPost && (
        <StyledCardsWrapper>
          <PostsContainer posts={data?.searchPost}></PostsContainer>
        </StyledCardsWrapper>
      )}
    </StyledWrapper>
  );
};
