import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
        createdAt: Date;
        updatedAt: Date;
        image?: string | null | undefined;
        provider: string;
      };
    }
  }
}
