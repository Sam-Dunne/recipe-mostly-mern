drop table Recipes;
drop table Users;
drop table Ingredients;
drop table FlavorTags;
drop table RecipeFlavorTags;
drop table RecipeIngredients;
CREATE TABLE Users (
    id VARCHAR(36), 
    name VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
	role tinyint DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    edited_at TIMESTAMP NULL ON UPDATE NOW(),
    PRIMARY KEY (id)
);
INSERT INTO Users (id, name, email, password, role) VALUES ('1', 'testing1', 'testing1@testing', 'testing', 9);
INSERT INTO Users (id, name, email, password) VALUES ('1a', 'testing5', 'testing5@testing', 'testing'),('2', 'testing2', 'testing2@testing', 'testing'),('3', 'testing3', 'testing3@testing', 'testing'),('4', 'testing4', 'testing4@testing', 'testing');

CREATE TABLE Recipes (
	id VARCHAR(36) NOT NULL,
    title VARCHAR(60) NOT NULL,
    summary VARCHAR(250) DEFAULT "Add a Summary",
    instructions VARCHAR(1000) DEFAULT ' David!!!, Just fold in the cheese...add your directions',
    user_id VARCHAR(36),
    created_at timestamp DEFAULT NOW(),
    edited_at TIMESTAMP NULL ON UPDATE NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO Recipes (id, title, summary, instructions, user_id) VALUES ('1', "## Ham Sammich", '#### Quick Lunch', '1. Put meat between the bread', '1'),('2', '## Ham n Cheese Sammich', '#### Fancy Quick Lunch', '1. add mustard. 2. Put both between the bread', '1'),('3', '## Ham n Cheese Deluxe Sammich', '#### Look Who is showing off!', '1. add condiments to bread. 2. add meat. 3. add cheese and veggies', '1'),('4', 'Pasta', 'Like Grandma used to make', 'add water, boil water, heat sauce, drain water, add sauce', '2'), ('5', 'Pizza', 'Classic, Quick', 'call dominos', '2'), ('6', 'texas cheese steak', 'waffle house style', 'go to waffle house after midnight', '3');
# (Tag) ie., Spicy, Sweet, Savory, Beef, Chicken, 
### name: ?Unique? ###
CREATE TABLE FlavorTags (
	id VARCHAR(36), 
    name VARCHAR(60) NOT NULL UNIQUE, 
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id)  
);

