
import { Request, Response, NextFunction } from 'express';
import * as genericService from '../services/generic.service';
import { ActivityLog } from '../models/activityLog.model';

const MODEL_NAME = 'ActivityLog';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await genericService.findAll(ActivityLog, req.user?.id);
        res.json(items);
    } catch (error) {
        next(error);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await genericService.findById(ActivityLog, req.params.id, req.user?.id);
        if (!item) {
            return res.status(404).json({ message: `${MODEL_NAME} not found` });
        }
        res.json(item);
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // This needs to be more specific. For now, assume body has user details.
        const newItem = await genericService.create(ActivityLog, req.body, req.user?.id);
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedItem = await genericService.update(ActivityLog, req.params.id, req.body, req.user?.id);
        if (!updatedItem) {
            return res.status(404).json({ message: `${MODEL_NAME} not found` });
        }
        res.json(updatedItem);
    } catch (error) {
        next(error);
    }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedItem = await genericService.deleteById(ActivityLog, req.params.id, req.user?.id);
        if (!deletedItem) {
            return res.status(404).json({ message: `${MODEL_NAME} not found` });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
