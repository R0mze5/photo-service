import { prisma } from '../../../generated/prisma-client';
import { Post } from '../../../typings/Post';
import { User } from '../../../typings/User';

export default {
  Post: {
    files: (parent:Post) => prisma
      .post({ id: parent.id })
      .files(),
    comments: (parent:Post) => prisma
      .post({ id: parent.id })
      .comments(),
    user: (parent:Post) => prisma
      .post({ id: parent.id })
      .user(),
    isLiked: (parent:Post, __:any, { request }:{request: {user: User}}) => {
      const { user } = request;

      const { id: postId } = parent;

      return prisma.$exists.like({
        AND: [{ user: { id: user.id } }, { post: { id: postId } }],
      });
    },
    likesCount: (parent:Post) => prisma
      .likesConnection({ where: { post: { id: parent.id } } })
      .aggregate()
      .count(),

  },
};
