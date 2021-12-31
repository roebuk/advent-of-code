defmodule Day05b do
  @doc """
    iex> pair_appears_twice("aaa")
    false

    iex> pair_appears_twice("aaaa")
    true

    iex> pair_appears_twice("xyxy")
    true

    iex> pair_appears_twice("aabcdefgaa")
    true
  """
  @spec pair_appears_twice(String.t()) :: boolean()
  def pair_appears_twice(str) when is_binary(str) do
    {pair, tail} = String.split_at(str, 2)
    contains_match? = Regex.match?(~r/#{pair}/, tail)

    cond do
      contains_match? ->
        true

      String.length(tail) > 1 ->
        str |> String.split_at(1) |> elem(1) |> pair_appears_twice

      true ->
        false
    end
  end

  @doc """
    iex> Day05b.surrounding_letters?(["a", "b", "a"])
    true

    iex> Day05b.surrounding_letters?(["w", "a", "s", "a"])
    true

    iex> Day05b.surrounding_letters?(["a", "b", "b"])
    false

    iex> Day05b.surrounding_letters?(["a", "b", "c", "d", "e", "f", "e", "g", "h", "i"])
    true
  """
  @spec surrounding_letters?(list(String.t())) :: boolean()
  def surrounding_letters?(chars) do
    case chars do
      [a, _, a | _] ->
        true
      [_ | tail] ->
        surrounding_letters?(tail)
      [] ->
        false
    end
  end

  @spec validate_string(String.t()) :: boolean()
  def validate_string(str) do
    surrounding_letters?(String.graphemes(str)) && Recur.pair_appears_twice(str)
  end

  @spec run :: non_neg_integer
  def run do
    File.read!("./input.txt")
    |> String.split("\n", trim: true)
    |> Enum.filter(&validate_string/1)
    |> length
  end
end
