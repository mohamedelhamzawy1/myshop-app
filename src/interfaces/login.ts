export interface SuccessLoginResponse{
    message: string,
    user: USerResponse ,
    token:string
}
export interface FailedLoginResponse{
     statusMsg: string,
    message:string
}
export interface USerResponse{

        name: string,
        email: string,
        role: string
    
}