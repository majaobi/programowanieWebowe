type TCreateTagsRequest = {
    name: string;
}

type TCreateTagsResponse = {
    id: string;
    name: string;
}

type TReadTagsResponse = {
    id: string;
    name: string;
}

type TUpdateTagsRequest = {
    name: string;
}


export type {
    TCreateTagsRequest,
    TCreateTagsResponse,
    TReadTagsResponse,
    TUpdateTagsRequest
}
