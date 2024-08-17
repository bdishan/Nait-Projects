--  ica08 - Select modifier -  Dishan Burad
-- USE NorthwindTraders
-- go

select top 1
    CompanyName as 'Supplier Company Name',
    Country
from Suppliers
ORDER by Country
go

--  q2

select top 2
    CompanyName as 'Supplier Company Name',
    Country
from Suppliers
ORDER by Country
go

--  q3

SELECT TOP 10 percent 
    ProductName AS 'Product Name',
    UnitsInStock AS 'Units in Stock'
from Products
ORDER by UnitsInStock DESC

--  q4

select 
    CompanyName as 'Customer Company Name',
    Country
from Customers
WHERE CustomerID in 
(
    select top 8
        CustomerID
    from Orders
    ORDER By Freight desc
)
go

--  q5

select 
    CustomerID ,
    OrderID,
    convert(varchar, OrderDate, 106) as 'Order Date'
from Orders
WHERE OrderID in 
(
    select top 3
        OrderID
    from [Order Details]
    ORDER By Quantity desc
)
go

--  q6

select 
    CustomerID ,
    OrderID,
    convert(varchar, OrderDate, 106) as 'Order Date'
from Orders
WHERE OrderID in 
(
    select top 3 with ties
        OrderID
    from [Order Details]
    ORDER By Quantity desc
)
go

--  q7

select 
    CompanyName as 'Supplier Company Name',
    Country
from Suppliers
WHERE SupplierID in 
(
    select
        SupplierID
    from [Products]
    WHERE ProductID in 
    (
        select top 1 percent
            ProductID
        from [Order Details]
        ORDER by (UnitPrice * Quantity) desc
    )
)
go