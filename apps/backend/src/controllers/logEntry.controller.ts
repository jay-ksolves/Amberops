
import { Request, Response, NextFunction } from 'express';
import * as genericService from '../services/generic.service';
import { LogEntry } from '../models/logEntry.model';

const MODEL_NAME = 'LogEntry';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // LogEntries are not user-specific in the same way, but we can filter if needed.
        // For now, let's assume they are globally searchable for authenticated users.
        const items = await genericService.findAll(LogEntry, undefined);
        res.json(items);
    } catch (error) {
        next(error);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await genericService.findById(LogEntry, req.params.id, undefined);
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
        const newItem = await genericService.create(LogEntry, req.body, undefined);
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedItem = await genericService.update(LogEntry, req.params.id, req.body, undefined);
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
        const deletedItem = await genericService.deleteById(LogEntry, req.params.id, undefined);
        if (!deletedItem) {
            return res.status(404).json({ message: `${MODEL_NAME} not found` });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
