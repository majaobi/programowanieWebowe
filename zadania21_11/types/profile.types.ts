type TCreateProfileRequest = {
    bio: string
}
type TCreateProfileResponse = {
    id: string,
    bio: string
}
type TReadProfileResponse = {
    id: string,
    bio: string
}
type TUpdateProfileRequest = {
    bio: string
}
type TUpdateProfileResponse = {
    message: string
}
export {
    TCreateProfileRequest,
    TCreateProfileResponse,
    TReadProfileResponse,
    TUpdateProfileRequest,
    TUpdateProfileResponse
}