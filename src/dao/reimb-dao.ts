import { connectionPool } from "../util/connection-util";
import { Reimb } from "../model/reimb";
import { reimbConverter } from "../util/reimb-converter";
import { SqlReimb } from "../dto/sql-reimb";

/**
 * Retrieve all reimbs from the database
 */
export async function findAll(): Promise<Reimb[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query('SELECT * FROM project1.ERS_REIMBURSEMENT');
        return resp.rows.map(reimbConverter);
    } finally {
        client.release();
    }
}

/**
 * Retrieve all pending reimbs
 */
export async function findAllPending(): Promise<Reimb[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(`SELECT * FROM project1.ERS_REIMBURSEMENT 
                                         WHERE REIMB_STATUS_ID = 1`);
        return resp.rows.map(reimbConverter);
    } finally {
        client.release();
    }
}

/**
 * Retrieve all pending reimbs for a certain user id
 */
export async function findUsersPending(id): Promise<Reimb[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(`SELECT * FROM project1.ERS_REIMBURSEMENT 
                                         WHERE REIMB_STATUS_ID = 1 AND REIMB_AUTHOR = $1`, [id]);
        return resp.rows.map(reimbConverter);
    } finally {
        client.release();
    }
}

/**
* Retrieve reimbs by their author
* @param id
*/
export async function findById(id: number): Promise<Reimb[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(`SELECT * FROM project1.ERS_REIMBURSEMENT 
                                        WHERE REIMB_AUTHOR = $1`, [id]);
        console.log(resp);
        return resp.rows.map(reimbConverter);
    } finally {
        client.release();
    }
}

/**
 * Add a new reimbursement to the DB
 * @param reimb
 */
export async function createReimb(reimb): Promise<number> {
    const client = await connectionPool.connect();
    const tempDate = new Date();
        const date = (tempDate.getMonth()+1) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
    try {
        const resp = await client.query(
            `INSERT INTO project1.ERS_REIMBURSEMENT (REIMB_AMOUNT, REIMB_SUBMITTED, 
                REIMB_DESCRIPTION, REIMB_AUTHOR, REIMB_STATUS_ID, REIMB_TYPE_ID) 
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING REIMB_ID`, [reimb.amount, date, reimb.description,
                reimb.author, reimb.status, reimb.type]);
        return resp.rows[0].REIMB_ID;
    } finally {
        client.release();
    }
}

/**
 * Update a reimb upon approval/denial
 */
export async function updateReimb(reimb): Promise<number> {
    const client = await connectionPool.connect();
    const tempDate = new Date();
        const date = (tempDate.getMonth()+1) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
    try {
        const resp = await client.query(
            `UPDATE project1.ERS_REIMBURSEMENT SET REIMB_STATUS_ID = $1, REIMB_RESOLVED = $2, REIMB_RESOLVER = $3 WHERE REIMB_ID = $4;`,
            [reimb.status, date, reimb.author, reimb.id]);
        return resp.rows[0];
    } finally {
        client.release();
    }
}