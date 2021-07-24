-- create database MadDance DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
-- use MadDance;

CREATE TABLE brd1 (
    UserID INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UserName CHAR(25) NOT NULL,
    UserScore INT(10) NOT NULL
);

CREATE TABLE brd2 (
    UserID INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UserName CHAR(25) NOT NULL,
    UserScore INT(10) NOT NULL
);

CREATE TABLE brd3 (
    UserID INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UserName CHAR(25) NOT NULL,
    UserScore INT(10) NOT NULL
);


INSERT INTO brd1 (UserName, UserScore) VALUES("hyemin", 90);
INSERT INTO brd1 (UserName, UserScore) VALUES("hyemin", 91);
INSERT INTO brd1 (UserName, UserScore) VALUES("hyemin", 88);
INSERT INTO brd1 (UserName, UserScore) VALUES("hyemin", 70);