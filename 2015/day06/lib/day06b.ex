defmodule Day06b do
  @type action :: :on | :off | :toggle

  @spec clamp(number(), number(), number()) :: number()
  def clamp(_min, max, val) when val > max, do: max
  def clamp(min, _max, val) when val < min, do: min
  def clamp(_min, _max, val), do: val

  @doc """
    iex> Day06.action_str_to_atom("toggle")
    :toggle

    iex> Day06.action_str_to_atom("on")
    :on
  """
  @spec action_str_to_atom(String.t()) :: action
  def action_str_to_atom(str) when is_binary(str) do
    case str do
      "toggle" ->
        :toggle
      "on" ->
        :on
      "off" ->
        :off
    end
  end

  @doc """
    iex> Day06.parse_coords("499,499", "500,500")
    [{499, 499}, {499, 500}, {500, 499}, {500, 500}]
  """
  def parse_coords(start, finish) do
    [x_start, y_start] = start
      |> String.split(",", trim: true)
      |> Enum.map(&String.to_integer/1)

    [x_end, y_end] = finish
      |> String.split(",", trim: true)
      |> Enum.map(&String.to_integer/1)


    for x <- x_start..x_end, y <- y_start..y_end,
      do: {x, y}
  end

  @doc """
    # iex> Day06.parse_line("toggle 499,999 through 500,500")
    # %{ action: :toggle, coords: [%{x: 499, y: 499}, %{x: 499, y: 500}, %{x: 500, y: 499}, %{x: 500, y: 500}] }
  """
  def parse_line(str) do
    [action, first, _, second] = str
    |> String.replace("turn ", "")
    |> String.split(" ")

    %{
      action: action_str_to_atom(action),
      coords: parse_coords(first, second)
    }
  end

  def process_lights(item, lights) do
    {init_val, update_fn} = case item.action do
      :on ->
        {1, fn cv -> {cv, cv + 1} end}
      :off ->
        {0, fn cv -> {cv, clamp(0, 9999999, cv - 1)} end}
      :toggle ->
        {2, fn cv -> {cv, cv + 2} end}
    end

    Enum.reduce(item.coords, lights, fn coord, acc ->
      if Map.has_key?(lights, coord) do
        Map.get_and_update(acc, coord, update_fn) |> elem(1)
      else
        Map.update(acc, coord, init_val, update_fn)
      end
    end)
  end

  # 19807914 too high

  def run do
    File.read!("./input.txt")
    |> String.split("\n", trim: true)
    |> Enum.map(&parse_line/1)
    |> Enum.reduce(Map.new, &process_lights/2)
    |> Enum.reduce(0, fn {_, val}, sum -> sum + val end)

  end
end
