export class ReimbStatus {
    reimb_status_id = 0;
    reimb_status = '';

    constructor(reimb_status_id?: number, reimb_status?: string) {
        reimb_status_id && (this.reimb_status_id = reimb_status_id);
        reimb_status && (this.reimb_status = reimb_status);
    }
}