export interface User {
    avatar: string,
    username: string,
    email: string,
    followers: Array<string>
}

export interface Tweet {
    tweetText: string,
    postedBy: string
}

export interface ResponseType {
    status: number,
    message: string | null,
    data: User | Tweet | Tweet[] | null
}