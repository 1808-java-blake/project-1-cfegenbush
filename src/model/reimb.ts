export class Reimb {
    reimb_id = 0;
    reimb_amount = 0;
    reimb_submitted = '';
    reimb_resolved = '';
    reimb_description = '';
    reimb_author = 0;
    reimb_resolver = 0;
    reimb_status_id = '';
    reimb_type_id = '';

    constructor(reimb_id?: number, reimb_amount?: number, reimb_submitted?: string, 
        reimb_resolved?: string, reimb_description?: string, reimb_author?: number, 
        reimb_resolver?: number, reimb_status_id?: string, reimb_type_id?: string) {
            reimb_id && (this.reimb_id = reimb_id);
            reimb_amount && (this.reimb_amount = reimb_amount);
            reimb_submitted && (this.reimb_submitted = reimb_submitted);
            reimb_resolved && (this.reimb_resolved = reimb_resolved);
            reimb_description && (this.reimb_description = reimb_description);
            reimb_author && (this.reimb_author = reimb_author);
            reimb_resolver && (this.reimb_resolver = reimb_resolver);
            reimb_status_id && (this.reimb_status_id = reimb_status_id);
            reimb_type_id && (this.reimb_type_id = reimb_type_id);
        }
}