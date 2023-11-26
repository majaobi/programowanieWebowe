type TCreateCommentRequest = {
    content: string,
    userId: string,
    postId: string
}

type TCreateCommentResponse = {
    id: string,
    content: string,
    userId: string,
    postId: string
}

type TReadCommentResponse = {
    id: string,
    content: string,
    userId: string,
    postId: string
}

type TUpdateCommentRequest = {
    content: string,
    userId: string,
    postId: string
}

type TUpdateCommentResponse = {
    message: string
}

type TDeleteCommentResponse = {
    message: string
}

export {
    TCreateCommentRequest,
    TCreateCommentResponse,
    TReadCommentResponse,
    TUpdateCommentRequest,
    TUpdateCommentResponse,
    TDeleteCommentResponse
}
