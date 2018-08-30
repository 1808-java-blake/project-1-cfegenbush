import { SqlReimb } from "../dto/sql-reimb";
import { Reimb } from "../model/reimb";

/**
 * Used to convert a sql reimbursement to an actual reimb
 */
export function reimbConverter(reimb: SqlReimb) {
    return new Reimb(reimb.reimb_id, reimb.reimb_amount, reimb.reimb_submitted, reimb.reimb_resolved,
    reimb.reimb_description, reimb.reimb_author, reimb.reimb_resolver, reimb.reimb_status_id, reimb.reimb_type_id);
}