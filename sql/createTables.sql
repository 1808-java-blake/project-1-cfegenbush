CREATE TABLE project1.ERS_USER_ROLES (
    ERS_USER_ROLE_ID INTEGER NOT NULL,
    USER_ROLE VARCHAR(10) NOT NULL,
    CONSTRAINT ERS_USER_ROLES_PK PRIMARY KEY (ERS_USER_ROLE_ID)
);

CREATE TABLE project1.ERS_USERS (
    ERS_USERS_ID SERIAL NOT NULL,
    ERS_USERNAME VARCHAR(50) NOT NULL,
    ERS_PASSWORD VARCHAR(50) NOT NULL,
    USER_FIRST_NAME VARCHAR(100) NOT NULL,
    USER_LAST_NAME VARCHAR(100) NOT NULL,
    USER_EMAIL VARCHAR(150) NOT NULL,
    USER_ROLE_ID INTEGER NOT NULL,
    CONSTRAINT ERS_USERS_PK PRIMARY KEY (ERS_USERS_ID),
    CONSTRAINT ERS_USERS_UNv1 UNIQUE (ERS_USERNAME, USER_EMAIL),
    CONSTRAINT USER_ROLES_FK FOREIGN KEY (USER_ROLE_ID)
        REFERENCES project1.ERS_USER_ROLES (ERS_USER_ROLE_ID)
);

CREATE TABLE project1.ERS_REIMBURSEMENT_STATUS (
    REIMB_STATUS_ID SERIAL NOT NULL,
    REIMB_STATUS VARCHAR(10) NOT NULL,
    CONSTRAINT REIMB_STATUS_PK PRIMARY KEY (REIMB_STATUS_ID)
);

CREATE TABLE project1.ERS_REIMBURSEMENT_TYPE (
    REIMB_TYPE_ID SERIAL NOT NULL,
    REIMB_TYPE VARCHAR(10) NOT NULL,
    CONSTRAINT REIMB_TYPE_PK PRIMARY KEY (REIMB_TYPE_ID)
);

CREATE TABLE project1.ERS_REIMBURSEMENT (
    REIMB_ID SERIAL NOT NULL,
    REIMB_AMOUNT INTEGER NOT NULL,
    REIMB_SUBMITTED TIMESTAMP NOT NULL,
    REIMB_RESOLVED TIMESTAMP,
    REIMB_DESCRIPTION VARCHAR(250),
    REIMB_AUTHOR INTEGER NOT NULL,
    REIMB_RESOLVER INTEGER,
    REIMB_STATUS_ID INTEGER NOT NULL,
    REIMB_TYPE_ID INTEGER NOT NULL,
    CONSTRAINT ERS_REIMBURSEMENT_PK PRIMARY KEY (REIMB_ID),
    CONSTRAINT ERS_USERS_FK_AUTH FOREIGN KEY (REIMB_AUTHOR)
        REFERENCES project1.ERS_USERS (ERS_USERS_ID),
    CONSTRAINT ERS_USERS_FK_RESLVR FOREIGN KEY (REIMB_RESOLVER)
        REFERENCES project1.ERS_USERS (ERS_USERS_ID),
    CONSTRAINT ERS_REIMBURSEMENT_STATUS_FK FOREIGN KEY (REIMB_STATUS_ID)
        REFERENCES project1.ERS_REIMBURSEMENT_STATUS (REIMB_STATUS_ID),
    CONSTRAINT ERS_REIMBURSEMENT_TYPE_FK FOREIGN KEY (REIMB_TYPE_ID)
        REFERENCES project1.ERS_REIMBURSEMENT_TYPE (REIMB_TYPE_ID)
);