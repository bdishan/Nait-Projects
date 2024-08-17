-- ica10 - Dishan Burad
-- use NorthwindTraders
-- go

SELECT 
    CompanyName as 'Company Name',
    ProductName as 'Product Name',
    format(UnitPrice, 'N2')  as 'Unit Price'
from 
    Suppliers as s LEFT JOIN Products as p
    on s.SupplierID = p.SupplierID
ORDER by CompanyName, ProductName 
go

-- q2

SELECT 
    CompanyName as 'Company Name',
    ProductName as 'Product Name',
    format(UnitPrice, 'N2')  as 'Unit Price'
from 
    Suppliers as s LEFT JOIN Products as p
    on s.SupplierID = p.SupplierID
WHERE ProductName is null
ORDER by CompanyName, ProductName 
go

-- q3

SELECT 
    LastName + ', ' + FirstName as 'Name',
    OrderDate as 'Order Date'
from 
    Employees as e LEFT OUTER join Orders as o 
    on e.EmployeeID = o.EmployeeID
WHERE OrderDate is null
go

-- q4

SELECT top 5
    ProductName as 'Product Name',
    Quantity
from 
    Products as p left join [Order Details] as od
    on p.ProductID = od.ProductID
ORDER by Quantity
go

-- q5

SELECT top 10
    CompanyName as 'Company Name',
    ProductName as 'Product Name',
    Quantity
from 
    Suppliers as s LEFT join Products as p 
    on s.SupplierID = p.SupplierID
        left join [Order Details] as od
        on p.ProductID = od.ProductID
ORDER by Quantity, CompanyName DESC
go

-- q6

select
    CompanyName as 'Customer/Supplier with Nothing'
from 
    Customers as c LEFT JOIN Orders as o 
    on c.CustomerID = o.CustomerID
    where o.OrderID is null 
UNION 
SELECT
    CompanyName
from 
    Suppliers as s LEFT JOIN Products as p
    on s.SupplierID = p.SupplierID
    where p.ProductID is null 
ORDER by CompanyName
go

-- q7

select
    'Customer' as "Type",
    CompanyName as 'Customer/Supplier with Nothing'
from 
    Customers as c LEFT JOIN Orders as o 
    on c.CustomerID = o.CustomerID
    where o.OrderID is null 
UNION 
SELECT
    'Suppliers' as "Type",
    CompanyName
from 
    Suppliers as s LEFT JOIN Products as p
    on s.SupplierID = p.SupplierID
    where p.ProductID is null 
ORDER by [Type], CompanyName DESC 
go