import { Type } from '@sinclair/typebox';

const dogsResponseSchema = Type.Object({
    dogs: Type.Array(
        Type.Object({
            name: Type.String(),
            yell: Type.String()
        })
    )
});

const dogResponseSchema = Type.Object({
    dog: Type.Object({
        name: Type.String(),
        yell: Type.String()
    })
});

const postResponseSchema = Type.Object({
    name: Type.String(),
    yell: Type.Optional(Type.String())
});


export { dogsResponseSchema, dogResponseSchema, postResponseSchema };