const userModel = require("../models/userModel");
const mailModel = require("../models/mailModel");

async function getMails(req, res) {
    console.log("Getting mails..");
    const mails = await mailModel.find({ "to": req.user.id });
    res.json({ status: true, mails: mails })
}

async function sendMail(req, res) {
    console.log("Sending mail...");
    const email = req.body.to;

    const user = await userModel.findOne({ email: email }, "_id");
    if (!user) {
        res.json({
            status: false,
            msg: "Invalid sender"
        })
    }

    const newMail = new mailModel({
        from: req.user.id,
        to: user,
        body: req.body.body,
        subject: req.body.subject,
        seenByReciever: false
    });
    await newMail.save();
}

module.exports = { getMails, sendMail };