export interface IUser{
    id:number
    email:string
    token:string
}


export interface IUserData{
    email:string
    password:string
}

export interface IResponseUserDate{
    email:string | undefined
    password:string | undefined
    createdAt:string | undefined
    updatedAt:string | undefined
    __v?:number | undefined
    _id?:string | undefined
}
