import { Fallback } from "./Fallback";
import { render, screen } from "@testing-library/react";

describe("Fallback", () => {
  it("should render the text", () => {
    const text = "Loading...";
    render(<Fallback text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
