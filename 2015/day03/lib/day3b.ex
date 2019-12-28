defmodule Day03b do
  @up "^"
  @down "v"
  @left "<"
  @right ">"

  @type coords :: {integer, integer}

  def count_visits(x) do
    map_size(x.visits)
  end

  @doc """
  ## Examples

      iex> Day03a.update_location({0,0}, "^")
      {0,-1}

      iex> Day03a.update_location({0,0}, "v")
      {0,1}

      iex> Day03a.update_location({0,0}, "<")
      {-1,0}

      iex> Day03a.update_location({0,0}, ">")
      {1,0}

  """
  @spec update_location(coords, String.t()) :: coords
  def update_location(location, modifier) do
    {x, y} = location

    case modifier do
      @up ->
        {x, y - 1}

      @down ->
        {x, y + 1}

      @left ->
        {x - 1, y}

      @right ->
        {x + 1, y}
    end
  end

  def run do
    init_state = %{
      santa_position: {0, 0},
      robo_position: {0, 0},
      visits: %{}
    }

    File.read!("./input.txt")
    |> String.split("", trim: true)
    |> Enum.with_index()
    |> Enum.reduce(init_state, fn {direction, idx}, acc ->
      turn = if rem(idx, 2) == 0, do: :santa_position, else: :robo_position

      new_location = update_location(acc[turn], direction)
      updated_visits = Map.update(acc.visits, new_location, 1, &(&1 + 1))

      acc
      |> Map.put(turn, new_location)
      |> Map.put(:visits, updated_visits)
    end)
    |> count_visits
  end
end
