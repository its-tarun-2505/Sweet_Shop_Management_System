import mongoose from "mongoose";
import bcrypt from 'bcrypt';

// user schema
const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        }
    }, {
        timestamps: true
    }
);

// Hash Password before storing it database
UserSchema.pre('save', async function(){
    if(!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// Compare password during login
UserSchema.methods.comparePassword = async function(userPassword){
    return await bcrypt.compare(userPassword, this.password);
};

// Creating user model
const userModel = mongoose.model('user', UserSchema);

export default userModel;