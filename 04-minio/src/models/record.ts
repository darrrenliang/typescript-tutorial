import { model, Schema } from "mongoose";
import { actionRecord } from "../types/record";

const recordSchema: Schema = new Schema(
    {
        user: {
            type: String,
            require: true
        },
        action: {
            type: String,
            require: true
        },
        bucket: {
            type: String,
            defalut: '-'
        },
        object: {
            type: String,
            defalut: '-'
        }
    }, {
    timestamps: true
}
);

// Automatelly to generate id with string data type
recordSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

export default model<actionRecord>('Record', recordSchema);