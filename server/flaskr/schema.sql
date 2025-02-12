drop table if exists user;
drop table if exists post;

create table  user(
    id integer primary key autoincrement,
    username text unique not null,
    passward text not null,
    follow_num int not null,
    follower_num int not null
);


create table post(
    id integer primary key autoincrement,
    author_id int not null,
    img int,
    created timestamp not null default current_timestamp,
    content text not null,
    tags text not null,
    foreign key (author_id) references user (id) 
)

s