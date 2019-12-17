defmodule Day1a do
  @up "("
  @down ")"

  def floor_adjuster(@up, acc), do: acc + 1
  def floor_adjuster(@down, acc), do: acc - 1

  def run do
    File.read!("./input.txt")
    |> String.split("", trim: true)
    |> Enum.reduce(0, &floor_adjuster/2)
    |> IO.inspect()
  end
end
