import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';
import Stripe from "stripe";
import { stripe } from "../../../services/stripe";
import { saveSubscription } from "../_lib/manageSubscription";

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
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.updated',
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
      try {
        switch (type) {
          case   'customer.subscription.updated':
          case   'customer.subscription.updated':
            const subscription = event.data.object as Stripe.Subscription;

            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              false,
            );

            break;
          case 'checkout.session.completed':
            
            const checkoutSession = event.data.object as Stripe.Checkout.Session;

            await saveSubscription(
                checkoutSession.subscription.toString(),
                checkoutSession.customer.toString(),
                true,
              );

            break;
          default:
            throw new Error("Unhandled event.");
        }
      } catch (err) {
        return res.json({ error: 'Webhook handler failed.' })
      }
      
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow',  'POST')
    res.status(405).end('Method not allowed')
  }
}