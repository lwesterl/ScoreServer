-- ONLY for testing: insert values to the database
-- Author: Lauri Westerholm

INSERT INTO Users
VALUES(1, "Test user 1");

INSERT INTO Users
VALUES(2, "Test user 2");

INSERT INTO Levels
VALUES("Level 1", 1);

INSERT INTO Levels
VALUES("Level 2", 2);

INSERT INTO Levels
VALUES("Level 3", 3);

INSERT INTO GameModes
VALUES(1, "Easy");

INSERT INTO GameModes
VALUES(2, "Hard");

INSERT INTO Scores
VALUES(1, 200, "12-04-2019 15:34", 1, "Level 1", 1, 1);

INSERT INTO Scores
VALUES(2, 100, "20-05-2019 23:44", 1, "Level 1", 1, 1);

INSERT INTO Scores
VALUES(3, 10, "01-09-2018 10:19", 0, "Level 2", 2, 1);

INSERT INTO Scores
VALUES(4, 200, "13-04-2019 15:34", 1, "Level 1", 1, 2);

INSERT INTO Scores
VALUES(5, 100, "30-05-2019 23:44", 1, "Level 1", 1, 1);

INSERT INTO Scores
VALUES(6, 10, "10-09-2018 10:19", 0, "Level 2", 2, 2);

INSERT INTO Scores
VALUES(7, 290, "11-07-2019 15:34", 1, "Level 1", 1, 1);

INSERT INTO Scores
VALUES(8, 0, "23-03-2019 23:44", 0, "Level 1", 1, 2);
