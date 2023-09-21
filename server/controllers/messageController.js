const Messages = require("../model/messageModel");
const File = require("../model/fileModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.uploadFile = async (req, res, next) => {
  const fileObj = {
    path : req.file.path,
    name : req.file.originalname
  }

  try {
    const file = await File.create(fileObj);
    if(file) return res.json({path : `http://localhost:3000/file/${file._id}`});
  } catch (ex) {
    next(ex)
  }
}

module.exports.downloadFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.fileId);
    console.log(file);
    console.log("hi");
    file.downloadNum++;
    await file.save();
    
    res.download(file.path, file.name);
  } catch (ex) {
    next(ex)
  }
}