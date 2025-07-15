import { render, screen } from "@testing-library/react";
import { OrderSummary } from "./OrderSummary";
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

  it("renders item count, names, prices, and total", () => {
    render(<OrderSummary games={games} />);
    expect(screen.getByText("2 items")).toBeInTheDocument();
    expect(screen.getByText("Game1")).toBeInTheDocument();
    expect(screen.getByText("Game2")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
    expect(screen.getByText("$30.00")).toBeInTheDocument();
  });
});
