import { gql } from "apollo-boost";

export const USER_DETAILS = gql`
  query userDetails($username: String!) {
    userDetails(username: $username) {
      id
      avatar
      userName
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          id
          url
        }
        likesCount
        commentCount
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
