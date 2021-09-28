import { gql } from "apollo-boost";

export const GET_MY_FEED = gql`
  query {
    getFeed {
      id
      location
      caption
      user {
        id
        userName
        avatar
      }
      files {
        id
        url
      }
      likesCount
      isLiked
      comments {
        id
        text
        user {
          id
          userName
        }
      }
      createdAt
    }
  }
`;
