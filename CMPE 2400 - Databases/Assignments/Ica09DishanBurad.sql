-- ica09 - Dishan Burad
-- use NorthwindTraders
-- go

declare @usa as VARCHAR(3) = 'USA';

SELECT 
    CompanyName as 'Company Name',
    ProductName as 'Product Name',
    UnitPrice as 'Unit Price'
FROM Suppliers as s inner join Products as p
     on s.SupplierID = p.SupplierID
WHERE Country in (@usa)
order by
	CompanyName, ProductName 
go

-- q2

declare @employee as VARCHAR(4) = 'ul';

SELECT
	LastName + ', ' + FirstName as 'Name',
	TerritoryDescription as 'Territory Description'
from
	Employees as e inner join EmployeeTerritories et
	on e.EmployeeID = et.EmployeeID
		inner join Territories as t
		on t.TerritoryID = et.TerritoryID
where
    LastName like '%'+@employee+'%'
order by
	TerritoryDescription
go

-- q3

DECLARE @country as VARCHAR(6) = 'Sweden'
select 
	distinct cu.CustomerID as 'Customer ID',
	ProductName as 'Product Name'	
from	
	Customers as cu inner join Orders ord
	on cu.CustomerID = ord.CustomerID
		inner join [Order Details] as ordt
		on ord.OrderID = ordt.OrderID
			inner join Products as p
			on ordt.ProductID = p.ProductID
where
	ProductName LIKE '[u-z]%' and Country like @country
order by
	ProductName
GO

-- q4

DECLARE @sell as int = 69
select 
	distinct CategoryName as 'Category Name',
	p.UnitPrice as 'Product Price',
	ordt.UnitPrice as 'Selling Price'	
from	
	Categories as ca inner join Products p
	on ca.CategoryID = p.CategoryID
		inner join [Order Details] as ordt
		on p.ProductID = ordt.ProductID
where
	ordt.UnitPrice > @sell and  ordt.UnitPrice not LIKE p.UnitPrice
order by
	[Selling Price]
GO

-- q5

DECLARE @sell as int = 8
select 
	ShipName as 'Shipper',
	ProductName as 'Product Name'
from	
	[Order Details] as ordt inner join Products p
		on p.ProductID = ordt.ProductID
		inner join Orders as o
			on o.OrderID = ordt.OrderID
		
where
	DATEADD(day,@sell,RequiredDate) < ShippedDate  and  Discontinued = 1
order by
	ShipName
GO