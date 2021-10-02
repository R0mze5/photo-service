import {
  UserAvatar,
  UserId,
  UserIsFollowing,
  UserIsSelf,
  UserName,
} from "@photo-service/contracts";
import { Button } from "../Button";
import { FatText } from "../FatText";
import { StyledContainer, StyledAvatar, StyledLink } from "./UserCard.styled";
import PropTypes from "prop-types";
import { FollowButton } from "../FollowButton";

interface UserCardProps {
  id: UserId;
  userName: UserName;
  isFollowing: UserIsFollowing;
  avatar: UserAvatar;
  isSelf: UserIsSelf;
}

export const UserCard: React.FC<UserCardProps> = ({
  avatar,
  isFollowing,
  userName,
  isSelf,
  id,
}) => {
  return (
    <StyledContainer>
      <StyledAvatar size={"md"} url={avatar}></StyledAvatar>
      <StyledLink to={`/${userName}`}>
        <FatText>{userName}</FatText>
      </StyledLink>
      {!isSelf && (
        <FollowButton
          isFollowing={isFollowing}
          id={id}
          render={(renderProps) => (
            <Button
              disabled={renderProps.isLoading}
              onClick={renderProps.onFollow}
            >
              {renderProps.isFollowing ? "unfollow" : "follow"}
            </Button>
          )}
        ></FollowButton>
      )}
    </StyledContainer>
  );
};

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  avatar: PropTypes.string,
  isSelf: PropTypes.bool.isRequired,
};
