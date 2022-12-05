export interface Roles {
    admin?: boolean
    subscriber: boolean
}

export interface User {
    uid: string;
    email?: string;
    displayName?: string;
    firstName?: string;
    lastName?: string;
    imgProfil?: string;
    roles?: Roles;
    auth?: boolean
}