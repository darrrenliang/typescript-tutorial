import { myDog } from "../types/dogs";
import Dog from '../models/dogs';

interface dogRepo {
    getDogs(): Promise<Array<myDog>>;
    addDog(dogBody: myDog): Promise<myDog>;
};

class dogRepoImpt implements dogRepo {
    private constructor() { };

    static of(): dogRepoImpt {
        return new dogRepoImpt();
    };

    async getDogs(): Promise<Array<myDog>> {
        return Dog.find();
    };

    async addDog(dogBody: myDog): Promise<myDog> {
        return Dog.create(dogBody);
    };
};

export { dogRepoImpt };