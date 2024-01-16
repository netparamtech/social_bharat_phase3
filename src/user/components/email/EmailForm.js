import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const EmailForm = () => {
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Assuming you have a server-side endpoint to handle email sending
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            if (response.ok) {
                console.log('Email sent successfully!');
                // You can handle success feedback here
            } else {
                console.error('Error sending email');
                // You can handle error feedback here
            }
        } catch (error) {
            console.error('Error sending email', error);
            // You can handle error feedback here
        }
    };

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTo">
                        <Form.Label>To:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="to"
                            value={emailData.to}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formSubject">
                        <Form.Label>Subject:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter subject"
                            name="subject"
                            value={emailData.subject}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formMessage">
                        <Form.Label>Message:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter your message"
                            name="message"
                            value={emailData.message}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button className='mt-2 rounded' type="submit">
                        Send Email
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default EmailForm;
