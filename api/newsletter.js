/**
 * Vercel Serverless Function - General Newsletter Subscription
 * 
 * This endpoint handles general newsletter signups from the footer
 * and the 75% scroll popup.
 */

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
            message: 'This endpoint only accepts POST requests'
        });
    }

    const { email, name } = req.body;

    if (!email) {
        return res.status(400).json({
            error: 'Missing required fields',
            message: 'Email is required'
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: 'Invalid email format',
            message: 'Please provide a valid email address'
        });
    }

    try {
        const subscriberResponse = await fetch('https://api.sender.net/v2/subscribers', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.SENDER_API_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                firstname: name || '',
                groups: [process.env.SENDER_NEWSLETTER_GROUP_ID], // Separate group for landing page / popup signups
                fields: {
                    signup_source: 'newsletter_form',
                    signup_date: new Date().toISOString()
                }
            })
        });

        if (!subscriberResponse.ok) {
            const errorData = await subscriberResponse.json();
            console.error('Sender.net subscriber error:', errorData);

            if (subscriberResponse.status === 409 || errorData.message?.includes('already exists')) {
                console.log('Subscriber already exists, tracking as success...');
            } else {
                return res.status(subscriberResponse.status).json({
                    error: 'Failed to add subscriber',
                    message: errorData.message || 'Could not add subscriber to email list'
                });
            }
        }

        // Successfully added (or already existed)
        return res.status(200).json({
            success: true,
            message: 'Successfully subscribed to the newsletter!',
            data: { email }
        });

    } catch (error) {
        console.error('Newsletter Server error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'An unexpected error occurred. Please try again.'
        });
    }
}
