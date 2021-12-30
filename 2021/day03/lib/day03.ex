defmodule Day03 do
  def run do
    File.read!("./input.txt")
    |> String.split("\n", trim: true)
    |> solution
  end

  def freq_to_most_seen(m) do
    zeros = Map.get(m, "0", 0)
    ones = Map.get(m, "1", 0)

    zeros > ones && 0 || 1
  end

  def binary_list_to_int(blist) do
    blist |> Enum.join("") |> Integer.parse(2) |> elem(0)
  end

  def flip_list(list) do
    list |> Enum.map(fn x -> x == 1 && 0 || 1 end)
  end

  def take_list_convert(list) do
    flipped = flip_list(list)
    [binary_list_to_int(list), binary_list_to_int(flipped)]
  end


  @spec solution(list(String.t())) :: number
  def solution(lines) do
    lines
    |> Enum.map(&String.graphemes/1)
    |> Enum.zip()
    |> Enum.map(&Tuple.to_list/1)
    |> Enum.map(&Enum.frequencies/1)
    |> Enum.map(&freq_to_most_seen/1)
    |> take_list_convert
    |> Enum.product()
  end
end
