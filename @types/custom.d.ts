import type { IUser } from "../server/models/user.model"; // Use 'import type'
// Use 'import type'

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
