export interface Roles {
    admin?: boolean
    subscriber: boolean
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;
    roles: Roles;
}