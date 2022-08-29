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

// Automatelly to generate id with string data type
dogSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

export default model<myDog>('Dog', dogSchema);