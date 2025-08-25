import { Modal } from "./Modal";
import { render, screen } from "@testing-library/react";

describe("Modal", () => {
  it("should render the children", () => {
    const expectedText = "Message";
    render(<Modal isOpen={true} onOpenChange={jest.fn()}>{<p>{expectedText}</p>}</Modal>);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
