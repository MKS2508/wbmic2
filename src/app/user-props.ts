import { RoleProps } from './role-props';
export interface UserProps {
    _id: any,
    username: String;
    email: String;
    password: String;
    roles: RoleProps[];
}
