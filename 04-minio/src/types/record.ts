import { Document } from "mongoose";

interface actionRecord extends Document {
    user: string,
    action: string,
    bucket?: string,
    object?: string
};


export { actionRecord };