export class Reimb {
    reimb_id = 0;
    amount = 0;
    submitted = '';
    resolved = '';
    description = '';
    author = 0;
    resolver = 0;
    status_id = 0;
    type_id = 0;

    constructor(reimb_id?: number, amount?: number, submitted?: string, 
        resolved?: string, description?: string, author?: number, 
        resolver?: number, status_id?: number, type_id?: number) {
            reimb_id && (this.reimb_id = reimb_id);
            amount && (this.amount = amount);
            submitted && (this.submitted = submitted);
            resolved && (this.resolved = resolved);
            description && (this.description = description);
            author && (this.author = author);
            resolver && (this.resolver = resolver);
            status_id && (this.status_id = status_id);
            type_id && (this.type_id = type_id);   
        }
}