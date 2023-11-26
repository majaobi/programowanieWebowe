type TCreateUserRequest = {
    email: string, 
    name: string, 
    password:string
}
type TCreateUserResponse = {
    id: string,
    email: string, 
    name: string, 
    password:string,
    bio: string
}
type TReadUserResponse = {
    id: string,
    email: string, 
    name: string | null,
}

type TUpdateUserRequest = {
    email: string, 
    name: string
}
                                       


export {
    TCreateUserRequest,
    TCreateUserResponse,
    TReadUserResponse,
    TUpdateUserRequest

}
