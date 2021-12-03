defmodule Day01b do
  defstruct last: [], total: 0

  def new() do
    %__MODULE__{}
  end

  def incrementer(current_list, acc) do
    current_list_sum = Enum.sum(current_list)
    last_list_sum = Enum.sum(acc.last)

    inc =
      cond do
        current_list_sum > last_list_sum and last_list_sum > 0 ->
          1
        true ->
          0
      end

    acc
    |> Map.put(:total, acc.total + inc)
    |> Map.put(:last, current_list)
  end


  def run do
    File.read!("./input.txt")
    |> String.split("\n", trim: true)
    |> Enum.map(&String.to_integer/1)
    |> solution
  end

  @spec solution(list(non_neg_integer())) :: non_neg_integer()
  def solution(list) do
    list
    |> Enum.chunk_every(3, 1)
    |> Enum.reduce(new(), &incrementer/2)
    |> Map.get(:total)
  end
end
