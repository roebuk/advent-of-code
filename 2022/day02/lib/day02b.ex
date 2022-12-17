defmodule Day02b do
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
  def parse_input(str) do
    str
    |> String.split("\n", trim: true)
    |> Enum.map(fn x -> String.split(x, " ") |> List.to_tuple() end)
  end

  # X means you need to lose
  # Y means you need a draw
  # Z means you need to win
  # too low 13140

  @spec score_game(move) :: pos_integer()
  defp score_game({"A", "X"}), do: 0 + 3
  defp score_game({"A", "Y"}), do: 3 + 1
  defp score_game({"A", "Z"}), do: 6 + 2

  defp score_game({"B", "X"}), do: 0 + 1
  defp score_game({"B", "Y"}), do: 3 + 2
  defp score_game({"B", "Z"}), do: 6 + 3

  defp score_game({"C", "X"}), do: 0 + 2
  defp score_game({"C", "Y"}), do: 3 + 3
  defp score_game({"C", "Z"}), do: 6 + 1
end
