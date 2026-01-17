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
                    <div className="logo">
                        <span className="logo-icon">❤️</span>
                        <span className="logo-text">ElderCare Connect</span>
                    </div>
                    <button className="btn-signin" onClick={() => navigate('/signin')}>Sign In</button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-image-container">
                    <img src="/elder.jpeg" alt="ElderCare" className="hero-bg-image" />
                </div>
                <div className="hero-content">
                    <h2>Caring for Our Elders, <span className="highlight">Together</span></h2>
                    <p className="hero-text">
                        A comprehensive platform connecting elderly individuals with family members, volunteers, and healthcare support. Manage daily tasks, medications, emergencies, and stay connected.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn primary glow" onClick={() => navigate('/signup')}>Get Started</button>
                        <button className="btn secondary" onClick={() => document.querySelector('.audience').scrollIntoView({ behavior: 'smooth' })}>Learn More</button>
                    </div>
                </div>
            </section>

            {/* Who Is This For */}
            <section className="audience">
                <h2 className="section-title">Who Is This For?</h2>
                <div className="audience-grid">
                    <div className="audience-card elders">
                        <div className="card-icon">👴</div>
                        <div className="audience-header">For Elders</div>
                        <ul className="feature-list">
                            <li>✓ Daily task reminders</li>
                            <li>✓ Medicine alerts</li>
                            <li>✓ Large SOS button</li>
                            <li>✓ Simple chat</li>
                        </ul>
                    </div>
                    <div className="audience-card family">
                        <div className="card-icon">👨‍👩‍👧</div>
                        <div className="audience-header">For Family</div>
                        <ul className="feature-list">
                            <li>✓ Monitor health</li>
                            <li>✓ SOS notifications</li>
                            <li>✓ Direct communication</li>
                            <li>✓ Coordinate care</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Volunteers & Administrators */}
            <section className="cards-section">
                <div className="card volunteers">
                    <div className="card-header volunteers-header">
                        <span className="header-icon">🤝</span>
                        For Volunteers
                    </div>
                    <div className="card-body">
                        <p><span className="bullet">💬</span> Communicate with elders & families</p>
                        <p><span className="bullet">❤️</span> Track your volunteer impact</p>
                        <p><span className="bullet">👤</span> Build meaningful connections</p>
                        <p><span className="bullet">📞</span> Assist in emergencies</p>
                    </div>
                </div>

                <div className="card admins">
                    <div className="card-header admins-header">
                        <span className="header-icon">⚙️</span>
                        For Administrators
                    </div>
                    <div className="card-body">
                        <p><span className="bullet">📊</span> Analytics & reporting dashboard</p>
                        <p><span className="bullet">👤</span> User management & verification</p>
                        <p><span className="bullet">🚨</span> Monitor emergency responses</p>
                        <p><span className="bullet">🔒</span> Ensure security & compliance</p>
                    </div>
                </div>
            </section>

            {/* Platform Features */}
            <section className="features">
                <h2 className="section-title">Platform Features</h2>
                <p className="features-text">
                    Everything you need to provide comprehensive care and support for elderly loved ones
                </p>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🚨</div>
                        <h3>SOS Emergency</h3>
                        <p>One-tap emergency alerts to family and services</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💊</div>
                        <h3>Medicine Tracking</h3>
                        <p>Automated reminders & management</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💬</div>
                        <h3>Real-Time Chat</h3>
                        <p>Stay connected instantly</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">❤️</div>
                        <h3>Health Monitoring</h3>
                        <p>Track vital signs and activities</p>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="contact-form">
                <h2 className="section-title">Contact Us</h2>
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
                    <p>© 2026 ElderCare Connect. All rights reserved.</p>
                    <div className="footer-links">
                        <button onClick={() => alert("Privacy Policy page coming soon!")}>Privacy Policy</button>
                        <span className="divider">|</span>
                        <button onClick={() => alert("Terms of Service page coming soon!")}>Terms of Service</button>
                    </div>
                </div>
            </footer>

        </div>
    );
}
