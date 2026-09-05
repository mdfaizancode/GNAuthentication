import mongoose from "mongoose";
import { Schema } from "mongoose";
 
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Google se aaya hai to password zaroori nahi
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // local users ke liye googleId null rahega, sparse isse allow karta hai
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
 
export default mongoose.model("final", userSchema);






// import mongoose from "mongoose";
// import { Schema } from "mongoose";
 
// // ---------------- User Schema (normal email/password signup) ----------------
// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,      // ek email se ek hi account banega
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,     // ye schema hi sirf local (email/password) users ke liye hai
//     },
//   },
//   { timestamps: true }
// );
 
// const User = mongoose.model("User", userSchema);
 
// // ---------------- SocialLogins Schema (Google OAuth users) ----------------
// const socialLoginSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,       // ek email se ek hi social account
//       lowercase: true,
//       trim: true,
//     },
//     image: {
//       type: String,
//       default: "",
//     },
//     googleId: {
//       type: String,
//       required: true,
//       unique: true,        // Google ki unique profile id
//     },
//     provider: {
//       type: String,
//       enum: ["google"],    // future me facebook/github add karna ho to yaha enum badha dena
//       default: "google",
//     },
//   },
//   { timestamps: true }
// );
 
// const SocialLogins = mongoose.model("SocialLogins", socialLoginSchema);
 
// export default User;
// export { SocialLogins };