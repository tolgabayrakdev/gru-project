import { Request, Response } from "express";
import { FeedbackPageService } from "../service/feedback-page-service";
import HttpException from "../exception/http-exception";

export class FeedbackPageController {
    private feedbackPageService: FeedbackPageService;

    constructor() {
        this.feedbackPageService = new FeedbackPageService();
    }

    create = async (req: Request, res: Response): Promise<any> => {
        try {
            const feedbackPage = await this.feedbackPageService.create(req.body);
            return res.status(201).json(feedbackPage);
        } catch (error) {            
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    getById = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const feedbackPage = await this.feedbackPageService.getById(Number(id));
            if (!feedbackPage) return res.status(404).json({ message: "Feedback page not found" });

            return res.json(feedbackPage);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    getByToken = async (req: Request, res: Response): Promise<any> => {
        try {
            const { token } = req.params;
            const feedbackPage = await this.feedbackPageService.getByToken(token);
            if (!feedbackPage) return res.status(404).json({ message: "Feedback page not found" });

            return res.json(feedbackPage);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    update = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const feedbackPage = await this.feedbackPageService.update(Number(id), req.body);
            if (!feedbackPage) return res.status(404).json({ message: "Feedback page not found" });

            return res.json(feedbackPage);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    delete = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;
            const feedbackPage = await this.feedbackPageService.delete(Number(id));
            if (!feedbackPage) return res.status(404).json({ message: "Feedback page not found" });

            return res.json({ message: "Feedback page deleted successfully" });
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    isTokenExpired = async (req: Request, res: Response): Promise<any> => {
        try {
            const { token } = req.params;
            const isExpired = await this.feedbackPageService.isTokenExpire(token);

            return res.json({ isExpired });
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
