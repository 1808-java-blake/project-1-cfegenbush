export class UserRole {
    user_role_id = 0;
    user_role = '';

    constructor(user_role_id?: number, user_role?: string) {
        user_role_id && (this.user_role_id = user_role_id);
        user_role && (this.user_role = user_role);
    }
}