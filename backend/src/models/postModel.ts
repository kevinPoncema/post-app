import { Schema, model } from "mongoose";

const PostSchema = new Schema({
    title: {  
        type: String, 
        required: true,
        trim: true,
    },
    content: {
        type: String, 
        required: true, 
    },
    enable: {
        type: Boolean,
        default: true,
    }
});

export default model('Post', PostSchema);
