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
            console.log(reimbs);
            resp.json(reimbs);
        } catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
    }]);

/**
 * Find reimbs by author
 */
reimbRouter.get('/:id', [ 
    async(req: Request, resp: Response) => {
        const id = +req.params.id;
        console.log(`retreiving reimbs with author ${id}`);
        try {
            let reimbs = await reimbDao.findById(id);
            if (reimbs !== undefined) {
                resp.json(reimbs);
            } else {
                resp.sendStatus(400);
            }
        } catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
}]);

/**
 * Create Reimb
 */
reimbRouter.post('/submit-reimb', [
    async(req, resp) => {
        try {
            const id = await reimbDao.createReimb(req.body);
            resp.status(201);
            resp.json(id);
        } catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
    }]);

/**
 * Update a reimb upon approval/denial
 */
reimbRouter.post('/update', [
    async(req, resp) => {
        try {
            const id = await reimbDao.updateReimb(req.body);
            resp.status(201);
            resp.json(id);
        } catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
    }]);