defmodule Day02Test do
  use ExUnit.Case


  test "part 1" do
    lines = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"]
    assert Day02.solution(lines) == 150
  end

  test "part 2" do
    lines = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"]
    assert Day02.solutionB(lines) == 900
  end
end
