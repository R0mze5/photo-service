import { PostSearch } from "@photo-service/contracts";
import PropTypes from "prop-types";
import { FatText } from "../FatText";
import { SearchCard } from "../SearchCard";
import { StyledPostSection } from "./PostsContainer.styled";

interface PostsContainerProps {
  posts: Array<PostSearch>;
}

export const PostsContainer: React.FC<PostsContainerProps> = ({ posts }) => {
  return (
    <>
      {!posts?.length ? (
        <FatText>No photos found</FatText>
      ) : (
        <StyledPostSection>
          {posts.map((post) => {
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
    </>
  );
};

PostsContainer.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      files: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
      likesCount: PropTypes.number.isRequired,
      commentCount: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};
