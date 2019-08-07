-- Create database tables, sqlite3 syntax
-- Author: Lauri Westerholm

-- Table for storing users
CREATE TABLE IF NOT EXISTS Users(
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT UNIQUE NOT NULL
);

-- Table for storing scores
CREATE TABLE IF NOT EXISTS Scores(
    id INTEGER PRIMARY KEY NOT NULL,
    score REAL NOT NULL,
    time NUMERIC NOT NULL,
    completed INTEGER CHECK (completed IN(0, 1)) DEFAULT 0,
    level TEXT REFERENCES Levels(name),
    userID INTEGER REFERENCES Users(id),
    gameMode INTEGER REFERENCES GameModes(id)
);

-- Table for storing levels
CREATE TABLE IF NOT EXISTS Levels(
  name TEXT PRIMARY KEY NOT NULL,
  sortKey INTEGER NOT NULL
);

-- Table for storing game modes
CREATE TABLE IF NOT EXISTS GameModes(
  id INTEGER PRIMARY KEY NOT NULL,
  description TEXT
);
