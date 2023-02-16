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


INSERT INTO events (
user_id,
start_date,
end_date,
event_title,
event_description,
category_id,
location,
image_url
)
VALUES
(1, '2023-07-22 10:00:00', '2023-07-22 16:00:00', 'Summer Craft Fair', 'Come along to our annual Summer Craft Fair, featuring stalls from local artisans selling their unique and handmade crafts. Find the perfect gift or treat for yourself, and enjoy the atmosphere of the fair with music, food, and entertainment. Admission is free, but donations to support the local arts community are appreciated. The fair is held in the town hall, and we hope to see you there!', 'art', 'Town Hall'),
(1, '2023-08-12 14:00:00', '2023-08-12 18:00:00', 'Charity Football Match', 'Join us for an afternoon of football in support of a local charity. The match will feature two local teams competing for the charity trophy, and there will be food, drinks, and a raffle with great prizes. All proceeds from the event will go towards the charity, which supports vulnerable members of our community. The match will be held at the local football stadium, and we hope to see you there!', 'charity', 'Football Stadium'),
(1, '2023-09-02 10:00:00', '2023-09-02 16:00:00', 'Back to School Fun Day', 'Join us for a fun day of activities and entertainment to celebrate the start of the new school year. There will be bouncy castles, face painting, crafts, games, and more for kids of all ages to enjoy. Food and drink will be available for purchase, and all proceeds will go towards supporting local schools and education programmes. The event will be held in the park, and we look forward to seeing you there!', 'family', 'City Park'),
(1, '2023-10-21 19:00:00', '2023-10-21 23:00:00', 'Halloween Charity Ball', 'Come dressed to impress for our annual Halloween Charity Ball, featuring music, dancing, and a costume contest with prizes. All proceeds from the event will go towards supporting local charities that help those in need. Tickets are available in advance, and the event will be held at the local community centre. Do not miss out on the spooktacular event of the year!', 'charity', 'Community Centre'),(1, '2023-07-02 10:00:00', '2023-07-02 14:00:00', 'Charity Fun Run', 'Join us for a 5k fun run to support local charities. The route takes you through some of the most scenic areas of the town, and you''ll be cheered on by volunteers along the way. After the run, there will be food and drinks available for purchase, as well as activities for the whole family. All ages and fitness levels are welcome, and proceeds from the event will go towards helping those in need in our community. Register now and make a difference!', 'charity', 'Town Centre');
(1, '2023-08-12 19:00:00', '2023-08-12 23:00:00', 'Open Air Theatre: A Midsummer Night''s Dream', 'Come along to our open-air theatre performance of Shakespeare''s classic comedy, A Midsummer Night''s Dream. Set in the stunning grounds of the local manor house, this is a unique and magical experience not to be missed. Pack a picnic and enjoy the show in the company of family and friends, as the sun sets and the stars come out. Tickets are limited and selling fast, so book now to avoid disappointment!', 'art', 'Manor House Gardens'),
(1, '2023-09-09 11:00:00', '2023-09-09 16:00:00', 'Family Fun Day', 'Join us for a day of family-friendly activities and entertainment. We''ll have bouncy castles, face painting, craft stalls, live music, and more. There will be plenty of food and drinks available for purchase, and all proceeds will go towards supporting local youth initiatives. It promises to be a fun-filled day for all ages, so don''t miss out!', 'family', 'Community Centre'),
(1, '2023-10-15 14:00:00', '2023-10-15 17:00:00', 'Art Exhibition: The Beauty of Nature', 'Come and appreciate the beauty of nature in this stunning art exhibition, featuring the works of local artists. From landscapes to still life, this exhibition showcases a range of styles and mediums, all inspired by the natural world. Whether you''re an art lover or just appreciate the beauty of nature, this is an exhibition not to be missed. Admission is free, but donations to support the exhibiting artists are welcome. See you there!', 'art', 'Town Hall'),
(1, '2023-11-20 18:00:00', '2023-11-20 21:00:00', 'Community Christmas Lights Switch-On', 'Join us for the annual Christmas lights switch-on in the town centre. We''ll have carol singing, a visit from Santa, and of course, the switch-on itself. The lights are always a spectacular sight, and this year is no exception. Get into the festive spirit and join us for an evening of community cheer. All ages are welcome, and it''s sure to be a magical experience for everyone.', 'festival', 'Town Centre'),
(1, '2023-07-02 10:00:00', '2023-07-02 16:00:00', 'Summer Fun Run', 'Join us for a fun run around the local park and help raise money for a good cause! Whether you''re a seasoned runner or just looking for a bit of exercise, this event is suitable for all levels. We''ll have prizes for the fastest runners, as well as food and drinks for everyone. Don''t forget to wear your running shoes and get ready to sweat!', 'charity', 'Greenwich Park'),
(1, '2023-09-10 12:00:00', '2023-09-10 18:00:00', 'Community Picnic', 'Bring your friends and family to the local park for a fun-filled community picnic. We''ll have games, music, and food for everyone to enjoy. This is a great opportunity to meet your neighbours and make new friends in a relaxed, family-friendly atmosphere. Admission is free, but we''ll be accepting donations to support our local community projects. See you there!', 'family', 'Victoria Park'),
(1, '2023-11-04 19:00:00', '2023-11-04 23:00:00', 'Fireworks Display', 'Join us for a spectacular fireworks display at the local sports ground. This event is perfect for all ages, and we''ll have food and drinks available for purchase. The fireworks show will be set to music, and we guarantee that it will be a night to remember. Tickets are limited, so be sure to book in advance!', 'festival', 'The Sports Ground'),
(1, '2023-12-15 18:00:00', '2023-12-15 22:00:00', 'Christmas Market', 'Get into the festive spirit at our annual Christmas market! We''ll have a variety of stalls selling gifts, decorations, and food, as well as live music and entertainment. This is the perfect opportunity to pick up some unique gifts for your loved ones while enjoying the holiday atmosphere. Admission is free, and we''ll be accepting donations to support our local charity projects. See you there!', 'art', 'Town Centre'),
(1, '2023-10-21 09:00:00', '2023-10-21 15:00:00', 'Community Clean-Up', 'Join us for a community clean-up day and help make our town a cleaner, greener place to live. We''ll provide all the equipment you need, and we''ll be working on various projects around town, including litter picking and gardening. This is a great opportunity to meet your neighbours and make a positive impact on your local community. Lunch and refreshments will be provided. Let''s make a difference together!', 'charity', 'Town Centre');