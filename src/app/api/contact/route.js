import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { name, email, phone, message } = await req.json();

        const botToken = process.env.TBOT_TOKEN;
        const chatId = process.env.TCHAT_ID;

        if (!botToken || !chatId) {
            return NextResponse.json(
                { error: 'Telegram bot token or chat ID is missing in environment variables.' },
                { status: 500 }
            );
        }

        const text = `
📩 New Contact Form Submission

👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}
📝 Message:
${message}
    `.trim();

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML',
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Telegram API Error:', errorData);
            return NextResponse.json(
                { error: 'Failed to send message to Telegram.' },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Error handling contact form submission:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
