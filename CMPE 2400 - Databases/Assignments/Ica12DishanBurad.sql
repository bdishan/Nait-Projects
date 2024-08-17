-- ica12 - Dishan Burad
-- use  ClassTrak
-- go

declare @classId as int = 88
select 
    ass_type_desc as 'Type',
     avg(score) as 'Raw Avg',
     avg(score / max_score * 100) as 'Avg',
     count(score / max_score * 100) as 'Num'

FROM 
    Assignment_type as a left JOIN Requirements as rq 
    on a.ass_type_id = rq.ass_type_id
    left JOIN Results as r
    on rq.req_id = r.req_id
where r.class_id = @classId
group by ass_type_desc
ORDER by ass_type_desc
go

-- q2

declare @classId as int = 88
select 
    ass_desc + '(' +ass_type_desc+ ')' as 'Desc(Type)',
    round(avg(score / max_score * 100), 2) as 'Avg',
    count(score / max_score * 100) as 'Num'

FROM 
    Assignment_type as a left JOIN Requirements as rq 
    on a.ass_type_id = rq.ass_type_id
    left JOIN Results as r
    on rq.req_id = r.req_id
where r.class_id = @classId
group by ass_desc, ass_type_desc
having avg(score / max_score * 100) > 57
ORDER by ass_type_desc, ass_desc
go

-- q3

declare @classId as int = 123
select
    last_name as 'Last',
    ass_type_desc,
    round(min(score / max_score * 100),1) as 'Low',
    round(max(score / max_score * 100),1) as 'High',
    round(avg(score / max_score * 100),1) as 'Avg'
FROM 
    Students as s JOIN Results as r
    on s.student_id = r.student_id
        left JOIN Requirements as rq
        on rq.req_id = r.req_id
            left JOIN Assignment_type as a 
            on a.ass_type_id = rq.ass_type_id
where r.class_id = @classId
group by last_name, ass_type_desc
having avg(score / max_score * 100) > 70
ORDER by ass_type_desc,  [Avg]
go


-- q4

select
    last_name as 'Instructor',
    convert(varchar,start_date,106) as 'Start',
    count(all class_to_student_id) as 'Num Registered',
    sum(cast(active as int)) as 'Num Active'
FROM 
    Instructors as i join Classes as c 
    on i.instructor_id = c.instructor_id
        JOIN class_to_student as cs 
        on c.class_id = cs.class_id
group by last_name, start_date
having count(all class_to_student_id) - sum(cast(active as int)) > 3
ORDER by Instructor, start_date
go

-- q5

declare @year as int = '2011'
declare @maxs as int = 40
select
    cast(last_name + ' , ' + first_name as varchar(24)) as 'Student',
    class_desc as 'Class',
    ass_type_desc as 'Type',
    count(score / max_score * 100) as 'Submitted',
    round(avg(score / max_score * 100),1) as 'Avg'
    
FROM 
    Students as s join Results as rs
    on s.student_id = rs.student_id
         join Classes as c 
        on c.class_id = rs.class_id
             join Requirements as r
            on c.class_id = r.class_id
                 JOIN Assignment_type as a 
                on a.ass_type_id = r.ass_type_id
                
where 
    YEAR(start_date) = @year 
    and score is not null
group by last_name, first_name, ass_type_desc, class_desc
having (count(score / max_score * 100) > 10) and (avg(score / max_score * 100) < @maxs)
ORDER by Submitted
go
