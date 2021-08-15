const {Book, User} = require('../models');
const { AuthenticationError } = require('apollo-server-express')
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(parent,args, context) => {
            if(context.user) {
                const userData = await User.findOne({})
                .select('-_v -password')
                .populate('books')
                return userData;
            }

            throw new AuthenticationError('Not logged in')
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await user.create(args)
            const token = signToken(user);

            return {token, user}
        },

        login: async(username, password, email) => {
            const user = await user.findOne({email});

            if(!user) {
                throw new AuthenticationError('wrong email')
            }
            
            const correctPw = await user.isCurrentPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('wrong password')
            }

            const token = signToken(user)
            return {token, user}
        },

        saveBook: async( parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    { $addToSet: {savedBooks: args.input}},
                    {new: true},
                );

                return updatedUser;
            }
            throw new AuthenticationError('Must be logged in')
        },

        removeBook: async(parent, args, context) => {
            if(context.user) {
                const updatedUser = await User.findByIdAndDelete(
                    {_id: context.user._id},
                    { $pull: {savedBooks: {bookId: args.bookId}}},
                    { new: true}
                );

                return updatedUser;
            }

            throw new AuthenticationError
        }
    }
}

module.exports = resolvers;
