-- ica01 Dishan Burad

-- Demo 
select
	'Hi' as 'Column Header',
	'There' as 'Second Header'
go

--  Determine the number of days since Star Trek Aired

declare @firstAir as datetime = '8 Sep 1966' -- implicit string  to datetime
declare @numDays as int -- zero by default
-- calculate and save difference
set @numDays = DATEDIFF(day, @firstAir,getdate())
-- display answer
select 
	@numDays as 'Days since Air',
	convert(varchar, @firstAir, 106) + '!!' as 'Original Air Day'
go

-- Get the day of the week of Now and what the Nth Week of it?

select 
	'It''s the ' + 
	datename(week,GETDATE()) as 'N''thWeek of today', -- strings from datenname()
	'It''s the ' +  -- numeric from datepart()
	cast(datepart(week,GETDATE()) as nchar(2)) as'N''thWeek of today',
	'It''s ' + DATENAME(WEEKDAY,GETDATE()) AS 'Today'
go

-- Determine if a supplied name has an even nmber of letters
declare @name as varchar(24) = 'Simone'
declare @evenOdd as char(4)
if len(@name) % 2 <> 0
begin -- multiple statements requre begin/end
	set @evenOdd = 'Odd'
	print 'Odd'
end
else
	set @evenOdd = 'Even'
select
	 @name as 'Selected Name',
	 'has an '+@evenOdd+' number of chars' as 'Answer',
	 cast(@@VERSION as char(25)) as 'Server Version'
go