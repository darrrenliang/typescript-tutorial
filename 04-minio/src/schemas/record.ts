import { Type } from '@sinclair/typebox';

const recordResponseSchema = Type.Object({
    record: Type.Object({
        user: Type.String(),
        action: Type.String(),
        bucket: Type.Optional(Type.String()),
        object: Type.Optional(Type.String()),
    })

});

const recordsResponseSchema = Type.Object({
    records: Type.Array(
        Type.Object({
            user: Type.String(),
            action: Type.String(),
            bucket: Type.Optional(Type.String()),
            object: Type.Optional(Type.String()),
        })
    )
});

const postRecordBodySchema = Type.Object({
    user: Type.String(),
    action: Type.String(),
    bucket: Type.Optional(Type.String()),
    object: Type.Optional(Type.String()),
});

export { recordResponseSchema, recordsResponseSchema, postRecordBodySchema };