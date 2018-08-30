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
* Retrieve a movie by its id
* @param id
*/
export async function findById(id: number): Promise<Reimb> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(`SELECT * FROM project1.ERS_REIMBURSEMENT 
                                        WHERE REIMB_ID = $1`, [id]);
        let reimb: SqlReimb = resp.rows[0];
        if (reimb !== undefined) {
            return reimbConverter(reimb);
        } else {
            return undefined;
        }
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
    try {
        const resp = await client.query(
            `INSERT INTO project1.ERS_REIMBURSEMENT (REIMB_AMOUNT, REIMB_SUBMITTED, 
                REIMB_DESCRIPTION, REIMB_AUTHOR, REIMB_STATUS_ID, REIMB_TYPE_ID) 
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING REIMB_ID`, [reimb.REIMB_AMOUNT, reimb.REIMB_SUBMITTED, reimb.REIMB_DESCRIPTION,
                reimb.REIMB_AUTHOR, reimb.REIMB_STATUS_ID, reimb.REIMB_TYPE_ID]);
        return resp.rows[0].REIMB_ID;
    } finally {
        client.release();
    }
}
