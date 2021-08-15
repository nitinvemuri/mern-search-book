import {gql} from '@apollo/client'

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!, $username: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
    mutation addUser($email: String!, $password: String!, username: String!) {
        addUser(email: $email, password: $password, username: $username) {
            token
            user {
                _id
                username
                email
                bookCount
                savedBooks {
                    description
                    title
                    bookId
                    image
                    link
                    authors    
                }
            }
            token
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: savedBook!) {
        savedBook (input: $input) {
            _id
            username
            email
            bookCount
            savedBooks {
                # _id
                description
                title
                bookId
                image
                link
                authors
                
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
        _id 
        username
        email
        bookCount {
            # _id
            description
            title
            bookId
            image
            link
            authors
            
        }
    }
}
`;