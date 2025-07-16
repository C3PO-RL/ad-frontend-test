import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { OrderSummary } from "../components/OrderSummary";
import type { Game } from "../types/game";

describe("OrderSummary", () => {
  const games: Game[] = [
    {
      id: "1",
      genre: "Action",
      image: "",
      name: "Game1",
      description: "",
      price: 10,
      isNew: false,
    },
    {
      id: "2",
      genre: "RPG",
      image: "",
      name: "Game2",
      description: "",
      price: 20,
      isNew: true,
    },
  ];

  it("renders order summary title, item count, names, prices, and total", () => {
    render(<OrderSummary games={games} />);
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getByText("2 items")).toBeInTheDocument();
    expect(screen.getByText("Game1")).toBeInTheDocument();
    expect(screen.getByText("Game2")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
    expect(screen.getByText("Order Total")).toBeInTheDocument();
    expect(screen.getByText("$30.00")).toBeInTheDocument();
  });

  it("renders singular item label for one item", () => {
    render(<OrderSummary games={[games[0]]} />);
    expect(screen.getByText("1 item")).toBeInTheDocument();
  });
});
