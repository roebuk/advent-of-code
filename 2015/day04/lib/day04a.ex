defmodule Day04a do
  @input "ckczppom"
  @moduledoc """
  Documentation for Day04.
  """

  @spec md5_hash(String.t()) :: String.t()
  def md5_hash(str) do
    :crypto.hash(:md5, str) |> Base.encode16()
  end

  @doc """
  Hello world.

  ## Examples

      iex> Day04a.has_five_leading_zeros("00000000")
      true

      iex> Day04a.has_five_leading_zeros("03000")
      false

  """
  @spec has_five_leading_zeros(String.t()) :: boolean
  def has_five_leading_zeros(str) do
    Regex.match?(~r/^0{5}/, str)
  end

  def calc(index) do
    str = "#{@input}#{index}"
    result = str |> md5_hash |> has_five_leading_zeros

    case result do
      true ->
        IO.puts(index)

      false ->
        calc(index + 1)
    end
  end

  def run do
    calc(0)
  end
end
