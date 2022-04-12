import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';
import Stripe from "stripe";
import { stripe } from "../../../services/stripe";

const buffer = async (redeable: Readable) => {
  const chunks = [];

  for await (const chunk of redeable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }

  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false
  }
}

const releventEvents = new Set([
  'checkout.session.completed'
])

export const webhooks = async (req:NextApiRequest, res:NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const secret = req.headers['stripe-signature']

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`)
    }
  
    const { type } = event;

    if (releventEvents.has(type)) {
      console.log('Evento recebido', event)
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow',  'POST')
    res.status(405).end('Method not allowed')
  }
}