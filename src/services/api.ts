import type { Game } from "../types/game";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface FetchGamesParams {
  genre?: string;
  page?: number;
}

export interface FetchGamesResponse {
  games: Game[];
  total: number;
}

export async function fetchGames({
  genre,
  page = 1,
}: FetchGamesParams = {}): Promise<FetchGamesResponse> {
  const params = new URLSearchParams();
  if (genre) params.append("genre", genre);
  params.append("page", String(page));

  const res = await fetch(`${API_URL}/games?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
}
