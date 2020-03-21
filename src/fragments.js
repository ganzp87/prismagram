export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment {
        id
        text
        user{
            username
            id
            email
            bio
            lastName
            firstName
        }
    }
`

export const USER_FRAGMENT = `
    id
    username
    avatar
`

export const FILE_FRAGMENT = `
    id
    url
`

export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post {
        id
        location
        caption
        user {
            id
            username
            email
            firstName
            lastName
            bio
        }
        files {
            ${FILE_FRAGMENT}
        }
        comments {
            id
            text
            user {
                id
                username
                email
                firstName
                lastName
            }
        }
        likes {
            id
            user{
                id
                username
                email
                firstName
                lastName
            }
        }
    }
    `

export const MESSAGE_FRAGMENT = `
    fragment MessageParts on Message{
        id
        text
        to{
            ${USER_FRAGMENT}
        }
        from{
            ${USER_FRAGMENT}
        }
    }
`

export const MESSAGE = `
    id
    text
    to{
        ${USER_FRAGMENT}
    }
    from{
        ${USER_FRAGMENT}
    }
`

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room{
        id
        participants{
            ${USER_FRAGMENT}
        }
        messages {
            ${MESSAGE}
        }
    }
`
