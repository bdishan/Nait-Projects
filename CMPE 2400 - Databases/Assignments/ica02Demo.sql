-- ica01Demo

-- Determine the number of days since Star Trek Aired
declare @firstAir as datetime = '8 Sep 1966' -- implicit string to datetime
declare @numDays as int -- zero by default
-- calculate and save difference
set @numDays = DATEDIFF( day, @firstAir, getdate())
-- display answer
select
	@numDays as 'Days since Air',
	convert( varchar(6), @firstAir, 106) + '!!' as 'Original Air Date'
go

-- Get the day of week of NOW and what the Nth Week of it ?
select
	'It''s the ' + 
	datename( week, getdate()) as 'Nth Week of today', -- strings from datename()
	'It''s the ' + -- numeric from datepart()
	cast(datepart( week, getdate()) as nchar(2)) as 'Nth Week of today',
	'It''s ' + datename( weekday, getdate()) as 'Today'
go

-- Determine if a supplied name has an even number of letters
declare @name as varchar(24) = 'Simone'
declare @evenOdd as char(4)
if LEN( @name ) % 2 <> 0
begin -- multiple statements require begin/end
	set @evenOdd = 'Odd'
	print 'Odd'
end
else -- single statements don't
	set @evenOdd = 'Even'
select
	@name as 'Selected Name',
	'has an ' + @evenOdd + ' number of chars' as 'Answer',
	cast(@@VERSION as char(24)) as 'Server Version'
go