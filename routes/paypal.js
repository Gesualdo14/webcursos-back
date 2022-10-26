const express = require("express")
const router = express.Router()
const Sale = require("../models/sales")
const {
  createOrder,
  capturePayment,
  refundPayment,
} = require("../helpers/paypal")
const passport = require("passport")
const Notification = require("../models/notification")

router.post("/orders", passport.authenticate("jwt"), async (req, res) => {
  const { price, courseId } = req.body

  const { data, ok } = await createOrder(price)
  if (ok) {
    await Sale.create({
      course: courseId,
      user: req.user._id,
      price,
      order_id: data.id,
      order_status: data.status,
    })
    res.json(data)
  } else {
    console.log({ error: data })
    res
      .status(400)
      .json({ ok: false, message: "Hubo un error al crear la orden de pago" })
  }
})

router.post(
  "/orders/:orderID/capture",
  passport.authenticate("jwt"),
  async (req, res) => {
    const { orderID } = req.params

    const { data, ok } = await capturePayment(orderID)

    if (ok) {
      const capture_id = data.purchase_units[0].payments.captures[0].id
      await Sale.findOneAndUpdate(
        { order_id: orderID },
        {
          order_status: "COMPLETED",
          capture_id,
          payer: data.payer,
        }
      )
      // TODO: store payment information such as the transaction ID
      res.status(200).json(capture_id)
    } else {
      res
        .status(400)
        .json({ ok: false, message: "Hubo un error al realizar el pago" })
    }
  }
)

router.post(
  "/captures/:captureID/refund",
  passport.authenticate("jwt"),
  async (req, res) => {
    const { captureID } = req.params
    try {
      await refundPayment(captureID)
      // console.log({ refundData })
      await Sale.findOneAndUpdate(
        { capture_id: captureID },
        {
          order_status: "REFUNDED",
        }
      )
      // TODO: store payment information such as the transaction ID
      res.json({
        ok: true,
        message:
          "Pago devuelto con éxito! Lamento que el curso no haya cumplido tus expectativas 🙁",
      })
    } catch (err) {
      res.json({
        ok: false,
        message:
          "Hubo un error al devolver tu pago, por favor intenta más tarde",
      })
    }
  }
)

router.post("/webhook", async (req, res) => {
  res.status(200).send()

  console.log("NOTIFICACION RECIBIDA")

  if (req.body.event_type === "PAYMENT.CAPTURE.COMPLETED") {
    const resource = req.body.resource
    const order_id = resource.supplementary_data.related_ids.order_id
    await Sale.findOneAndUpdate(
      { order_id },
      {
        webhookReceived: true,
        order_status: "COMPLETED",
        paypal_links: resource.links,
      }
    )
  }

  await Notification.create({
    params: req.params,
    body: req.body,
    query: req.query,
  })
})

module.exports = router
