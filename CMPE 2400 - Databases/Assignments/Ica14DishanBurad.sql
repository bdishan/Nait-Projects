-- ica 14 Dishan Burad

-- use dburad1
-- go

-- q1 -- ica14_01

if exists ( select * from sysobjects where name like 'ica14_01' )
	drop procedure ica14_01
go

create procedure ica14_01
@category nvarchar(24) = 'Beverages'
as
select top 1
    CategoryName as 'Category',
    ProductName,
    max(Quantity) as 'Highest Qty'
from
	NorthwindTraders.dbo.Categories c inner join NorthwindTraders.dbo.Products p
	on c.CategoryID = p.CategoryID
        left join NorthwindTraders.dbo.[Order Details] as o
        on p.ProductID = o.ProductID
where CategoryName LIKE @category
group by CategoryName, ProductName
order by max(Quantity) desc
go

exec ica14_01 'Beverages'
GO

-- q2 -- ica14_02

if exists ( select * from sysobjects where name like 'ica14_02' )
	drop procedure ica14_02
go

create procedure ica14_02
@year as int,
@name as varchar(64) OUTPUT,
@freight as money OUTPUT
AS
select top 1
    @name = cast(LastName + ', ' + FirstName as varchar(64)),
    @freight = avg( freight )
from
    NorthwindTraders.dbo.Employees e inner join NorthwindTraders.dbo.Orders o
    on e.EmployeeID = o.EmployeeID
WHERE year( OrderDate ) =  @year
group by LastName, FirstName
order by avg( freight ) desc
GO

DECLARE @I_year as int = 1996
declare @O_name as varchar(64)
declare @O_freight as money
exec ica14_02 @I_year, @name = @O_name out, @freight = @O_freight output
SELECT
    @I_year as 'Year',
    @O_name as 'Name',
    @O_freight as 'Average Freight'
GO


DECLARE @I_year as int = 1997
declare @O_name as varchar(64)
declare @O_freight as money
exec ica14_02 @I_year, @name = @O_name out, @freight = @O_freight output
SELECT
    @I_year as 'Year',
    @O_name as 'Name',
    @O_freight as 'Average Freight'
GO


-- q3-- ica14_03

if exists ( select * from sysobjects where name like 'ica14_03' )
	drop procedure ica14_03
go

create procedure ica14_03
@class_id as int,
@assignmentType as VARCHAR(24) = 'all'
AS
SELECT 
    last_name as 'Last',
    ass_type_desc,
    round(min(coalesce(r.score,0)* 100 / rq.max_score ), 1 ) as 'Low',
    round(max(coalesce(r.score,0)* 100 / rq.max_score ), 1 ) as 'high',
    round( avg( coalesce(r.score,0) * 100 / rq.max_score ), 1 ) as 'avg'
    into -- put results here...
	#StudentSummary -- temp table name, # indicates table in temp DB
FROM 
    ClassTrak.dbo.Students s LEFT join ClassTrak.dbo.Results r
    on s.student_id = r.student_id
        left join ClassTrak.dbo.Requirements rq
        on r.req_id = rq.req_id
            LEFT join ClassTrak.dbo.Assignment_type a
            on rq.ass_type_id = a.ass_type_id
WHERE r.class_id = @class_id
group by last_name, ass_type_desc
-- order by avg( freight ) desc

if @assignmentType like 'ica'
BEGIN
    SELECT * FROM #StudentSummary WHERE ass_type_desc like 'Assignment' ORDER by [avg] desc
END
IF @assignmentType  like 'lab' 
BEGIN
    SELECT * FROM #StudentSummary WHERE ass_type_desc like 'Lab' ORDER by [avg] desc
END
IF @assignmentType  like 'le' 
BEGIN
    SELECT * FROM #StudentSummary WHERE ass_type_desc like 'Lab Exam' ORDER by [avg] desc
END
IF @assignmentType  like 'fe' 
BEGIN
    SELECT * FROM #StudentSummary WHERE ass_type_desc like 'Final' ORDER by [avg] desc
END
GO
-- SELECT @assignmentType
-- CASE
--     WHEN 'ica' THEN "The quantity is greater than 30"
--     WHEN Quantity = 30 THEN "The quantity is 30"
-- END AS QuantityText
-- GO

declare @cid as int
set @cid = 123
exec ica14_03 @cid, 'ica'

set @cid = 123
exec ica14_03 @cid, 'le'
go



-- q4 -- ica14_04

if exists ( select * from sysobjects where name like 'ica14_04' )
	drop procedure ica14_04
go

--create procedure ica14_04

--GO