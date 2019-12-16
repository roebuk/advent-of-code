module Main exposing (Model, Moon, Msg(..), init, main, update, view)

import Dict exposing (Dict)
import Browser
import Html exposing (Html, div, p, text)
import Html.Attributes as Attrs
import List.Extra exposing (uniquePairs)
import Time


type alias Vec3 =
    { x : Int
    , y : Int
    , z : Int
    }


type alias Position =
    Vec3


type alias Velocity =
    Vec3


type alias Moon =
    { name : String
    , p : Position
    , v : Velocity
    }


type alias Model =
    { step : Int
    , moons : Dict String Moon
    }


neutralMoon : Moon
neutralMoon = Moon "i" { x = 1, y = 2, z = -9 } defaultVelocity


defaultVelocity : Vec3
defaultVelocity = { x = 0, y = 0, z = 0}


init : ( Model, Cmd Msg )
init =
    ( { moons = Dict.fromList
        [ ("i", Moon "i" { x = 1, y = 2, z = -9 } defaultVelocity)
        , ("e", Moon "e" { x = -1, y = -9, z = -4 } defaultVelocity)
        , ("g", Moon "g" { x = 17, y = 6, z = 8 } defaultVelocity)
        , ("c", Moon "c" { x = 12, y = 4, z = 2 } defaultVelocity)
        ]
      , step = 0
      }
    , Cmd.none
    )


---- HELPERS ----


maybeDanger : Maybe Moon -> Moon
maybeDanger maybeA =
    case maybeA of
        Just a ->
            a
        Nothing ->
            neutralMoon



calcPotenialEnergy : Moon -> Int
calcPotenialEnergy moon =
    abs moon.p.x + abs moon.p.y + abs moon.p.z


calcKineticEnergy : Moon -> Int
calcKineticEnergy moon =
    abs moon.v.x + abs moon.v.y + abs moon.v.z


calcEnergy : Moon -> Int
calcEnergy moon =
    calcPotenialEnergy moon * calcKineticEnergy moon


---- UPDATE ----


adjustGravity : Int -> Int -> Int -> Int -> (Int, Int)
adjustGravity velocityA velocityB a b =
    case compare a b of
        LT ->
            (velocityA + 1, velocityB - 1)
        EQ ->
            (velocityA, velocityB)
        GT ->
            (velocityA - 1, velocityB + 1)


applyGravity :  ( String, String ) -> Dict String Moon -> Dict String Moon
applyGravity ( moonStrOne, moonStrTwo ) moons =
    {- Update the velocity once the n -}
    let
        moonOne = Dict.get moonStrOne moons |> maybeDanger
        moonTwo = Dict.get moonStrTwo moons |> maybeDanger

        (newXOne, newXTwo) = adjustGravity moonOne.v.x moonTwo.v.x moonOne.p.x moonTwo.p.x
        (newYOne, newYTwo) = adjustGravity moonOne.v.y moonTwo.v.y moonOne.p.y moonTwo.p.y
        (newZOne, newZTwo) = adjustGravity moonOne.v.z moonTwo.v.z moonOne.p.z moonTwo.p.z

        moonOneNewPosition = { x = newXOne, y = newYOne, z = newZOne}
        moonOneNew = { moonOne | v = moonOneNewPosition }
        moonTwoNewPosition = { x = newXTwo, y = newYTwo, z = newZTwo}
        moonTwoNew = { moonTwo | v = moonTwoNewPosition }

    in
    moons
        |> Dict.insert moonStrOne moonOneNew
        |> Dict.insert moonStrTwo moonTwoNew


calcVelocity : Moon -> Moon
calcVelocity moon =
    let
        velocity = moon.v
        postition = moon.p
        newPosition =
            { x = postition.x + velocity.x
            , y = postition.y + velocity.y
            , z = postition.z + velocity.z
            }
    in
    {moon | p = newPosition}

type Msg
    = Step Time.Posix


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Step _ ->
            let
                pairs = Dict.keys model.moons |> uniquePairs
                updatedMoons = pairs
                    |> List.foldl applyGravity model.moons
                    |> Dict.map (\_ moon -> calcVelocity moon)
            in
            ( { model | step = model.step + 1, moons = updatedMoons }, Cmd.none )



---- VIEW ----


viewMoon :  ( String, Moon ) -> Html msg
viewMoon (_, moon) =
    let
        x =
            String.fromInt moon.p.x

        y =
            String.fromInt moon.p.y

        z =
            String.fromInt (moon.p.z * 2)
    in
    div
        [ Attrs.class "moon"
        , Attrs.class moon.name
        , Attrs.style "z-index" (String.fromInt moon.p.z)
        , Attrs.style
            "transform"
            ("perspective(300px) translate3d(" ++ x ++ "px , " ++ y ++ "px," ++ z ++ "px)")
        ]
        []


view : Model -> Html Msg
view model =
    let
        moonList =
            model.moons |> Dict.toList

        totalEnergy =
            moonList
                |> List.map Tuple.second
                |> List.map calcEnergy
                |> List.sum
                |> String.fromInt
    in
    div []
        [ div [ Attrs.class "container" ]
          <| List.map viewMoon moonList
        , p [ Attrs.class "text" ] [ text "Total system energy" ]
        , p [ Attrs.class "text mod-large" ] [ text totalEnergy ]
        ]


---- PROGRAM ----


main : Program () Model Msg
main =
    Browser.element
        { view = view
        , init = \_ -> init
        , update = update
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    if model.step < 1000 then
        Time.every (1000 / 10) Step

    else
        Sub.none
