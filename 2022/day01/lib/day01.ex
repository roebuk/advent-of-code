defmodule Day01 do

  def run do
    file = File.read!("./input.txt")


    file |> solution(1) |> IO.inspect()
    file |> solution(3) |> IO.inspect()
  end

  @doc """
      iex> Day01.parse_line("1000")
      1000

      iex> Day01.parse_line("1000\\n2000\\n3000")
      6000

      iex> Day01.parse_line("10000\\n")
      10000
  """
  @spec parse_line(String.t()) :: pos_integer()
  def parse_line(line) do
    line
    |> String.split("\n", trim: true)
    |> Enum.map(&String.to_integer/1)
    |> Enum.sum
  end

  @doc """
      iex> Day01.solution("1000\\n\\n2000\\n2000\\n\\n3000", 1)
      4000

      iex> Day01.solution("1000\\n\\n2000\\n2000\\n\\n3000", 2)
      7000
  """
  @spec solution(String.t(), pos_integer()) :: pos_integer()
  def solution(input, amount) do
    input
    |> String.split("\n\n", trim: true)
    |> Enum.map(&parse_line/1)
    |> Enum.sort(:desc)
    |> Enum.take(amount)
    |> Enum.sum
  end
end
