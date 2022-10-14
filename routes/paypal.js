const express = require("express")
const router = express.Router()
const Sale = require("../models/sales")
const { createOrder, capturePayment } = require("../helpers/paypal")
const passport = require("passport")

router.post("/orders", passport.authenticate("jwt"), async (req, res) => {
  const { price, courseId } = req.body
  const order = await createOrder()
  console.log({ order, user: req.user })
  const createdSale = await Sale.create({
    course: courseId,
    user: req.user._id,
    price,
    order_id: order.id,
    order_status: order.status,
  })
  res.json(order)
})

router.post("/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params
  const captureData = await capturePayment(orderID)
  console.log({ links: captureData.links })
  await Sale.findOneAndUpdate(
    { order_id: orderID },
    { order_status: "COMPLETED", payer: captureData.payer }
  )
  // TODO: store payment information such as the transaction ID
  res.json(captureData)
})

module.exports = router