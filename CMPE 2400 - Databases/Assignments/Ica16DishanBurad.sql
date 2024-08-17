-- ica16
-- You will need to install a personal version of the ClassTrak database
-- The Full and Refresh scripts are on the Moodle site.
-- Once installed, you can run the refresh script to restore data that may be modified or 
--  deleted in the process of completing this ica.

use  dburad1-- YOUR_COPY_CLASSTRAK
go


-- q1
-- Complete an update to change all classes to have their descriptions be lower case
-- select all classes to verify your update
UPDATE dburad1_ClassTrak.dbo.Classes
set class_desc = lower(class_desc);
SELECT * FROM dburad1_ClassTrak.dbo.Classes
go

-- q2
-- Complete an update to change all classes have 'Web' in their 
-- respective course description to be upper case
-- select all classes to verify your selective update

update co
set  course_desc = upper(course_desc)
FROM 
    dburad1_ClassTrak.dbo.Classes c LEFT JOIN dburad1_ClassTrak.dbo.Courses co
    on c.course_id = co.course_id
WHERE course_desc like '%Web%'

SELECT * 
FROM 
    dburad1_ClassTrak.dbo.Classes c LEFT JOIN dburad1_ClassTrak.dbo.Courses co
    on c.course_id = co.course_id
WHERE course_desc like '%Web%'
go

-- q3
-- For class_id = 123
-- Update the score of all results which have a real percentage of less than 50
-- The score should be increased by 10% of the max score value, maybe more pass ?
-- Use ica13_06 select statement to verify pre and post update values,
--  put one select before and after your update call.
DECLARE @class_id as int = '123'
select 
	at.ass_type_desc as 'Type',
	round(avg( score ),2) as 'Raw Avg',
	round(avg( score * 100 / max_score ),2) as 'Avg',
	count( score ) as 'Num'
from
	ClassTrak.dbo.Results r inner join ClassTrak.dbo.Requirements q
	on r.req_id = q.req_id
		inner join ClassTrak.dbo.Assignment_type at
		on q.ass_type_id = at.ass_type_id
where
	r.class_id = @class_id
group by at.ass_type_desc
order by ass_type_desc

-- SELECT avg(score*100/max_score) ,avg(score)
-- FROM 
--     dburad1_ClassTrak.dbo.Results r left JOIN dburad1_ClassTrak.dbo.Requirements rq
--     on r.req_id = rq.req_id

UPDATE r
set score = score + (0.1 * max_score)
FROM 
    dburad1_ClassTrak.dbo.Results r left JOIN dburad1_ClassTrak.dbo.Requirements rq
    on r.req_id = rq.req_id
where r.class_id = 123 and score is not NULL and (score*100/max_score) < 50

-- SELECT avg(score*100/max_score) ,avg(score)
-- FROM 
--     dburad1_ClassTrak.dbo.Results r left JOIN dburad1_ClassTrak.dbo.Requirements rq
--     on r.req_id = rq.req_id

select 
	at.ass_type_desc as 'Type',
	round(avg( score ),2) as 'Raw Avg',
	round(avg( score * 100 / max_score ),2) as 'Avg',
	count( score ) as 'Num'
from
	ClassTrak.dbo.Results r inner join ClassTrak.dbo.Requirements q
	on r.req_id = q.req_id
		inner join ClassTrak.dbo.Assignment_type at
		on q.ass_type_id = at.ass_type_id
where
	r.class_id = @class_id
group by at.ass_type_desc
order by ass_type_desc

go