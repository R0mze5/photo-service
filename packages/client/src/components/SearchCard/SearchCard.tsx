import {
  PostId,
  File,
  PostCommentCount,
  PostLikesCount,
} from "@photo-service/contracts";
import React from "react";
import {
  StyledContainer,
  StyledOverlay,
  StyledNumber,
  StyledNumberText,
} from "./SearchCard.styled";
import PropTypes from "prop-types";
import { IconHeartFull } from "../Icons/IconHeartFull";
import { IconCommentFull } from "../Icons/IconCommentFull";

interface SearchCardProps {
  id: PostId;
  file: Pick<File, "id" | "url">;
  likesCount: PostLikesCount;
  commentCount: PostCommentCount;
}

export const SearchCard: React.FC<SearchCardProps> = (props) => {
  const { file, likesCount, commentCount } = props;

  if (!file?.url) return null;

  return (
    <StyledContainer to={``} background={file?.url}>
      <StyledOverlay>
        <StyledNumber>
          <IconHeartFull></IconHeartFull>
          <StyledNumberText>{likesCount}</StyledNumberText>
        </StyledNumber>
        <StyledNumber>
          <IconCommentFull></IconCommentFull>
          <StyledNumberText>{commentCount}</StyledNumberText>
        </StyledNumber>
      </StyledOverlay>
    </StyledContainer>
  );
};

SearchCard.propTypes = {
  id: PropTypes.string.isRequired,
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  likesCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
};
