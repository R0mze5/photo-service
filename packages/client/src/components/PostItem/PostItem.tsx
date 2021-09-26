import { PostId, User, File, CommentId } from "@photo-service/contracts";
import PropTypes from "prop-types";
import { useState } from "react";
import useInput from "src/hooks/useInput";
import { useTheme } from "styled-components";
import { Avatar } from "../Avatar";
import { FatText } from "../FatText";
import { IconComment } from "../Icons/IconComment";
import { IconHeartEmpty } from "../Icons/IconHeartEmpty";
import { IconHeartFull } from "../Icons/IconHeartFull";
import {
  StyledContainer,
  StyledHeader,
  StyledUserColumn,
  StyledLocation,
  StyledFiles,
  StyledFile,
  StyledMeta,
  StyledButtons,
  StyledButton,
  StyledTimestamp,
} from "./PostItem.styled";

interface PostItemProps {
  id: PostId;
  user: Pick<User, "id" | "avatar" | "userName">;
  files: Array<Pick<File, "id" | "url">>;
  likesCount: number;
  isLiked: boolean;
  location?: string | null;
  caption: string;
  comments: Array<{
    id: CommentId;
    text: string;
    user: Pick<User, "id" | "userName">;
  }>;
  createdAt: string | null;
}

export const PostItem: React.FC<PostItemProps> = ({
  id,
  location,
  caption,
  user,
  files,
  likesCount,
  isLiked,
  comments,
  createdAt,
}) => {
  const [isLikedPost, setIsLikedPost] = useState(isLiked);
  const [likesCountPost, setLikesCountPost] = useState(likesCount);
  const comment = useInput("");
  const theme = useTheme();
  console.log(theme);

  return (
    <StyledContainer>
      <StyledHeader>
        <Avatar url={user.avatar}></Avatar>
        <StyledUserColumn>
          <FatText>{user.userName}</FatText>
          <StyledLocation>{location}</StyledLocation>
        </StyledUserColumn>
      </StyledHeader>
      <StyledFiles>
        {files &&
          files.map((file) => {
            return <StyledFile src={file.url} key={file.id}></StyledFile>;
          })}
      </StyledFiles>
      <StyledMeta>
        <StyledButtons>
          <StyledButton>
            {isLiked ? (
              <IconHeartFull></IconHeartFull>
            ) : (
              <IconHeartEmpty></IconHeartEmpty>
            )}
          </StyledButton>
          <StyledButton>
            <IconComment></IconComment>
          </StyledButton>
        </StyledButtons>
        <FatText>{likesCount === 1 ? "1 like" : `${likesCount} likes`}</FatText>
        <StyledTimestamp>{createdAt || "recently"}</StyledTimestamp>
      </StyledMeta>
    </StyledContainer>
  );
};

PostItem.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.string,
  caption: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  likesCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  createdAt: PropTypes.string,
};
