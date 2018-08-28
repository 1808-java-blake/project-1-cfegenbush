import { SqlReimb } from "../dto/sql-reimb";
import { Reimb } from "../model/reimb";

/**
 * Used to convert a sql reimbursement to an actual reimb
 */
export function reimbConverter(reimb: SqlReimb) {
    return new Reimb(reimb.reimb_id, reimb.amount, reimb.submitted, reimb.resolved,
    reimb.description, reimb.author, reimb.resolver, reimb.status_id, reimb.type_id);
}