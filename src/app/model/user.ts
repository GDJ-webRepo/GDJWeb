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
    emailVerified?: boolean;
    imgProfil?: string;
    roles?: Roles;
}