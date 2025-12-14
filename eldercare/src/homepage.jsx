import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="homepage">

            {/* Top Bar */}
            <header className="top-bar">
                <div className="top-bar-content">
                    <h1 className="logo">❤️ ElderCare Connect</h1>
                    <button className="btn primary" onClick={() => navigate('/signin')}>Login</button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-left">
                    <h2>Caring for Our Elders, Together</h2>
                    <p className="hero-text">
                        A comprehensive platform connecting elderly individuals with family members, volunteers, and healthcare support. Manage daily tasks, medications, emergencies, and stay connected.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn primary" onClick={() => navigate('/signup')}>Get Started</button>
                        <button className="btn secondary">Learn More</button>
                    </div>
                </div>
                <div className="hero-right">
                    <img src="/elder.jpeg" alt="ElderCare" /> {/* Fixed image path */}
                </div>
            </section>

            {/* Who Is This For */}
            <section className="audience">
                <h2>Who Is This For?</h2>
                <div className="audience-grid">
                    <div className="audience-card elders">
                        <div className="audience-header">❤️ For Elders</div>
                        <p>Daily task reminders</p>
                        <p>Medicine alerts</p>
                        <p>Large SOS button</p>
                        <p>Simple chat</p>
                    </div>
                    <div className="audience-card family">
                        <div className="audience-header">👨‍👩‍👧 For Family</div>
                        <p>Monitor health</p>
                        <p>SOS notifications</p>
                        <p>Direct communication</p>
                        <p>Coordinate care</p>
                    </div>
                </div>
            </section>

            {/* Volunteers & Administrators */}
            <section className="cards-section">
                <div className="card volunteers">
                    <div className="card-header volunteers-header">
                        👤 For Volunteers
                    </div>
                    <div className="card-body">
                        <p>💬 Communicate with elders & families</p>
                        <p>❤️ Track your volunteer impact</p>
                        <p>👤 Build meaningful connections</p>
                        <p>📞 Assist in emergencies</p>
                    </div>
                </div>

                <div className="card admins">
                    <div className="card-header admins-header">
                        👤 For Administrators
                    </div>
                    <div className="card-body">
                        <p>❤️ Analytics & reporting dashboard</p>
                        <p>👤 User management & verification</p>
                        <p>📞 Monitor emergency responses</p>
                        <p>💬 Ensure security & compliance</p>
                    </div>
                </div>
            </section>

            {/* Platform Features */}
            <section className="features">
                <h2>Platform Features</h2>
                <p className="features-text">
                    Everything you need to provide comprehensive care and support for elderly loved ones
                </p>
                <div className="feature-grid">
                    <div className="feature-card">
                        📞
                        <h3>SOS Emergency</h3>
                        <p>One-tap emergency alerts to family and services</p>
                    </div>
                    <div className="feature-card">
                        💊
                        <h3>Medicine Tracking</h3>
                        <p>Automated reminders & management</p>
                    </div>
                    <div className="feature-card">
                        💬
                        <h3>Real-Time Chat</h3>
                        <p>Stay connected instantly</p>
                    </div>
                    <div className="feature-card">
                        ❤️
                        <h3>Health Monitoring</h3>
                        <p>Track vital signs and activities</p>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="contact-form">
                <h2>Contact Us</h2>
                <form>
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Your Message" rows="5" required></textarea>
                    <button type="submit" className="btn primary">Send Message</button>
                </form>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2025 ElderCare Connect. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}
