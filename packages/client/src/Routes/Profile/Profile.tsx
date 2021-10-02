import { User, UserName } from "@photo-service/contracts";
import { useMutation, useQuery } from "react-apollo-hooks";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Avatar } from "src/components/Avatar";
import { Button } from "src/components/Button";
import { FatText } from "src/components/FatText";
import { FollowButton } from "src/components/FollowButton";
import { Loader } from "src/components/Loader";
import { PostsContainer } from "src/components/PostsContainer";
import { LOGOUT, USER_DETAILS } from "./Profile.query";
import {
  StyledBio,
  StyledContainer,
  StyledCount,
  StyledCountContainer,
  StyledFullName,
  StyledHeader,
  StyledHeaderColumn,
  StyledPostsContainer,
  StyledUsername,
  StyledUsernameContainer,
} from "./Profile.styled";

export const Profile: React.FC = () => {
  const match = useParams<{ username: UserName }>();

  const username = match.username;

  const { data, loading } = useQuery<{ userDetails: User }>(USER_DETAILS, {
    variables: { username },
    fetchPolicy: "no-cache",
    skip: !username,
  });

  const [logoutMutation] = useMutation(LOGOUT);

  if (loading) return <Loader></Loader>;

  const userDetails = data?.userDetails;
  if (loading)
    return (
      <StyledContainer>
        <Loader></Loader>
      </StyledContainer>
    );

  if (!userDetails) return <StyledContainer>User not found</StyledContainer>;

  const {
    id,
    avatar,
    userName,
    postsCount,
    followersCount,
    followingCount,
    fullName,
    bio,
    isSelf,
    posts,
  } = userDetails;

  return (
    <StyledContainer>
      <Helmet>
        <title>{userName} | Photo service</title>
      </Helmet>
      <StyledHeader>
        <StyledHeaderColumn>
          <Avatar size={"lg"} url={avatar}></Avatar>
        </StyledHeaderColumn>
        <StyledHeaderColumn>
          <StyledUsernameContainer>
            <StyledUsername>{userName}</StyledUsername>
            {!isSelf ? (
              <FollowButton
                id={id}
                isFollowing={userDetails.isFollowing}
                render={({ isFollowing, onFollow }) => (
                  <Button onClick={onFollow} disabled={isFollowing}>
                    {isFollowing ? "unfollow" : "follow"}
                  </Button>
                )}
              />
            ) : (
              <Button onClick={logoutMutation}>logout</Button>
            )}
          </StyledUsernameContainer>
          <StyledCountContainer>
            <StyledCount>
              <FatText>{postsCount}</FatText>
              {postsCount === 1 ? " post" : " posts"}
            </StyledCount>
            <StyledCount>
              <FatText>{followersCount}</FatText>
              {followersCount === 1 ? " follower" : " followers"}
            </StyledCount>
            <StyledCount>
              <FatText>{followingCount}</FatText>
              {followingCount === 1 ? " following" : " followings"}
            </StyledCount>
          </StyledCountContainer>
          <StyledFullName>{fullName}</StyledFullName>
          <StyledBio>{bio}</StyledBio>
        </StyledHeaderColumn>
      </StyledHeader>
      <StyledPostsContainer>
        <PostsContainer posts={posts}></PostsContainer>
      </StyledPostsContainer>
    </StyledContainer>
  );
};
