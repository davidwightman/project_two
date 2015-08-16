PRAGMA foreign_keys = ON;


DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS thread;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS comments;


CREATE TABLE user (
	user_id INTEGER PRIMARY KEY,
	user_name TEXT,
	user_password TEXT,
	user_avatar TEXT
);

CREATE TABLE thread (
	id INTEGER PRIMARY KEY,
	author_id INTEGER,
	title TEXT,
	content TEXT,
	votes INTEGER,
	FOREIGN KEY (author_id) REFERENCES user(user_id)
);

CREATE TABLE votes (
	id INTEGER PRIMARY KEY,
	user_id INTEGER,
	thread_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES user(user_id),
	FOREIGN KEY (thread_id) REFERENCES thread(id)
);


CREATE TABLE comments (
	comment_id INTEGER PRIMARY KEY,
	comment_author_id INTEGER,
	content TEXT,
	thread_id INTEGER,
	FOREIGN KEY (comment_author_id) REFERENCES user(user_id),
	FOREIGN KEY (thread_id) REFERENCES thread(id)
);