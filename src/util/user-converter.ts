import { SqlUser } from "../dto/sql-user";
import { User } from "../model/user";

/**
 * This is used to convert a sql user into an actual user
 */
export function userConverter(user: SqlUser) {
    return new User(user.ers_users_id, user.ers_username, undefined, user.user_first_name, 
        user.user_last_name, user.user_email, user.user_role_id);
}
