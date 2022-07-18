import {Schema, model} from 'mongoose';


let testinmodel = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});


export default model('testingdb', testinmodel);