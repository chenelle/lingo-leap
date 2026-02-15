/**
 * Vercel Serverless Function - Sender.net Subscription API
 * 
 * This endpoint handles quiz email submissions by:
 * 1. Adding the subscriber to Sender.net
 * 2. Storing custom quiz data (score, band level)
 * 3. Triggering the automated results email campaign
 */

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
            message: 'This endpoint only accepts POST requests'
        });
    }

    // Extract data from request body
    const { email, score, bandLevel } = req.body;

    // Validate required fields
    if (!email || score === undefined || !bandLevel) {
        return res.status(400).json({
            error: 'Missing required fields',
            message: 'Email, score, and bandLevel are required'
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: 'Invalid email format',
            message: 'Please provide a valid email address'
        });
    }

    try {
        // Step 1: Add subscriber to Sender.net
        const subscriberResponse = await fetch('https://api.sender.net/v2/subscribers', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.SENDER_API_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                groups: [process.env.SENDER_GROUP_ID],
                fields: {
                    quiz_score: score.toString(),
                    band_level: bandLevel.toString(),
                    quiz_date: new Date().toISOString()
                }
            })
        });

        // Handle Sender.net API errors
        if (!subscriberResponse.ok) {
            const errorData = await subscriberResponse.json();
            console.error('Sender.net subscriber error:', errorData);

            // Check if subscriber already exists (not an error)
            if (subscriberResponse.status === 409 || errorData.message?.includes('already exists')) {
                console.log('Subscriber already exists, continuing...');
            } else {
                return res.status(subscriberResponse.status).json({
                    error: 'Failed to add subscriber',
                    message: errorData.message || 'Could not add subscriber to email list'
                });
            }
        }

        const subscriberData = await subscriberResponse.json();
        console.log('Subscriber added:', subscriberData);

        // Step 2: Trigger automated email campaign
        const campaignResponse = await fetch('https://api.sender.net/v2/campaigns/trigger', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.SENDER_API_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                campaign_id: process.env.SENDER_RESULTS_CAMPAIGN_ID,
                personalization: {
                    band_score: bandLevel.toString(),
                    quiz_score: `${score}/5`,
                    target_band: (parseFloat(bandLevel) + 1.0).toFixed(1) // Suggest next band level
                }
            })
        });

        if (!campaignResponse.ok) {
            const errorData = await campaignResponse.json();
            console.error('Sender.net campaign error:', errorData);

            // Don't fail the whole request if campaign trigger fails
            // User still gets added to list
            console.warn('Campaign trigger failed, but subscriber was added');
        } else {
            const campaignData = await campaignResponse.json();
            console.log('Campaign triggered:', campaignData);
        }

        // Step 3: Return success response
        return res.status(200).json({
            success: true,
            message: 'Quiz results will be sent to your email',
            data: {
                email,
                score,
                bandLevel
            }
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'An unexpected error occurred. Please try again.'
        });
    }
}
