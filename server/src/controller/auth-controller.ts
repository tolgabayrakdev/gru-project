import { Request, Response } from "express";
import { AuthService } from "../service/auth-service";
import HttpException from "../exception/http-exception";


export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }


    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await this.authService.login(email, password);
            res.cookie('accessToken', user.accessToken, { httpOnly: true });
            res.cookie('refreshToken', user.refreshToken, { httpOnly: true });
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;
            const user = await this.authService.register(username, email, password);
            res.status(201).json(user);
        } catch (error) {            
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    verifyUser = async (req: Request, res: Response) => {
        try {
            const token: any = req.cookies.accessToken;            
            const user = await this.authService.verifyUser(token);            
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    logout = async (_req: Request, res: Response) => {
        try {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}