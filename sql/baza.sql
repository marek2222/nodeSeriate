

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
		id		int  IDENTITY(1,1) NOT NULL,
		tytul		nvarchar(20) NULL,
		autor	   nvarchar(30) NULL,
		cialo		nvarchar(50) NULL
	) ON [PRIMARY];

	insert into nodejs.[dbo].[Artykuly] (tytul,autor,cialo)
			    select tytul= 'Artykuł jeden',	autor= 'Brad Traversy',cialo= 'To jest artykuł jeden'
	union   select tytul= 'Artykuł dwa',		autor= 'John Doe',		 cialo= 'To jest artykuł dwa'
	union   select tytul= 'Artykuł trzy',   autor= 'Brad Traversy',cialo= 'To jest artykuł trzy'
	
end
*/