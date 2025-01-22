import { Request, Response, NextFunction } from 'express';
import { Project } from '../models';
import { ForbiddenError, NotFoundError } from '../errors';

export const authorizeProjectOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.user?.id;

    const project = await Project.findByPk(projectId);

    if (!project) {
      throw new NotFoundError("Project not found")
    }

    if (project.creatorId !== userId) {
      throw new ForbiddenError("You dont have the access to preform this operation!")
    }

    next();
  } catch (error) {
    next(error);
  }
};
