defmodule Day05 do
  @moduledoc """
  Documentation for Day05.
  """

  @doc """
      iex> Day05.contains_bad_string("")
      false

      iex> Day05.contains_bad_string("asdfghjk")
      false

      iex> Day05.contains_bad_string("ascdfghjk")
      true
  """
  @spec contains_bad_string(String.t()) :: boolean
  def contains_bad_string(str) do
    Regex.match?(~r/(ab|cd|pq|xy)/, str)
  end

  @doc """
      iex> Day05.contains_at_least_three_vowels("")
      false

      iex> Day05.contains_at_least_three_vowels("aeiou")
      true

      iex> Day05.contains_at_least_three_vowels("afjgi")
      false
  """
  @spec contains_at_least_three_vowels(String.t()) :: boolean
  def contains_at_least_three_vowels(str) do
    Regex.scan(~r/([aeiou])/, str) |> length >= 3
  end

  @doc """
    iex> Day05.contains_seq_chars("")
    false

    iex> Day05.contains_seq_chars("aeiou")
    false

    iex> Day05.contains_seq_chars("affjgi")
    true
  """
  @spec contains_seq_chars(String.t()) :: boolean
  def contains_seq_chars(str) do
    Regex.match?(~r/(\w)\1/, str)
  end

  @doc """
    iex> Day05.validate_string("ugknbfddgicrmopn")
    true

    iex> Day05.contains_seq_chars("jchzalrnumimnmhp")
    false

    iex> Day05.contains_seq_chars("haegwjzuvuyypxyu")
    true
  """
  @spec validate_string(String.t()) :: boolean
  def validate_string(str) do
    good_string? = contains_seq_chars(str) && contains_at_least_three_vowels(str)
    bad_string? = contains_bad_string(str)

    cond do
      bad_string? ->
        false

      good_string? ->
        true

      true ->
        false

    end
  end

  @spec run :: non_neg_integer
  def run do
    File.read!("./input.txt")
    |> String.split("\n", trim: true)
    |> Enum.filter(&validate_string/1)
    |> length
  end
end
