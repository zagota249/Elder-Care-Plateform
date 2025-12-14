import React, { useState } from "react";
import Card from "./card";
import "./elder.css";


const sampleMedicines = [
  { id: 1, name: "Metformin", dose: "500mg • Twice daily", status: "taken" },
  { id: 2, name: "Lisinopril", dose: "10mg • Once daily", status: "pending" },
  { id: 3, name: "Aspirin", dose: "81mg • Once daily", status: "missed" },
];

const Home = () => {
  const [medicines, setMedicines] = useState(sampleMedicines);

  const markAsTaken = (id) => {
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, status: "taken" } : m)));
  };

  return (
    <main className="main-content">
      <div className="top-bar">
        <div>
          <h2>Hello, Margaret!</h2>
          <div className="sub">Sunday, November 23, 2025</div>
        </div>
        <div className="search">Search...</div>
      </div>

      <div className="grid">
        <Card title="Health Overview">
          <div className="row-between">
            <span>Status</span>
            <span className="badge badge-green">Good</span>
          </div>
          <div className="row-between">
            <span>Emergency Contact</span>
            <span>John Doe</span>
          </div>
        </Card>

        <Card title="Voice Assistant">
          <div className="voice-center">
            <img
              src="/mnt/data/0cc31bac-a798-48fa-a6f6-a6d28de76a77.png"
              alt="mic"
              style={{ width: 50 }}
            />
            <p>Tap to use voice commands</p>
            <button className="btn-primary">Speak</button>
          </div>
        </Card>

        <Card title="Today's Medicines">
          {medicines.map((m) => (
            <div className="medicine-item" key={m.id}>
              <div>
                <h4>{m.name}</h4>
                <p className="muted">{m.dose}</p>
              </div>

              <div style={{ textAlign: "right" }}>
                <span
                  className={
                    m.status === "taken"
                      ? "badge badge-green"
                      : m.status === "missed"
                      ? "badge badge-red"
                      : "badge badge-yellow"
                  }
                >
                  {m.status}
                </span>

                {/* Example action for frontend-only demo */}
                {m.status !== "taken" && (
                  <button
                    className="link-btn"
                    onClick={() => markAsTaken(m.id)}
                    style={{ display: "block", marginTop: 8 }}
                  >
                    Mark as Taken
                  </button>
                )}
              </div>
            </div>
          ))}
        </Card>

        <Card title="Today's Tasks">
          <div className="task-item">
            <div>
              <h4>Doctor Appointment</h4>
              <p className="muted">Regular checkup with Dr. Smith</p>
            </div>
            <span className="priority high">High</span>
          </div>

          <div className="task-item">
            <div>
              <h4>Grocery Shopping</h4>
              <p className="muted">Weekly grocery shopping</p>
            </div>
            <span className="priority medium">Medium</span>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default Home;