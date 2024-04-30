import { IUser} from "../types/types.ts";
import instance from "../api/axios.api.ts";

export const AuthService = {
    // async registration(userData:IUserData):Promise<IResponseUserDate | undefined>{
    //     const {data } = await instance.post<IResponseUserDate>('user/signUp', JSON.stringify(userData), { headers: { 'Content-Type': 'application/json' } })
    //     return data
    //
    // },
    async login(){},
    async getProfile():Promise<IUser | undefined>{
        const{data} = await instance.get<IUser>('/auth/profile')
        if(data) return data
    }

}
