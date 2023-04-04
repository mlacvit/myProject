create database if not exists news;

use news;

create table news_go (
    id int not null auto_increment primary key,
    title varchar(255) not null,
    content text not null,
    image varchar(255) null,
    date text null
);

create table comments (
    id int not null auto_increment primary key,
    author varchar(255) not null,
    comment text null,
    news_id int not null,
    constraint item_news_comment_id_fk
    foreign key (news_id) references  news_go(id)
    on update cascade on DELETE cascade
);

insert into news_go(title, content, image)
values ('News One', 'jkvdsjkdsvjkvdsjkkjdsvvbjvddvs', 'null'),
       ('News two', 'ncasjknxaanasnkacskkcaskklhlkhcasklhacsklhklhacs', 'null'),
       ('News Three', 'bjcsnacsknllkncaslkacskjacsjbkacsbkacsbscajbcasbjkcasjbkcsbjkbjcasknlkasc', 'null');

insert into comments(author, comment, news_id)
values ('John', 'ndndndnndn', 1),
       ('Sarah', 'bjbnnnnnnncnncnnc', 2),
       ('hghgh', 'nfjfjfjfjjfjjfjjfjjfjjjf', 3);

SELECT * FROM news_go;