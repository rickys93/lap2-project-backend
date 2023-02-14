DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,

    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE categories (
    category_id VARCHAR(20) UNIQUE NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (category_id)
);

CREATE TABLE events (
    event_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    event_title VARCHAR(30) NOT NULL,
    event_description VARCHAR(500),
    interest INT DEFAULT 0,
    attending INT DEFAULT 0,
    category_id VARCHAR(20) NOT NULL,
    image_url VARCHAR(100),
    location VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_account("user_id"),
    FOREIGN KEY (category_id) REFERENCES categories("category_id")
);


INSERT INTO categories (
    category_id,
    category_name
) VALUES 
('festival', 'Festivals and Fairs'),
('music', 'Music and Concerts'),
('charity', 'Community and Charity'),
('education', 'Education and Learning'),
('art', 'Arts and Culture'),
('family', 'Family and Kids'),
('business', 'Business and Networking');
