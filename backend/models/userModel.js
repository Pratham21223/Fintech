const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{
      type:String,
      enum : ["viewer","analyst","admin"],
      default : "viewer",
    },
    isActive:{ type : Boolean,default : true}
  },
  { timestamps: true },
);


//Adding salt and hashing password before saving it.
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Instance method to compare passwords
userSchema.methods.comparePass = async (currPassword) => {
  return bcrypt.compare(currPassword,this.password);
}

const User = model("User", userSchema);
module.exports = { User };
