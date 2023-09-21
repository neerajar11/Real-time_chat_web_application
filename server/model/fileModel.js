const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
    {
      path: {
        type : String,
        required : true
      },
      name : {
        type : String,
        required : true
      },
      downloadNum : {
        type : Number,
        required : true,
        default : 0
      }
    }
  )


module.exports = mongoose.model("Files", fileSchema);