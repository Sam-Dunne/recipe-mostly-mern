CREATE TABLE users {
    id VARCHAR(36), 
    name VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
	role smallint DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    edited_at TIMESTAMP NULL ON UPDATE NOW(),
    PRIMARY KEY (id)
};

CREATE TABLE recipes (
	id VARCHAR(36) ,
    title VARCHAR(60) NOT NULL,
    summary VARCHAR(250) DEFAULT "Add a Summary",
    directions VARCHAR(500) NOT NULL DEFAULT ' David!!!, Just fold in the cheese',
    ingredients VARCHAR(500),
    userid VARCHAR(36),
    created_at timestamp DEFAULT NOW(),
    edited_at TIMESTAMP NULL ON UPDATE NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users(id)
);

# (Tag) ie., Spicy, Sweet, Savory, Beef, Chicken, 
CREATE TABLE flavor_profiles (
	id INT AUTO_INCREMENT, 
    name VARCHAR(30) NOT NULL UNIQUE,
    _created TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id)  
);

# Many to Many
CREATE TABLE recipe_flavor_profile (
	recipeid INT NOT NULL,
	flavor_profileid INT NOT NULL,
    PRIMARY KEY (recipeid, flavor_profileid),
    FOREIGN KEY (recipeid) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (flavor_profileid) REFERENCES flavor_profiles(id) ON DELETE CASCADE
);