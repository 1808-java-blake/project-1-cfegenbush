export class ReimbType {
    reimb_type_id = 0;
    reimb_type = '';

    constructor(reimb_type_id?: number, reimb_type?: string) {
        reimb_type_id && (this.reimb_type_id = reimb_type_id);
        reimb_type && (this.reimb_type = reimb_type);
    }
}