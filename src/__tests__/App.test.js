import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
describe('Newsletter Signup Form', () => {
  test("the form includes text inputs for name and email address", () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test("the form includes three checkboxes to select areas of interest", () => {
    render(<App />);
    expect(screen.getByLabelText(/coding/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/design/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/marketing/i)).toBeInTheDocument();
  });

  test("the checkboxes are initially unchecked", () => {
    render(<App />);
    const codingCheckbox = screen.getByLabelText(/coding/i);
    const designCheckbox = screen.getByLabelText(/design/i);
    const marketingCheckbox = screen.getByLabelText(/marketing/i);
    expect(codingCheckbox).not.toBeChecked();
    expect(designCheckbox).not.toBeChecked();
    expect(marketingCheckbox).not.toBeChecked();
  });

  // Newsletter Form - Adding Responses
  test("the page shows information the user types into the name and email address form fields", async () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    await userEvent.type(nameInput, 'John Doe');
    expect(nameInput).toHaveValue('John Doe');

    await userEvent.type(emailInput, 'john.doe@example.com');
    expect(emailInput).toHaveValue('john.doe@example.com');
  });

  test("checked status of checkboxes changes when user clicks them", async () => {
    render(<App />);
    const codingCheckbox = screen.getByLabelText(/coding/i);
    const designCheckbox = screen.getByLabelText(/design/i);

    await userEvent.click(codingCheckbox);
    expect(codingCheckbox).toBeChecked();

    await userEvent.click(codingCheckbox);
    expect(codingCheckbox).not.toBeChecked();

    await userEvent.click(designCheckbox);
    expect(designCheckbox).toBeChecked();
  });

  test("a message is displayed when the user clicks the Submit button", async () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });

    await userEvent.type(nameInput, 'Jane Doe');
    await userEvent.type(emailInput, 'jane.doe@example.com');
    await userEvent.click(submitButton);

    expect(screen.getByText(/thank you, jane doe!/i)).toBeInTheDocument();
    expect(screen.getByText(/you have successfully subscribed with the email: jane.doe@example.com/i)).toBeInTheDocument();
  });
});