import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleInterestChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((interest) => interest !== value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let message = `Thank you, ${name}! You have successfully subscribed with the email: ${email}.`;
    if (interests.length > 0) {
      message += ` Your interests are: ${interests.join(', ')}.`;
    }
    setSubmissionMessage(message);
    setName('');
    setEmail('');
    setInterests([]);
  };

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <section>
        <h2>Subscribe to our Newsletter</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label>Interests:</label>
            <div>
              <div>
                <input
                  type="checkbox"
                  id="coding"
                  name="interests"
                  value="Coding"
                  checked={interests.includes('Coding')}
                  onChange={handleInterestChange}
                />
                <label htmlFor="coding">Coding</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="design"
                  name="interests"
                  value="Design"
                  checked={interests.includes('Design')}
                  onChange={handleInterestChange}
                />
                <label htmlFor="design">Design</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="marketing"
                  name="interests"
                  value="Marketing"
                  checked={interests.includes('Marketing')}
                  onChange={handleInterestChange}
                />
                <label htmlFor="marketing">Marketing</label>
              </div>
            </div>
          </div>
          <button type="submit">Subscribe</button>
        </form>
        {submissionMessage && <p>{submissionMessage}</p>}
      </section>
    </main>
  );
}

export default App;