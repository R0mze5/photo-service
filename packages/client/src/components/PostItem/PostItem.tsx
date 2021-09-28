import {
  PostId,
  User,
  File,
  CommentId,
  Comment,
} from "@photo-service/contracts";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import useInput from "src/hooks/useInput";
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
  StyledTextarea,
  StyledFileImage,
  StyledComment,
  StyledCaption,
  StyledComments,
} from "./PostItem.styled";
import { useMutation } from "react-apollo-hooks";
import { ADD_COMMENT, TOGGLE_LIKE } from "./PostItem.queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
  const { setValue: setCommentValue, ...commentField } = useInput("");
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState<
    Array<{
      id: CommentId;
      text: string;
      user: Pick<User, "id" | "userName">;
    }>
  >([]);
  const totalFiles = files.length;

  const [toggleLikeMutation] = useMutation<{ toggleLike: boolean }>(
    TOGGLE_LIKE,
    { variables: { postId: id } }
  );

  const [addCommentMutation, { loading }] =
    useMutation<{ addComment: Comment }>(ADD_COMMENT);

  const toggleLike = async () => {
    const isNewLiked = !isLikedPost;
    const initialLikesCount = likesCountPost;
    setIsLikedPost(isNewLiked);

    const newLikesCount =
      isNewLiked === true ? initialLikesCount + 1 : initialLikesCount - 1;

    setLikesCountPost(newLikesCount);

    try {
      const { data } = await toggleLikeMutation();

      if (
        typeof data?.toggleLike !== "boolean" ||
        isNewLiked !== data?.toggleLike
      ) {
        throw new Error("not responded");
      }
    } catch (error) {
      setIsLikedPost(!isNewLiked);
      setLikesCountPost(initialLikesCount);
      toast.error("cant register like");
    }
  };

  const addComment: React.KeyboardEventHandler = async (event) => {
    if (event.charCode === 13 && !event.ctrlKey && !event.shiftKey) {
      event.preventDefault();
      if (commentField.value?.trim() === "") {
        toast.error("comment is required");
      }
      try {
        const { data } = await addCommentMutation({
          variables: { postId: id, text: commentField.value },
        });
        if (data?.addComment.id) {
          setCommentValue("");
          if (data?.addComment) {
            setSelfComments([...selfComments, data.addComment]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const slideNext = useCallback(() => {
    if (currentItem === totalFiles - 1) {
      setCurrentItem(0);
    } else {
      setCurrentItem(currentItem + 1);
    }
  }, [currentItem, totalFiles]);

  // const slidePrev = () => {
  //   if (currentItem === 0) {
  //     setCurrentItem(totalFiles - 1);
  //   } else {
  //     setCurrentItem(currentItem - 1);
  //   }
  // };

  useEffect(() => {
    if (totalFiles > 1) {
      setTimeout(() => slideNext(), 3000);
    }
  }, [totalFiles, currentItem, slideNext]);

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
          files.map((file, index) => {
            return (
              <StyledFile isActive={index === currentItem} key={file.id}>
                <StyledFileImage src={file.url}></StyledFileImage>
              </StyledFile>
            );
          })}
      </StyledFiles>
      <StyledMeta>
        <StyledButtons>
          <StyledButton onClick={toggleLike}>
            {isLikedPost ? (
              <IconHeartFull></IconHeartFull>
            ) : (
              <IconHeartEmpty></IconHeartEmpty>
            )}
          </StyledButton>
          <StyledButton>
            <IconComment></IconComment>
          </StyledButton>
        </StyledButtons>
        <FatText>
          {likesCountPost === 1 ? "1 like" : `${likesCountPost} likes`}
        </FatText>
        {caption && (
          <StyledCaption>
            <Link to={`/${user.userName}`}>
              <FatText>{user.userName}</FatText>
            </Link>
            {caption}
          </StyledCaption>
        )}
        {comments && (
          <StyledComments>
            {[...comments, ...selfComments].map((comment) => {
              return (
                <StyledComment key={comment.id}>
                  <Link to={`/${comment?.user?.userName}`}>
                    <FatText>{comment?.user?.userName}</FatText>
                  </Link>{" "}
                  {comment.text}
                </StyledComment>
              );
            })}
          </StyledComments>
        )}
        <StyledTimestamp>{createdAt || "recently"}</StyledTimestamp>
        <StyledTextarea
          placeholder={"Add a comment"}
          {...commentField}
          onKeyPress={addComment}
          disabled={loading}
        ></StyledTextarea>
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
