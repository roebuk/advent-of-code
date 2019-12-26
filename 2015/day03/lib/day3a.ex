defmodule Day03a do
  @up "^"
  @down "v"
  @left "<"
  @right ">"

  @type coords :: {integer, integer}

  defstruct(
    position: {0, 0},
    visits: %{}
  )

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
    File.read!("./input.txt")
    |> String.split("", trim: true)
    |> Enum.reduce(%Day03a{}, fn x, acc ->
      new_location = update_location(acc.position, x)
      updated_visits = Map.update(acc.visits, new_location, 1, &(&1 + 1))

      acc
      |> Map.put(:position, new_location)
      |> Map.put(:visits, updated_visits)
    end)
    |> count_visits
  end
end
