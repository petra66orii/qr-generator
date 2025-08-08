import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../src/app/page";

describe("HomePage", () => {
  it("renders the heading", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { name: /welcome to qrflow/i });
    expect(heading).toBeInTheDocument();
  });
});
