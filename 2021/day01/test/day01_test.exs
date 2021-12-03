defmodule Day01Test do
  use ExUnit.Case
  #doctest Day01b

  test "greets the world" do
    list = [607, 618, 618, 617, 647, 716, 769, 792]
    assert Day01b.calc(list).total == 5
  end
end
