

/*  Create datase 'nodejs' and add three record do DB  */
/*
CREATE DATABASE [nodejs]
go
use nodejs;
go

IF OBJECT_ID (N'Artykuly', N'U') IS NULL 
begin
	SET ANSI_NULLS ON;
	SET QUOTED_IDENTIFIER ON;
	CREATE TABLE nodejs.[dbo].[Artykuly](
		id		int  NULL, /*IDENTITY(1,1) NOT NULL,*/
		tytul		nvarchar(50) NULL,
		autor	   nvarchar(50) NULL,
		cialo		nvarchar(50) NULL
	) ON [PRIMARY];

	insert into nodejs.[dbo].[Artykuly] (id,tytul,autor,cialo)
			    select id= 1,tytul= 'Artykuł jeden',	autor= 'Brad Traversy',cialo= 'To jest artykuł jeden'
	union   select id= 2,tytul= 'Artykuł dwa',		autor= 'John Doe',		 cialo= 'To jest artykuł dwa'
	union   select id= 3,tytul= 'Artykuł trzy',   autor= 'Brad Traversy',cialo= 'To jest artykuł trzy'
	
end
*/