const { addMessage, getMessages, uploadFile, downloadFile } = require("../controllers/messageController");
const router = require("express").Router();
const upload = require("../utils/upload.js");

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);
router.post("/sendFile",upload.single("file"), uploadFile);
router.get("/file/:fileId", downloadFile);

module.exports = router;