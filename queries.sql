--tags repository
--add new tag
INSERT INTO tags (name) VALUES (_name) RETURNING id;

--add tag to recipe 
INSERT INTO tag_to_recipe (tag_id, recipe_id) VALUES (_tag_id, _recipe_id);

--delete tag from recipe
DELETE FROM tag_to_recipe WHERE tag_id = _tag_id AND recipe_id = _recipe_id;

--get tag by name
SELECT * FROM tags WHERE name = _name;

--get tag id
SELECT (tag_id) FROM tag_to_recipe INNER JOIN tags ON (tag_to_recipe.tag_id = tags.id) WHERE recipe_id = _recipe_id AND name = _tag_name;

--get tags by recipe_id
SELECT (name) FROM tag_to_recipe INNER JOIN tags ON (tag_to_recipe.tag_id = tags.id) WHERE recipe_id = _recipe_id;

--get tag_to_recipe
SELECT * FROM tag_to_recipe WHERE tag_id = _tag_id AND recipe_id = _recipe_id;

--get all tags
SELECT (name) FROM tags;


--label repository like=1 favorite=2
--add recipe to favorite
INSERT INTO labels (user_id, recipe_id, type) VALUES (_user_id, _recipe_id, 2);

--add like to recipe
INSERT INTO labels (user_id, recipe_id, type) VALUES (_user_id, _recipe_id, 1);

--get favorites count by recipe_id
SELECT COUNT(*) FROM labels WHERE recipe_id = _recipe_id AND type = 2;

--get likes count by recipe_id
SELECT COUNT(*) FROM labels WHERE recipe_id = _recipe_id AND type = 1;

--get favorites count by user_id
SELECT COUNT(*) FROM labels WHERE user_id = _user_id AND type = 2;

--get likes count by user_id
SELECT COUNT(*) FROM labels WHERE user_id = _user_id AND type = 1;

--delete like 
DELETE FROM labels WHERE user_id = _user_id AND recipe_id = _recipe_id AND type = 1;

--delete favorite
DELETE FROM labels WHERE user_id = _user_id AND recipe_id = _recipe_id AND type = 2;

--does like exist
SELECT EXISTS (SELECT * FROM labels WHERE user_id = _user_id AND recipe_id = _recipe_id AND type = 1); 

--does favorite exist
SELECT EXISTS (SELECT * FROM labels WHERE user_id = _user_id AND recipe_id = _recipe_id AND type = 2); 

--user repository
--get user by id
SELECT * FROM users WHERE id = _id;

--add user
INSERT INTO users (name, login, description, password) VALUES (_name, _login, _description, _password);

--get user by login
SELECT * FROM users WHERE login = _login;

--get login by recipe id
SELECT (login) FROM recipes INNER JOIN users ON recipes.user_id = users.id WHERE recipes.id = _recipe_id;

--recipe repository
--add new recipe
INSERT INTO recipes (title, user_id, description, cooking_time, portions_count, photo_url, stages, ingredients)
VALUES (_title, _user_id, _description, _cooking_time, _portions_count, _photo_url, _stages, _ingredients);

--delete by id
DELETE FROM recipes WHERE id = _id;

--get recipe by id
SELECT * FROM recipes WHERE id = _id;

--get recipes by user_id
SELECT * FROM recipes WHERE user_id = _user_id;

--get recipes for feed _offset = _page * _page_limit
SELECT * FROM recipes ORDER BY id LIMIT _page_limit OFFSET _offset;

--get recipes by user id
SELECT * FROM recipes WHERE user_id = _user_id ORDER BY id LIMIT _page_limit OFFSET _offset;

--get recipes by search_string
SELECT * FROM recipes WHERE title LIKE '%' || _search_string || '%' ORDER BY id LIMIT _page_limit OFFSET _offset;


--get favorite user recipes
SELECT recipe_id FROM tag_to_recipe WHERE user_id = _user_id;

SELECT * FROM recipes WHERE id = ANY(_recipe_ids) ORDER BY id LIMIT _page_limit OFFSET _offset;


--get recipes by search_string using tag
SELECT id FROM tags WHERE name LIKE '%' || _search_string || '%';

SELECT DISTINCT recipe_id FROM tag_to_recipe WHERE tag_id = ANY(_tag_ids);

SELECT * FROM recipes WHERE id = ANY(_recipe_ids) ORDER BY id LIMIT _page_limit OFFSET _offset;



--/creates

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