import { SqlUser } from "../dto/sql-user";
import { User } from "../model/user";

/**
 * This is used to convert a sql user into an actual user
 */
export function userConverter(user: SqlUser) {
    return new User(user.user_id, user.username, user.password, user.first_name, 
        user.last_name, user.email, user.user_role_id);
}
