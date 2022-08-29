import { Type } from '@sinclair/typebox';

const dogsResponseSchema = Type.Object({
    dogs: Type.Array(
        Type.Object({
            id: Type.String(),
            name: Type.String(),
            yell: Type.String()
        })
    )
});

const dogResponseSchema = Type.Object({
    dog: Type.Object({
        id: Type.String(),
        name: Type.String(),
        yell: Type.String()
    })
});

const postDogBodySchema = Type.Object({
    name: Type.String(),
    yell: Type.Optional(Type.String())
});


export { dogsResponseSchema, dogResponseSchema, postDogBodySchema };