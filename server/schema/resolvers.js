const { isType } = require("graphql");
const _ = require("lodash");

const { UserList } = require("../data/FakeData");
const { MoviesList } = require("../data/FakeMovies");

// Check the "parent" parameter in the Query > user.
// With this, we can access the parent. We do not need it ,
// we need to access the args

// There is a rule that says that a resolver (like Query) should be created every time we use a non-basic type in the type-defs.
// So, for example, we are using FavoriteMovies or Friends in the type-defs, and those are User dependent, let's handle that with a new resolver

const resolvers = {
  Query: {
    users: () => {
      //  If we had a real database, we would use the method here instead of importing fake data
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      // If we had a database we would do select ... from ...
      // Since we do not have it, we need to use lodash
      const user = _.find(UserList, { id: Number(id) });

      return user;
    },

    // <!----- MOVIE RESOLVERS ------> //
    movies: () => {
      return MoviesList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MoviesList, { name });
      return movie;
    },
  },
  User: {
    // We could grab the information from the database directly
    favoriteMovies: () => {
      return _.filter(
        MoviesList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },
    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      const user = _.find(UserList, { id: Number(id) });
      user.username = newUsername;
      return user;
    },
    deleteUser: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      _.remove(UserList, user);
      return null;
    },
  },
};

module.exports = { resolvers };
