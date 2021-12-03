defmodule Day03 do
  def run do
    File.read!("./input.txt")
    |> String.split("\n", trim: true)
    |> solution
  end

  def find_most_common_bit(bit_list) do
    bit_list
    |> Enum.count(fn x -> x == "1" end)
  end

  def solution(lines) do
    lines
    |> Enum.map(&String.graphemes/1)
    |> Enum.zip()
    |> Enum.map(&Tuple.to_list/1)
    |> Enum.map(&find_most_common_bit/1)
  end
end
