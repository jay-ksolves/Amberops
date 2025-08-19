
import { Request, Response, NextFunction } from 'express';
import * as genericService from '../services/generic.service';
import { Cluster } from '../models/cluster.model';

const MODEL_NAME = 'Cluster';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await genericService.findAll(Cluster, req.user?.id);
        res.json(items);
    } catch (error) {
        next(error);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await genericService.findById(Cluster, req.params.id, req.user?.id);
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
        const newItem = await genericService.create(Cluster, req.body, req.user?.id);
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedItem = await genericService.update(Cluster, req.params.id, req.body, req.user?.id);
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
        const deletedItem = await genericService.deleteById(Cluster, req.params.id, req.user?.id);
        if (!deletedItem) {
            return res.status(404).json({ message: `${MODEL_NAME} not found` });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
