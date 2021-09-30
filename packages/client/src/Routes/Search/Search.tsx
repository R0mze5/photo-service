import { PostSearch, UserSearch } from "@photo-service/contracts";
import { useQuery } from "react-apollo-hooks";
import { useLocation } from "react-router-dom";
import { FatText } from "src/components/FatText";
import { SearchCard } from "src/components/SearchCard";
import { UserCard } from "src/components/UserCard";
import { SEARCH } from "./Search.queries";
import {
  StyledSection,
  StyledCardsWrapper,
  StyledWrapper,
  StyledPostSection,
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
          {!data?.searchPost?.length ? (
            <FatText>No photos found</FatText>
          ) : (
            <StyledPostSection>
              {data.searchPost.map((post) => {
                if (!post.files[0]?.url) return null;

                return (
                  <SearchCard
                    key={post.id}
                    id={post.id}
                    likesCount={post.likesCount}
                    commentCount={post.commentCount}
                    file={post.files[0]}
                  ></SearchCard>
                );
              })}
            </StyledPostSection>
          )}
        </StyledCardsWrapper>
      )}
    </StyledWrapper>
  );
};
