import  { jwtDecode }  from "jwt-decode";
interface UserInfo{
    userId:number,
    email:string
}
export const getLoginInfo = ():UserInfo => {
    const token = localStorage.getItem("token")
    if(token != null){
        const userInfo : UserInfo = jwtDecode(token)
        return userInfo;
    }
    else{
        return null;
    }
}
