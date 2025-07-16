"use server";

import { allGames, availableFilters, delay } from "@/utils/endpoint";

const ITEMS_PER_PAGE = 12;

export interface FetchGamesParams {
  genre?: string;
  page?: number;
}

export interface FetchGamesResponse {
  games: any[];
  total: number;
  availableFilters: any;
  totalPages: number;
  currentPage: number;
}

export async function fetchGames({
  genre,
  page = 1,
}: FetchGamesParams = {}): Promise<FetchGamesResponse> {
  let games = allGames;

  if (genre) {
    games = games.filter(
      (game) => game.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  const filteredTotal = games.length;

  if (page < 1 || isNaN(page)) page = 1;

  // Mock a delay to simulate a real API
  await delay(2000);

  // Return all games up to the current page (accumulated)
  const toIndex = page * ITEMS_PER_PAGE;
  games = games.slice(0, toIndex);

  const totalPages = Math.ceil(filteredTotal / ITEMS_PER_PAGE);
  const currentPage = page;

  return {
    games,
    total: filteredTotal,
    availableFilters,
    totalPages,
    currentPage,
  };
}
