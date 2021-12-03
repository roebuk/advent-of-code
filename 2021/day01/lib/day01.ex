defmodule Day01 do


  defstruct last: nil, total: 0

  @type accu :: %{
    last: integer(),
    total: integer()
  }

  @spec new :: %Day01{last: nil, total: 0}
  def new() do
    %Day01{}
  end

  @spec incrementer(integer(), accu) :: accu
  def incrementer(current_number, acc) when is_integer(current_number) do
    inc = cond do
      current_number > acc.last ->
        1
      true ->
        0
    end

    acc
    |> Map.put(:total, acc.total + inc)
    |> Map.put(:last, current_number)
  end


  @moduledoc """
  Documentation for `Day01`.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Day01.hello()
      :world

  """
  def run do
    File.read!("./input.txt")
    |> String.split("\n", trim: true)
    |> Enum.map(&String.to_integer/1)
    |> Enum.chunk_every(3, 1, :discard)
    # |> Enum.reduce(new(), &incrementer/2)
    |> IO.inspect()
  end
end
