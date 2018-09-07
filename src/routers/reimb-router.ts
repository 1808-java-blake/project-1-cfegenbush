import { Request, Response } from 'express';
import express from 'express';
import * as reimbDao from "../dao/reimb-dao";
import { authMiddleware } from '../security/authorization-middleware';

export const reimbRouter = express.Router();

/**
 * Find all reimbs
 */
reimbRouter.get('', [
    authMiddleware(1,2),
    async (req: Request, resp: Response) => {
        try {
            console.log('retrieving all reimbursements');
            let reimbs = await reimbDao.findAll();
            resp.json(reimbs);
        } catch (err) {
            resp.sendStatus(500);
        }
    }]);

/**
 * Find all pending reimbs
 */
reimbRouter.get('/pending', [
    async (req: Request, resp: Response) => {
        try {
            console.log('retrieving all pending reimbursements');
            let reimbs = await reimbDao.findAllPending();
            resp.json(reimbs);
        } catch (err) {
            resp.sendStatus(500)
        }
    }]);

/**
 * Find all pending reimbs for a certain user
 */
reimbRouter.get('/pending/userid=:id', [
    async (req: Request, resp: Response) => {
        const id = +req.params.id;        
        try {
            console.log(`retrieving pending reimbs for user: ${id}`);
            let reimbs = await reimbDao.findUsersPending(id);
            resp.json(reimbs);
        } catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
    }]);

/**
 * Find reimb by id
 */
reimbRouter.get('/:id', async(req, resp) => {
    const id = +req.params.id;
    console.log(`retreiving reimb with id ${id}`);
    try {
        let reimb = await reimbDao.findById(id);
        if (reimb !== undefined) {
            resp.json(reimb);
        } else {
            resp.sendStatus(400);
        }
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
});

/**
 * Create Reimb
 */
reimbRouter.post('/submit-reimb', [
    async(req, resp) => {
        try {
            console.log(req.body);
            const id = await reimbDao.createReimb(req.body);
            resp.status(201);
            resp.json(id);
        } catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
    }]);