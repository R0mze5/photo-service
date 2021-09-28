export const USER = `
  id
  userName
  avatar
`;

export const COMMENT = `
  id
  text
  user {
    ${USER}
  }
`;

export const COMMENT_FRAGMENT = `
fragment CommentParts on Comment {
${COMMENT}
}
  
`;

export const FILES = `
  id
  url
`;

// export const FULL_POST_FRAGMENT = `
// fragment PostParts on Post {
//   id
//   location
//   caption
//   user {
//     ${USER}
//   }
//   files {
//     ${FILES}
//   }
//   comments {
//     ${COMMENT}
//   }
// }`;

export const MESSAGE = `
  id
  text
  sender {
    ${USER}
  }
  recipient {
    ${USER}
}`;

export const ROOM_FRAGMENT = `
fragment RoomParts on Room {
  id
  participants {
    ${USER}
  }
  messages {
    ${MESSAGE}
  }
}
`;
