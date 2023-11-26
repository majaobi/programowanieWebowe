type TCreatePostRequest = {
    title: string,
    content: string,
    userId: string
}
type TCreatePostResponse = {
    id: string,
    title: string,
    content: string,
    userId: string
}
type TReadPostResponse = {
    id: string,
    title: string,
    content: string,
    userId: string
}
type TUpdatePostRequest = {
    title: string,
    content: string,
    userId: string
}
type TUpdatePostResponse = {
    message: string
}
type TDeletePostResponse = {
    message: string
}
export {
    TCreatePostRequest,
    TCreatePostResponse,
    TReadPostResponse,
    TUpdatePostRequest,
    TUpdatePostResponse,
    TDeletePostResponse
}
