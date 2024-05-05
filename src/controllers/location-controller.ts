import { AuthenticatedRequest } from "@/middlewares";
import authenticationService, { SignInParams } from '@/services/authentication-service';
import locationService from '@/services/location-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getUsersByLocationController(req: AuthenticatedRequest, res: Response) {
  try {
    const { location } = req.body; 
    const users = await locationService.getUsersByLocationService(location);
    return res.status(httpStatus.OK).send(users);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

