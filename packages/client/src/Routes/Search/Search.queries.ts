import { gql } from "apollo-boost";

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likesCount
      commentCount
    }
    searchUser(term: $term) {
      avatar
      userName
      isFollowing
    }
  }
`;
