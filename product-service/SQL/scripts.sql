create table products (
	id uuid not null default uuid_generate_v1() primary key,
	title text not null,
	description text,
	price integer default 0
);

create table stocks(
	stocks_id uuid not null default uuid_generate_v1() primary key, 
	count integer default 1,
	product_id uuid,
	foreign key(product_id) references products(id)
	on delete cascade
	on update cascade
)

insert into products 
	(title, description, price)
values 
	('Think and Grow Rich', 'Think and Grow Rich: The Landmark Bestseller Now Revised and Updated for the 21st Century (Think and Grow Rich Series)', 15),
	('Critical Thinking & Logic Mastery', 'Critical Thinking & Logic Mastery - 3 Books In 1: How To Make Smarter Decisions, Conquer Logical Fallacies And Sharpen Your Thinking', 10),
	('The Secret Life of Groceries', 'The Secret Life of Groceries: The Dark Miracle of the American Supermarket', 19),
	('Atomic Habits', 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones', 18),
	('The Power of Your Subconscious Mind', 'In The Power of Your Subconscious Mind, Dr. Joseph Murphy gives you the tools you will need to unlock the awesome powers of your subconscious mind.', 11),
	('The 30-Minute Mediterranean Diet Cookbook', 'The 30-Minute Mediterranean Diet Cookbook: 101 Easy, Flavorful Recipes for Lifelong Health', 6),
	('The Viking Heart', 'The Viking Heart: How Scandinavians Conquered the World', 16),
	('The Body Keeps the Score', 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma', 12),
	('How the World Really Works', 'How the World Really Works: The Science Behind How We Got Here and Where We are Going', 10),
	('I Can Do Hard Things', 'I Can Do Hard Things: Mindful Affirmations for Kids', 23)

-- products table now contains 10 records
select * from products;

insert into stocks
	(product_id, count)
values
	('5137c812-0760-11ed-9449-068dcf8b75f1', 1),
	('5137c812-0760-11ed-9449-068dcf8b75f1', 2),
	('5137c812-0760-11ed-9449-068dcf8b75f1', 5),
	('5137c812-0760-11ed-9449-068dcf8b75f1', 6),
	('5137c812-0760-11ed-9449-068dcf8b75f1', 7),
	('5137c812-0760-11ed-9449-068dcf8b75f1', 8),
	('5137c812-0760-11ed-9449-068dcf8b75f1', 15),
	('5137c812-0760-11ed-9449-068dcf8b75f1', 3),
	('5137c812-0760-11ed-9449-068dcf8b75f1', 1),
	('5137c812-0760-11ed-9449-068dcf8b75f1', 1)


-- stocks table now contains 10 records
select * from stocks;

/*
    After removing product record with id='92e1d6e6-0764-11ed-a4e4-068dcf8b75f1' from products table, 
    record with FK product_id='92e1d6e6-0764-11ed-a4e4-068dcf8b75f1' form stock will be removed automatically (on delete cascade) 
*/
delete from products where id='92e1d6e6-0764-11ed-a4e4-068dcf8b75f1';

-- products table now contains 9 records
select * from products;

-- stocks table now contains 9 records
select * from stocks;

-- INNER JOIN between products and stocks table
select id, count, price, title, description from products inner join stocks on products.id = stocks.product_id;

select id, count, price, title, description from products inner join stocks on products.id = stocks.product_id and id='5137c812-0760-11ed-9449-068dcf8b75f1';
