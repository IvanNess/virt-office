// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default async (req, res) => {
    res.statusCode = 200
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'p24'],
        line_items: [
          {
            price: 'price_1IKLYEBhtsW91uv7VQeUHpHd',
            quantity: 1
          },
        ],
        mode: 'payment',
        success_url: `${process.env.ORIGIN}/konto/pakiet`,
        cancel_url: `${process.env.ORIGIN}/konto/pakiet`,
    })
    // res.json({ id: session.id });
    res.json({ session });
}