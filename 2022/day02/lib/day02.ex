defmodule Day02 do
  @type move :: {String.t(), String.t()}

  def run do
    File.read!("./input.txt")
    |> parse_input()
    |> Enum.map(&score_game/1)
    |> Enum.sum()
  end

  @doc """
      iex> Day02.parse_input("A Y\\nB X\\nC Z\\n")
      [{"A", "Y"}, {"B", "X"}, {"C", "Z"}]
  """
  @spec parse_input(String.t()) :: [move]
  defp parse_input(str) do
    str
    |> String.split("\n", trim: true)
    |> Enum.map(fn x -> String.split(x, " ") |> List.to_tuple() end)
  end

  @spec score_game(move) :: pos_integer()
  defp score_game({"A", "X"}), do: 1 + 3
  defp score_game({"A", "Y"}), do: 2 + 6
  defp score_game({"A", "Z"}), do: 3 + 0

  defp score_game({"B", "X"}), do: 1 + 0
  defp score_game({"B", "Y"}), do: 2 + 3
  defp score_game({"B", "Z"}), do: 3 + 6

  defp score_game({"C", "X"}), do: 1 + 6
  defp score_game({"C", "Y"}), do: 2 + 0
  defp score_game({"C", "Z"}), do: 3 + 3
end
