import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useState } from "react";

// useQuery --> all the data
// useLazyQuery --> data on command

// GET ALL THE USERS
const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      username
      age
    }
  }
`;

// GET ALL THE MOVIES
const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

// GET ONE MOVIE
const QUERY_MOVIE_BY_NAME = gql`
  query GetMovieByName($name: String!) {
    movie(name: $name) {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState("");
  const { loading, data, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieSearchedError }] =
    useLazyQuery(QUERY_MOVIE_BY_NAME);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  if (movieData) {
    console.log(movieData);
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(error);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="number"
          placeholder="age"
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="nationality"
          onChange={(e) => setNationality(e.target.value)}
        />
        <button>Create User</button>
        // TODO: display the info, tutorial 3.07
      </div>
      {data &&
        data.users.map((user) => {
          return (
            <div
              style={{
                border: "1px solid black",
                margin: "0.5rem 0",
                padding: "1rem",
              }}
              key={user.id}
            >
              <p>{user.name}</p>
              <p>{user.username}</p>
              <p>{user.age}</p>
            </div>
          );
        })}

      {movieData &&
        movieData.movies.map((movie) => {
          return (
            <div
              style={{
                border: "1px solid black",
                margin: "0.5rem 0",
                padding: "1rem",
              }}
              key={movie.id}
            >
              <p>{movie.name}</p>
              <p>{movie.isInTheater}</p>
              <p>{movie.yearOfPublication}</p>
            </div>
          );
        })}

      <div>
        <input
          type="text"
          placeholder="Interstellar..."
          onChange={(event) => setMovieSearched(event.target.value)}
        />
        <button
          onClick={() => {
            fetchMovie({ variables: { name: movieSearched } });
          }}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <p>Movie Name: {movieSearchedData.movie.name}</p>
              <p>
                Year of Publication: {movieSearchedData.movie.yearOfPublication}
              </p>
            </div>
          )}
          {movieSearchedError && (
            <p>We are sorry, but we do not have that movie yet :S</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
