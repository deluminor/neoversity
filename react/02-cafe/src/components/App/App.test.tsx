import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

function getStatValue(label: string) {
  const value = screen.getByText((_, element) => {
    if (!element || element.tagName !== "STRONG") {
      return false;
    }

    const parentText = element.parentElement?.textContent ?? "";
    return parentText.startsWith(`${label}:`);
  });

  return value.textContent;
}

describe("App feedback widget", () => {
  it("shows empty state without Reset button", () => {
    render(<App />);

    expect(screen.getByText("No feedback yet")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Reset" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Live stats")).not.toBeInTheDocument();
  });

  it("increments good, neutral and bad votes independently", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Good" }));
    await user.click(screen.getByRole("button", { name: "Good" }));
    await user.click(screen.getByRole("button", { name: "Neutral" }));
    await user.click(screen.getByRole("button", { name: "Bad" }));
    await user.click(screen.getByRole("button", { name: "Bad" }));
    await user.click(screen.getByRole("button", { name: "Bad" }));

    expect(getStatValue("Good")).toBe("2");
    expect(getStatValue("Neutral")).toBe("1");
    expect(getStatValue("Bad")).toBe("3");
  });

  it("computes total votes and positive rate", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Good" }));
    await user.click(screen.getByRole("button", { name: "Good" }));
    await user.click(screen.getByRole("button", { name: "Neutral" }));
    await user.click(screen.getByRole("button", { name: "Neutral" }));
    await user.click(screen.getByRole("button", { name: "Bad" }));

    expect(getStatValue("Total")).toBe("5");
    expect(getStatValue("Positive")).toBe("40%");
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "40",
    );
  });

  it("shows Reset after first vote and clears state on Reset", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(
      screen.queryByRole("button", { name: "Reset" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Good" }));

    const resetButton = screen.getByRole("button", { name: "Reset" });
    expect(resetButton).toBeInTheDocument();
    expect(screen.getByText("Live stats")).toBeInTheDocument();
    expect(getStatValue("Good")).toBe("1");

    await user.click(resetButton);

    expect(screen.getByText("No feedback yet")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Reset" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Live stats")).not.toBeInTheDocument();
  });
});
