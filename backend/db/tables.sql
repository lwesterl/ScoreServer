-- Create database tables
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
    level TEXT NOT NULL,
    userID INTEGER REFERENCES Users(id)
);
