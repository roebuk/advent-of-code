defmodule Day13 do
  # @type cart(%{
  #         position: {integer, integer},
  #         direction: t.string
  #       })

  @moduledoc """
  Documentation for Day13.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Day13.parse_input("/-------\n\\-------/")
      ["/-------", "\\-------/"]
  """
  def parse_input() do
    "input.txt"
    |> Path.expand()
    |> File.read!()
    |> String.split("\n")
  end

  def parse_line(line) do
    case char do
      ->
  end
end
