import { model, Schema } from "mongoose";
import { myDog } from "../types/dogs";

const dogSchema: Schema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        yell: {
            type: String,
            defalut: 'Bark'
        }
    }, {
    timestamps: true
}
);

export default model<myDog>('Dog', dogSchema);