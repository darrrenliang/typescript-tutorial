import { Document } from "mongoose";
interface myDog extends Document {
    name: string,
    yell: string
};


export { myDog };