CREATE TABLE customer (
customer_id SERIAL PRIMARY KEY,
enquiry_id INT,
customer_type VARCHAR(20),
role VARCHAR(50),
contact VARCHAR(100),
name VARCHAR(255),
user_id INT,
createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP + INTERVAL '5 hours 30 minutes' NOT NULL,
updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP + INTERVAL '5 hours 30 minutes' NOT NULL
);

CREATE TABLE Load (
ops_load_id VARCHAR(255) PRIMARY KEY,
created_by INT,
load_id STRING,
from_city VARCHAR(255),
from_pin INTEGER,
to_city VARCHAR(255),
to_pin INTEGER,
image_urls VARCHAR(255)[],
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
length FLOAT,
width FLOAT,
height FLOAT,
weight FLOAT,
FOREIGN KEY (created_by) REFERENCES customer(customer_id)
);

CREATE TABLE Space (
ops_space_id VARCHAR(255) PRIMARY KEY,
created_by INT,
space_id STRING,
from_city VARCHAR(255),
from_pin INTEGER,
to_city VARCHAR(255),
to_pin INTEGER,
image_urls VARCHAR(255)[],
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
length FLOAT,
width FLOAT,
height FLOAT,
weight FLOAT,
FOREIGN KEY (created_by) REFERENCES customer(customer_id)
);

CREATE TABLE Employee (
emp_id INT PRIMARY KEY,
name VARCHAR(255),
contact VARCHAR(20),
password VARCHAR(255),
role VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Match (
match_id SERIAL PRIMARY KEY,
enquiry_id INTEGER,
by_customer_id INTEGER REFERENCES customer(customer_id),
to_customer_id INTEGER REFERENCES customer(customer_id),
for_ops_load_id VARCHAR(255) REFERENCES Load(ops_load_id),
for_ops_space_id VARCHAR(255) REFERENCES Space(ops_space_id),
is_hard_match BOOLEAN DEFAULT FALSE,
assigned_to INTEGER REFERENCES Employee(emp_id),
confirmation_status VARCHAR(50) DEFAULT 'pending',
confirmation_time TIMESTAMP WITH TIME ZONE,
createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP + INTERVAL '5 hours 30 minutes' NOT NULL,
updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP + INTERVAL '5 hours 30 minutes' NOT NULL
);

# accessing db in docker:

    - psql -U postgres -d lite-admin-panel

Once connected, you can list databases using the command: - \l

To list tables in the current database, use the command: - \dt
