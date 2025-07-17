create database productivity_dashboard
    with
    owner = postgres
    encoding = 'utf8'
    locale_provider = 'libc'
    connection limit = -1
    is_template = false;

create table users (
  id serial primary key,
  name varchar(100),
  email varchar(100) unique not null,
  password_hash varchar(255) not null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

create table todos (
  id serial primary key,
  user_id int references users(id),
  title varchar(255),
  is_completed boolean default false,
  created_at timestamp default current_timestamp,
  due_date date
);

create table notes (
  id serial primary key,
  user_id int references users(id),
  title varchar(255),
  content text,
  created_at timestamp default current_timestamp,
  uupdated_at timestamp default current_timestamp
);

create table pomodoro_sessions (
  id serial primary key,
  user_id int references users(id),
  task_name varchar(255),
  duration_minutes int,
  completed boolean default true,
  session_date date default current_date
);

create table quote_views (
  id serial primary key,
  user_id int references users(id),
  quote_text text,
  author varchar(100),
  viewed_at timestamp default current_timestamp
);

create table weather_logs (
  id serial primary key,
  user_id int references users(id),
  city varchar(100),
  temperature decimal,
  weather_condition varchar(50),
  logged_at timestamp default current_timestamp
);