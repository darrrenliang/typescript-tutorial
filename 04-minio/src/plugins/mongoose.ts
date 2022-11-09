import mongoose from "mongoose";

const createConnection = async (connectString: string) => {
    mongoose.connect(connectString, (err) => {
        if (err) {
            console.log(`Error in mongoDB connection: ${err}`);
        } else {
            console.log('Connect to mongoDB successfully.')
        }
    });
};

export { createConnection };