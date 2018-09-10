import { connectionPool } from "../util/connection-util";
import { User } from "../model/user";
import { userConverter } from "../util/user-converter";
import { reimbConverter } from "../util/reimb-converter";

/** 
 * Retreive all users from the DB along with all their reimbursements
 */
export async function findAll(): Promise<User[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM project1.ERS_USERS
             WHERE USER_ROLE_ID = 1`);
        
        const users = [];
        resp.rows.forEach((user_reimb_result) => {
            console.log(user_reimb_result);
            const exists = users.some( existingUser => {
                if(user_reimb_result.ers_users_id === existingUser.ers_users_id) {
                    return true;
                }
            })
            if (!exists) {
                const newUser = userConverter(user_reimb_result);
                users.push(newUser);
            }
        })
        return users;
    } finally {
        client.release();
    }
}

/**
 * Retrieve a single user by id, will also retrieve all of that users reimbs
 * @param id
 */
export async function findById(id: number): Promise<User> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM project1.ERS_USERS u, project1.ERS_REIMBURSEMENT r
            WHERE u.ERS_USERS_ID = $1
            AND u.ERS_USERS_ID = r.REIMB_AUTHOR;`, [id]);
            const user = userConverter(resp.rows[0]); // get the user data from the first row
            
            // get the reimbs from all the rows
            resp.rows.forEach((reimb) => {
                reimb.reimb_id && user.reimbs.push(reimbConverter(reimb));
            })
            return user;
    } finally {
        client.release();
    }
}

/**
 * Retrieve a single user by username and password, will also retrieve all of that users reimbs
 * @param id
 */
export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM project1.ers_users u
            WHERE u.ers_username = $1
            AND u.ers_password = $2`, [username, password]);
            if(resp.rows.length !== 0) {
                return userConverter(resp.rows[0]); // get the user data from first row
            }
            return null;
    } finally {
        client.release();
    }
}

/**
 * Add a new user to the DB
 * @param user
 */
export async function create(user: User): Promise<number> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `INSERT INTO project1.ers_users
            (ers_username, ers_password, user_first_name, user_last_name, user_email, user_role_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING ers_users_id`, [user.ers_username, user.ers_password, user.user_first_name, 
                                    user.user_last_name, user.user_email, user.user_role_id]);
        return resp.rows[0].ers_user_id;
    } finally {
        client.release();
    }
}