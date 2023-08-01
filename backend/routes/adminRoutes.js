const express = require("express")

const {
  getInterns,
  getIntern,
  deleteIntern,
  updateIntern,
} = require("../controllers/internController")

const router = express.Router()

router.get("/", getInterns)

router.get("/:id", getIntern)

router.delete("/:id", deleteIntern)

router.patch("/:id", updateIntern)

module.exports = router