INSERT INTO FlavorTags (id, name) VALUES ('1', 'Spicy'),('2', 'Sweet'),('3', 'Savory'),('4', 'Mild'),('5', 'Beefy'),('6', 'Medium'),('7', 'Salty'),('8', 'Sugary');
#SELECT FlavorTags.name, FlavorTags.id FROM RecipeFlavorTags JOIN FlavorTags ON FlavorTags.id = RecipeFlavorTags.flavor_tag_id WHERE recipe_id = '4';
# Many to Many
CREATE TABLE RecipeFlavorTags (
	recipe_id VARCHAR(36) NOT NULL,
	flavor_tag_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (recipe_id, flavor_tag_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (flavor_tag_id) REFERENCES flavorTags(id) ON DELETE CASCADE
);

INSERT INTO RecipeFlavorTags values ('1','7'),('2','7'),('3','7'),('3','3'),('4','3'),('4','7'),('4','1');



CREATE TABLE Ingredients (
    id VARCHAR(40) NOT NULL PRIMARY KEY,
    name VARCHAR(69)
);
INSERT INTO Ingredients VALUES ('1', 'pasta'), ('2', 'bread'), ('3', 'ham'), ('4', 'cheese'), ('5', 'brown mustard'); 

CREATE TABLE RecipeIngredients (
    recipe_id VARCHAR(40),
        FOREIGN KEY (recipe_id) REFERENCES Recipes(id),
    ingredient_id VARCHAR(40), 
        FOREIGN KEY (ingredient_id) REFERENCES Ingredients(id),
    ingredient_qty VARCHAR(420),
    PRIMARY KEY (recipe_id, ingredient_id)
);
INSERT INTO RecipeIngredients VALUES ('1','2','2'),('1','3','2'),('2','2','3'),('2','3','4'),('2','4','1'),('3','2','2'),('3','3','3'),('3','5','1');
#SELECT Ingredients.name, Ingredients.id, RecipeIngredients.ingredient_qty FROM RecipeIngredients JOIN Ingredients ON Ingredients.id = RecipeIngredients.ingredient_id WHERE recipe_id = '2';



#users queries
#SELECT users.id, users.name, users.email, users.role, users.created_at FROM Users;   #all from users less password
#SELECT * FROM Users WHERE id = ?;
#SELECT * from Users WHERE email='testing@testing.com';  #user by email
#'INSERT INTO Users SET ?', [newUser]

# all recipes for user by user email
#SELECT recipes.id, recipes.title, recipes.summary, recipes.instructions, recipes.user_id, recipes.created_at, recipes.edited_at, users.name AS username, users.role FROM Recipes LEFT JOIN Users ON recipes.user_id = users.id WHERE users.email='testing1@testing';  #recipes for each user by use_rid

#### Recipes CRUD ops ####
#const allForUserByEmail = (email: string) => Query<(IRecipes & IUsers)[]>('SELECT recipes.id, recipes.title, recipes.summary, recipes.directions, recipes.user_id, recipes.created_at, recipes.edited_at, users.name AS username, users.role FROM recipes LEFT JOIN users ON recipes.user_id = users.id WHERE users.email=?', [email]);
#const oneById = (id: string) => Query<IRecipes[]>('SELECT * FROM recipes WHERE id = ?', [id]);
#const insert = (recipe: IRecipes) => Query('INSERT INTO recipes SET ?', [recipe]);
#const update = (updatedRecipe: { title: string, summary: string, directions: string }, id: string) => Query('UPDATE recipes SET ? WHERE id = ?', [updatedRecipe, id]);
#const nuke = (id: string) => Query('DELETE from recipes WHERE id = ?', [id]);




-- CREATE TABLE Users {
--     id VARCHAR(36), 
--     name VARCHAR(60) NOT NULL,
--     email VARCHAR(60) NOT NULL UNIQUE,
--     password VARCHAR(60) NOT NULL,
-- 	role smallint DEFAULT 1,
--     created_at TIMESTAMP DEFAULT NOW(),
--     edited_at TIMESTAMP NULL ON UPDATE NOW(),
--     PRIMARY KEY (id)
-- };

-- CREATE TABLE Recipes (
-- 	id VARCHAR(36) NOT NULL,
--     title VARCHAR(60) NOT NULL,
--     summary VARCHAR(250) DEFAULT "Add a Summary",
--     directions VARCHAR(1000) DEFAULT ' David!!!, Just fold in the cheese...add your directions',
--     user_id VARCHAR(36),
--     created_at timestamp DEFAULT NOW(),
--     edited_at TIMESTAMP NULL ON UPDATE NOW(),
--     PRIMARY KEY (id),
--     FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- # (Tag) ie., Spicy, Sweet, Savory, Beef, Chicken, 
-- CREATE TABLE FlavorTags (
-- 	id VARCHAR(36), 
--     name VARCHAR(60) NOT NULL UNIQUE, #?Unique?
--     _created TIMESTAMP DEFAULT NOW(),
--     PRIMARY KEY (id)  
-- );
-- SELECT FlavorTags.name, FlavorTags.id FROM RecipeFlavorTags JOIN FlavorTags ON FlavorTags.id = RecipeFlavorTags.flavor_tag_id WHERE recipe_id = ?;
-- # Many to Many
-- CREATE TABLE RecipeFlavorTags (
-- 	recipe_id VARCHAR(36) NOT NULL,
-- 	flavor_tag_id VARCHAR(36) NOT NULL,
--     PRIMARY KEY (recipe_id, flavor_tag_id),
--     FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
--     FOREIGN KEY (flavor_tag_id) REFERENCES flavorTags(id) ON DELETE CASCADE
-- );



-- CREATE TABLE Ingredients (
--     id VARCHAR(40) NOT NULL PRIMARY KEY,
--     name VARCHAR(69)
-- );
-- CREATE TABLE RecipeIngredients (
--     recipe_id VARCHAR(40),
--         FOREIGN KEY (recipe_id) REFERENCES Recipes(id),
--     ingredient_id VARCHAR(40), 
--         FOREIGN KEY (ingredient_id) REFERENCES Ingredients(id),
--     ingredient_qty VARCHAR(420),
--     PRIMARY KEY (recipe_id, ingredient_id)
-- );
-- INSERT INTO Ingredients VALUES ('23456qwerty', 'pizza'), ('456789qwerty', 'bananas'), ('678901qwerty', 'potato'); 
-- SELECT Ingredients.name, Ingredients.id FROM RecipeIngredients JOIN Ingredients ON Ingredients.id = RecipeIngredients.ingredient_id WHERE recipe_id = ?;



-- #users queries
-- SELECT users.id, users.name, users.email, users.role, users.created_at FROM Users;   #all from users less password
-- SELECT * FROM Users WHERE id = ?;
-- SELECT * from Users WHERE email='testing@testing.com';  #user by email
-- #'INSERT INTO Users SET ?', [newUser]

-- # all recipes for user by user email
-- #SELECT recipes.id, recipes.title, recipes.summary, recipes.directions, recipes.user_id, recipes.created_at, recipes.edited_at, users.name AS username, users.role FROM Recipes LEFT JOIN Users ON recipes.user_id = users.id WHERE users.email='?';  #recipes for each user by use_rid

-- #### Recipes CRUD ops ####
-- #const allForUserByEmail = (email: string) => Query<(IRecipes & IUsers)[]>('SELECT recipes.id, recipes.title, recipes.summary, recipes.directions, recipes.user_id, recipes.created_at, recipes.edited_at, users.name AS username, users.role FROM recipes LEFT JOIN users ON recipes.user_id = users.id WHERE users.email=?', [email]);
-- #const oneById = (id: string) => Query<IRecipes[]>('SELECT * FROM recipes WHERE id = ?', [id]);
-- #const insert = (recipe: IRecipes) => Query('INSERT INTO recipes SET ?', [recipe]);
-- #const update = (updatedRecipe: { title: string, summary: string, directions: string }, id: string) => Query('UPDATE recipes SET ? WHERE id = ?', [updatedRecipe, id]);
-- #const nuke = (id: string) => Query('DELETE from recipes WHERE id = ?', [id]);

-- SELECT 

