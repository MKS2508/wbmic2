import { RoleProps } from './role-props';
export interface UserProps {
    username: String;
    email: String;
    password: String;
    roles: RoleProps[];
}
