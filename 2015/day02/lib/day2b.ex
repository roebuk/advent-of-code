defmodule Day02b do
  @doc """
  ## Examples

    iex> Day02b.parse_line("10x15x23")
    [10, 15, 23]

    iex> Day02b.parse_line("11x11x10")
    [11, 11, 10]
  """
  @spec parse_line(String.t()) :: [integer]
  def parse_line(str) do
    str
    |> String.split("x", trim: true)
    |> Enum.map(&String.to_integer/1)
  end

  @doc """
  ## Examples

    iex> Day02b.calc_ribbon([2, 3, 4])
    10

    iex> Day02b.calc_ribbon([1, 1, 10])
    43

  """
  def calc_ribbon(sides) do
    [fst, snd, thrd] = sides

    side_ribbon =
      sides
      |> Enum.sort()
      |> Enum.take(2)
      |> Enum.map(&(&1 + &1))
      |> Enum.sum()

    bow_ribbon = fst * snd * thrd

    side_ribbon + bow_ribbon
  end

  def run do
    File.read!("./input.txt")
    |> String.split("\n", trim: true)
    |> Enum.map(&parse_line/1)
    |> Enum.map(&calc_ribbon/1)
    |> Enum.sum()
  end
end
