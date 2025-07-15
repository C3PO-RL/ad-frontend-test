import { render, screen, fireEvent } from "@testing-library/react";
import { GameCard } from "./GameCard";
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
    render(
      <GameCard
        game={game}
        inCart={false}
        onAddToCart={jest.fn()}
        onRemoveFromCart={jest.fn()}
      />
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("desc")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("calls onAddToCart when button clicked and not in cart", () => {
    const onAdd = jest.fn();
    render(
      <GameCard
        game={game}
        inCart={false}
        onAddToCart={onAdd}
        onRemoveFromCart={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText("Add to Cart"));
    expect(onAdd).toHaveBeenCalledWith(game);
  });

  it("calls onRemoveFromCart when button clicked and in cart", () => {
    const onRemove = jest.fn();
    render(
      <GameCard
        game={game}
        inCart={true}
        onAddToCart={jest.fn()}
        onRemoveFromCart={onRemove}
      />
    );
    fireEvent.click(screen.getByText("Remove"));
    expect(onRemove).toHaveBeenCalledWith(game.id);
  });
});
