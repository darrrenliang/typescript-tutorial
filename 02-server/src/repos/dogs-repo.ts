import { myDog } from "../types/dogs";
import Dog from '../models/dogs';

interface dogRepo {
    getDogs(): Promise<Array<myDog>>;
    addDog(dogBody: myDog): Promise<myDog>;
    updateDog(id: string, dogBody: myDog): Promise<myDog | null>;
    deleteDog(id: string): Promise<myDog | null>;
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

    async updateDog(id: string, dogBody: myDog): Promise<myDog | null> {
        return Dog.findByIdAndUpdate(id, dogBody, { new: true });
    };

    async deleteDog(id: string): Promise<myDog | null> {
        return Dog.findByIdAndDelete(id);
    };
};

export { dogRepoImpt };