import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { GameCard } from "../components/GameCard";
import type { Game } from "../types/game";

describe("GameCard", () => {
  const game: Game = {
    id: "1",
    genre: "Action",
    image: "",
    name: "Test",
    description: "desc",
    price: 10,
    isNew: true,
  };

  it("renders game info and New label", () => {
    render(<GameCard game={game} inCart={false} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("desc")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("shows 'Remove' when inCart is true", () => {
    render(<GameCard game={game} inCart={true} />);
    expect(screen.getByText("Remove")).toBeInTheDocument();
  });
});
