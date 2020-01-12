module Viewer.Cred exposing (Cred, addHeader, addHeaderIfAvailable, decoder, encodeToken, username)

import HttpBuilder exposing (RequestBuilder, withHeader)
import Json.Decode as Decode exposing (Decoder)
import Json.Decode.Pipeline exposing (required)
import Json.Encode as Encode exposing (Value)
import Username exposing (Username)



-- TYPES

type alias CredData = { username: Username, token: String}


type Cred =
    Cred CredData

-- INFO


username : Cred -> Username
username (Cred data) =
    data.username



-- SERIALIZATION


-- https://stackoverflow.com/questions/40826911/elm-how-to-json-decode-a-union-type-with-a-single-typeconstructor
decoder : Decoder Cred
decoder =
    Decode.map2 CredData
            (Decode.field "username" Username.decoder)
            (Decode.field "token" Decode.string)
            |> Decode.map Cred



-- TRANSFORM


encodeToken : Cred -> Value
encodeToken (Cred { token }) =
    Encode.string token


addHeader : Cred -> RequestBuilder a -> RequestBuilder a
addHeader (Cred { token }) builder =
    builder
        |> withHeader "authorization" ("Token " ++ token)


addHeaderIfAvailable : Maybe Cred -> RequestBuilder a -> RequestBuilder a
addHeaderIfAvailable maybeCred builder =
    case maybeCred of
        Just cred ->
            addHeader cred builder

        Nothing ->
            builder
