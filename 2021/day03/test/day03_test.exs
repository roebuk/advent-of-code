defmodule Day03Test do
  use ExUnit.Case
  doctest Day03

  test "greets the world" do
    input = [
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010"
    ]

    assert Day03.solution(input) == 198
  end

  test "part 2" do
    input = [
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010"
    ]

    assert Day03b.solution(input) == 230
  end
end
