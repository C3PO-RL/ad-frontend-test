import { fetchGames } from "./api";

global.fetch = jest.fn();

describe("fetchGames", () => {
  it("calls the API with correct params and returns data", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        games: [
          {
            id: "1",
            genre: "Action",
            image: "",
            name: "Test",
            description: "",
            price: 10,
            isNew: false,
          },
        ],
        total: 1,
      }),
    });
    const result = await fetchGames({ genre: "Action", page: 2 });
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("genre=Action"));
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("page=2"));
    expect(result.games[0].name).toBe("Test");
    expect(result.total).toBe(1);
  });

  it("throws if response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(fetchGames({})).rejects.toThrow("Failed to fetch games");
  });
});
