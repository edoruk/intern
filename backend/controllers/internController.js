const Intern = require("../models/internModel")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer")

//get all interns
async function getInterns(req, res) {
  const interns = await Intern.find({}).sort({ createdAt: -1 })

  res.status(200).json(interns)
}

//get a single intern
async function getIntern(req, res) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such intern found" })
  }

  const intern = await Intern.findById(id)

  if (!intern) {
    res.status(404).json({ error: "No such intern found" })
  }
  res.status(200).json(intern)
}

//add an intern
async function createIntern(req, res) {
  const {
    name,
    surname,
    email,
    gender,
    school,
    major,
    year,
    softwareTools,
    address,
    dateOfBirth,
    trainingDates,
    credit,
    image,
    cv,
    portfolio,
  } = req.body

  try {
    const intern = await Intern.create({
      name,
      surname,
      email,
      gender,
      school,
      major,
      year,
      softwareTools,
      address,
      dateOfBirth,
      trainingDates,
      credit,
      image,
      cv,
      portfolio,
    })

    //Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "testermailnode@gmail.com",
        pass: "xfqrchbwwqzuymyk",
      },
    })

    const mailOptions = {
      from: "testermailnode@gmail.com",
      to: email,
      subject: "Thank you for submitting the form",
      text: "We received your form submission. Thank you!",
      html: "<h3>A Tasarım Mimarlık</h3>",
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email", error)
      } else {
        console.log("Email successfully sent:", info.response)
      }
    })
    res.status(200).json(intern)
    console.log("intern created!")
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//delete an intern
async function deleteIntern(req, res) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id is not valid" })
  }

  const intern = await Intern.findOneAndDelete({ _id: id })

  if (!intern) {
    return res.status(404).json({ error: "No such intern found" })
  }

  res.status(200).json(intern)
}

//update an intern
async function updateIntern(req, res) {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id is not valid" })
  }

  const intern = await Intern.findOneAndUpdate({ _id: id }, { ...req.body })
  if (!intern) {
    return res.status(404).json({ error: "No such intern found" })
  }
  res.status(200).json(intern)
}

module.exports = {
  getInterns,
  getIntern,
  createIntern,
  deleteIntern,
  updateIntern,
}
