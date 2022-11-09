import { actionRecord } from "../types/record";
import Record from '../models/record';

interface recordRepo {
    getRecords(): Promise<Array<actionRecord>>;
    addRecord(recordBody: actionRecord): Promise<actionRecord>;
};

class recordRepoImpt implements recordRepo {
    private constructor() { };

    static of(): recordRepoImpt {
        return new recordRepoImpt();
    };

    async getRecords(): Promise<Array<actionRecord>> {
        return Record.find();
    };

    async addRecord(recordBody: actionRecord): Promise<actionRecord> {
        return Record.create(recordBody);
    };

};

export { recordRepoImpt };