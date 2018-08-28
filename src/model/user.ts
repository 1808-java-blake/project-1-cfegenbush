import { Reimb } from "./reimb";
export class User {
    user_id = 0;
    username = '';
    password = '';
    first_name = '';
    last_name = '';
    email = '';
    user_role_id = 0;
    reimbs: Reimb[] = [];

    constructor(user_id?: number, username?: string, password?: string, first_name?: string, 
        last_name?:string, email?: string, user_role_id?: number, reimbs?: Reimb[]) {
        user_id && (this.user_id = user_id);
        username && (this.username = username);
        password && (this.password = password);
        first_name && (this.first_name = first_name);
        last_name && (this.last_name = last_name);
        email && (this.email = email);
        user_role_id && (this.user_role_id);
        reimbs && (this.reimbs = reimbs);
    }
}