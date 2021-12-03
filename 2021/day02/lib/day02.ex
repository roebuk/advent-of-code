defmodule Day02 do
  @enforce_keys [:direction, :amount]
  defstruct direction: nil, amount: 0

  @spec new(String.t()) :: %__MODULE__{}
  def new(string) do
    [dir, amount]
      = string
      |> String.split(" ", trim: true)

    %__MODULE__{
      direction: dir,
      amount: String.to_integer(amount)
    }
  end


  def move(instruction, acc) do
    case instruction.direction do
      "forward" ->
        Map.update!(acc, :x, fn curr -> curr + instruction.amount end)

      "down" ->
        Map.update!(acc, :y, fn curr -> curr + instruction.amount end)

      "up" ->
         Map.update!(acc, :y, fn curr -> curr - instruction.amount end)

      _ ->
        acc
    end

  end

  def move_with_aim(instruction, acc) do
    case instruction.direction do
      "forward" ->
        %{
          x: acc.x + instruction.amount,
          y: acc.y + acc.aim * instruction.amount,
          aim: acc.aim
        }

      "down" ->
        Map.update!(acc, :aim, fn curr -> curr + instruction.amount end)

      "up" ->
        Map.update!(acc, :aim, fn curr -> curr - instruction.amount end)
    end
  end

  def run do
    File.read!("./input.txt")
    |> String.split("\n", trim: true)
    |> solutionB
  end

  def solution(lines) do
    lines
    |> Enum.map(&new/1)
    |> Enum.reduce(%{x: 0, y: 0}, &move/2)
    |> (fn map -> map.x * map.y end).()
  end

  def solutionB(lines) do
    lines
    |> Enum.map(&new/1)
    |> Enum.reduce(%{x: 0, y: 0, aim: 0}, &move_with_aim/2)
    |> (fn map -> map.x * map.y end).()
  end
end
