import { SqlReimb } from "../dto/sql-reimb";
import { Reimb } from "../model/reimb";

/**
 * Used to convert a sql reimbursement to an actual reimb
 */
export function reimbConverter(reimb: SqlReimb) {
    function convertStatus(statusId) {
        let statusString = '';
        switch(statusId) {
            case 1: statusString = 'Pending';
            break;
            case 2: statusString = 'Approved';
            break;
            case 3: statusString = 'Denied';
        }
        return statusString;
    }

    function convertType(typeId) {
        let typeString = '';
        switch(typeId) {
            case 1: typeString = 'Lodging';
            break;
            case 2: typeString = 'Food';
            break;
            case 3: typeString = 'Travel';
            break;
            case 4: typeString = 'Other';
        }
        return typeString;
    }
    return new Reimb(reimb.reimb_id, reimb.reimb_amount, reimb.reimb_submitted, reimb.reimb_resolved,
    reimb.reimb_description, reimb.reimb_author, reimb.reimb_resolver, 
    convertStatus(reimb.reimb_status_id), convertType(reimb.reimb_type_id));
}