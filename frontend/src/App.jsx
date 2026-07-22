import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5001/api/applications";

function App() {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setApplications(data);
      } catch {
        setMessage("Could not connect to the backend.");
      }
    };

    loadApplications();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newApplication = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newApplication),
      });

      const savedApplication = await response.json();

      if (!response.ok) {
        setMessage(savedApplication.message || "Could not save application.");
        return;
      }

      setApplications((currentApplications) => [
        savedApplication,
        ...currentApplications,
      ]);
      setMessage("Application saved successfully!");
      event.target.reset();
    } catch {
      setMessage("Could not connect to the backend.");
    }
  };

  const interviews = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const offers = applications.filter(
    (application) => application.status === "Offered"
  ).length;

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">INTERNSHIP APPLICATION TRACKER</p>
          <h1>InternTrack</h1>
          <p>Manage your internship applications in one place.</p>
        </div>
      </header>

      <section className="form-section">
        <h2>Add an application</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Company name
            <input name="company" placeholder="Example: Virtusa" required />
          </label>

          <label>
            Position
            <input
              name="position"
              placeholder="Example: Software Engineering Intern"
              required
            />
          </label>

          <label>
            Status
            <select name="status" defaultValue="Applied">
              <option>Applied</option>
              <option>Interview</option>
              <option>Rejected</option>
              <option>Offered</option>
            </select>
          </label>

          <label>
            Location
            <input name="location" placeholder="Example: Colombo / Remote" />
          </label>

          <label className="full-width">
            Job link
            <input name="jobLink" placeholder="https://..." />
          </label>

          <label className="full-width">
            Notes
            <textarea
              name="notes"
              placeholder="Add interview dates or important notes."
            />
          </label>

          <button type="submit">Save application</button>
        </form>

        {message && <p className="message">{message}</p>}
      </section>

      <section className="stats">
        <article>
          <span>Total applications</span>
          <strong>{applications.length}</strong>
        </article>
        <article>
          <span>Interviews</span>
          <strong>{interviews}</strong>
        </article>
        <article>
          <span>Offers</span>
          <strong>{offers}</strong>
        </article>
      </section>

      <section className="applications-section">
        <h2>Your applications</h2>

        {applications.length === 0 ? (
          <p>No applications saved yet.</p>
        ) : (
          <div className="application-list">
            {applications.map((application) => (
              <article className="application-card" key={application._id}>
                <div>
                  <h3>{application.company}</h3>
                  <p>{application.position}</p>
                </div>
                <span className="status">{application.status}</span>
                <p>{application.location || "Location not added"}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;