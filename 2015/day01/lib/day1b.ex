defmodule Day1b do
  @up "("
  @down ")"

  def floor_adjuster({_, idx}, -1), do: {:halt, idx}
  def floor_adjuster({@up, idx}, acc), do: {:cont, acc + 1}
  def floor_adjuster({@down, idx}, acc), do: {:cont, acc - 1}

  def run do
    File.read!("./input.txt")
    |> String.split("", trim: true)
    |> Enum.with_index()
    |> Enum.reduce_while(0, &floor_adjuster/2)
    |> IO.inspect()
  end
end
