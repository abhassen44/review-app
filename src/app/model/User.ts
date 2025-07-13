import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
    category: string;
    tags: string[];
}

const MessageSchema:Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    category: {
        type: String,
        required: true,
        enum: ['General', 'Feedback', 'Question', 'Other'],
        default: 'General'
    },
    tags: {
        type: [String],
        default: []
    }
});

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifycode: string;
    verifycodeexpire: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
}

const UserSchema:Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/.+@.+\..+/, "Please enter a valid email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifycode: {
        type: String,
        required: [true, "Verifycode is required"],
    },
    verifycodeexpire: {
        type: Date,
        required: [true, "Verifycodeexpire is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;
