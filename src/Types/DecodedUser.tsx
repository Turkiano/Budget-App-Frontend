import { Role } from "./Role"

export type DecodedUser = {
    aud: string
    emailaddress: string
    exp: number
    iss: string
    name: string
    nameidentifier: string
    role: keyof typeof Role
}