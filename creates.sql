CREATE TABLE users
(
    id serial NOT NULL,
    name character varying(60) NOT NULL,
    login character varying(60) NOT NULL UNIQUE,
    description character varying,
    password character varying,
    PRIMARY KEY (id)
);

CREATE TABLE recipes
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    title character varying(100) NOT NULL UNIQUE,
    descriprion character varying NOT NULL,
    cooking_time integer NOT NULL,
    portions_count integer NOT NULL,
    photo_url character varying,
    stages character varying NOT NULL,
    ingredients character varying NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE labels
(
    user_id integer NOT NULL,
    recipe_id integer NOT NULL,
    type integer NOT NULL,
    PRIMARY KEY (user_id, recipe_id, type),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT recipe_id FOREIGN KEY (recipe_id)
        REFERENCES recipes (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE tags
(
    id serial NOT NULL,
    name character varying(60) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE tag_to_recipe
(
    tag_id integer NOT NULL,
    recipe_id integer NOT NULL,
    PRIMARY KEY (tag_id, recipe_id),
    CONSTRAINT tag_id FOREIGN KEY (tag_id)
        REFERENCES tags (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT recipe_id FOREIGN KEY (recipe_id)
        REFERENCES recipes (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);