import getUserId from '../utils/getUserId';

const User = {
  posts: (parent, args, { prisma }, info) => {
    // const fragment= 'fragment userId on User { id }',

    return prisma.query.posts(
      {
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      },
      addFragmentToInfo(info, fragment)
    );
  },
  email: (parent, args, { request }, info) => {
    // const fragment= 'fragment userId on User { id }';

    const userId = getUserId(request, false);

    if (userId && userId === parent.id) {
      return parent.email;
    } else {
      return null;
    }
  }
};

export { User as default };
