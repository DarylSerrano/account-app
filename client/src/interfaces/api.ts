export interface ResponseOk<T> {
    data: T
}

export interface ResponseError {
    error: string
}

export interface User {
    id: number,
    name: string,
    connections: User[] | null
}

