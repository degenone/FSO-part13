CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    url TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    likes INTEGER DEFAULT 0 NOT NULL
);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Michael Chan', 'https://reactpatterns.com/', 'React patterns', 7);

INSERT INTO blogs (author, url, title, likes)
VALUES ('uliyahoo', 'https://dev.to/copilotkit/im-building-an-ai-project-here-are-the-libraries-im-going-to-use-pd0', 'I''m Building an AI Project: Here Are the Libraries I''m Going to Use...', 5);