
import { Request, Response, NextFunction } from 'express';
import * as genericService from '../services/generic.service';
import { Task } from '../models/task.model';

const MODEL_NAME = 'Task';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await genericService.findAll(Task, req.user?.id);
        res.json(items);
    } catch (error) {
        next(error);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await genericService.findById(Task, req.params.id, req.user?.id);
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
        const newItem = await genericService.create(Task, req.body, req.user?.id);
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedItem = await genericService.update(Task, req.params.id, req.body, req.user?.id);
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
        const deletedItem = await genericService.deleteById(Task, req.params.id, req.user?.id);
        if (!deletedItem) {
            return res.status(404).json({ message: `${MODEL_NAME} not found` });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
