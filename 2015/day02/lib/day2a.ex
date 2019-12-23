defmodule Day02a do
  @doc """
  ## Examples

    iex> Day02a.parse_line("10x15x23")
    [10, 15, 23]

    iex> Day02a.parse_line("11x11x10")
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

    iex> Day02a.calc_dimensions([3, 2, 4])
    58

    iex> Day02a.calc_dimensions([1, 1, 10])
    43

  """
  def calc_dimensions([l, w, h]) do
    side_one = l * w
    side_two = w * h
    side_three = h * l
    smallest_side = Enum.min([side_one, side_two, side_three])

    side_one * 2 + side_two * 2 + side_three * 2 + smallest_side
  end

  def run do
    File.read!("./input.txt")
    |> String.split("\n", trim: true)
    |> Enum.map(&parse_line/1)
    |> Enum.map(&calc_dimensions/1)
    |> Enum.sum()
  end
end
