-- Init database for production use, only Levels and GameModes created
-- Author: Lauri Westerholm

INSERT OR REPLACE INTO Levels
VALUES("Intro", 0);

INSERT OR REPLACE INTO Levels
VALUES("Escape begins", 1);

INSERT OR REPLACE INTO Levels
VALUES("Tunnel darkens", 2);

INSERT OR REPLACE INTO Levels
VALUES("Inferno", 3);

INSERT OR REPLACE INTO Levels
VALUES("The final escape", 4);

INSERT OR REPLACE INTO Levels
VALUES("Bonus level", 5);


INSERT OR REPLACE INTO GameModes
VALUES(1, "Normal");

INSERT OR REPLACE INTO GameModes
VALUES(2, "Hard");
