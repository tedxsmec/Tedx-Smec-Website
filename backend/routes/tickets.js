const express = require("express");
const Ticket = require("../models/Ticket");

const router = express.Router();

// GET TICKET STATUS
router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).lean();
    if (!ticket) return res.status(404).json({ error: "Not found" });

    res.json({ ok: true, ticket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
