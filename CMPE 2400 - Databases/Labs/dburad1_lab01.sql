

-- create database dburad1_Lab01
-- go

-- drop database dburad1_Lab01
-- go

-- if exists
-- (
-- 	select *
-- 	from sysdatabases
-- 	where [name] = 'dburad1_Lab01'
-- )
-- drop database dburad1_Lab01
-- go

-- create database dburad1_Lab01
-- go

use dburad1_Lab01
go

--Adding Tables (make the desired database the current one)
--Here are my sentinels!
if exists
(
    select [name]
    from dburad1_Lab01.dbo.sysobjects
    where [name] = 'Sessions'
)
drop table Sessions
go
if exists
(
    select [name]
    from dburad1_Lab01.dbo.sysobjects
    where [name] = 'Bikes'
)
drop table Bikes
go
if exists
(
select [name]
from dburad1_Lab01.dbo.sysobjects
where [name] = 'Riders'
)
drop table Riders
go
if exists
(
select [name]
from dburad1_Lab01.dbo.sysobjects
where [name] = 'Class'
)
drop table Class
go
--End of Sentinels

--CREATE TABLES

create table Class
(
ClassID nchar(6) not null constraint PK_ClassID primary key,
ClassDescription nvarchar(50) not null
)
go

create table Riders
(
RiderID int identity(10,1) not null constraint PK_RiderID primary key,
[Name] nvarchar(50) not null constraint CK_Name check(len([Name])>4),
ClassID nchar(6) null constraint FK_ClassID foreign key
references Class(ClassID) on delete no action
)
go
--
create table Bikes
(
BikeID nchar(6) not null constraint CK_BikeID
check(BikeID like '[0-9][0-9][0-9][HYS]-[AP]')
primary key,
StableDate date not null constraint DF_StableDate default getdate()

)
go

--
create table Sessions
(
RiderID int not null,
BikeID nchar(6) not null ,
SessionDate datetime not null constraint CK_Date check(SessionDate > '1 Sep 2019'),
Laps int null,
primary key(RiderID,BikeID,SessionDate),
--index Sessions_IND on Sessions(RiderID,BikeID)
)
go
create nonclustered index SessionIndex on
Sessions(RiderID,BikeID)



--ALTER TABLES
alter table Sessions
add
constraint CK_Laps check(Laps>9),
constraint FK_Sessions_RiderID foreign key (RiderID)
references Riders(RiderID) on delete no action,
constraint FK_BikeID foreign key (BikeID)
references Bikes(BikeID) on delete no action
go