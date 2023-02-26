const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async () => {
            const user = await User.find()
            return user
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        },

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return ( token, user );

        },

        saveBook: async (parent, { bookId, authors, description, title, image, link }) => {
           return await User.findOneAndUpdate(
                {bookId: bookId },
                {
                    $addToSet: { savedBooks: { 
                        bookId: bookId,
                        authors: authors,
                        description: description,
                        title: title,
                        image: image,
                        link: link 
                    }},
                },
                { new: true },
            )
        },

        removeBook: async (parent, { bookId }) => {
            return await User.findOneAndUpdate(
            { bookId: bookId},
            {
                $pull: { bookId: bookId },
            },
            { new: true },
            )    
        }
    }
}
