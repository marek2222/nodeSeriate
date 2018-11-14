insert nodejs.dbo.Users ( [name],email,username,[password]) 
select                                [name],email,username,[password]  from @tabela

/*  Add table uzytkownicy do DB  */
/*
IF OBJECT_ID (N'Users', N'U') IS NULL 
begin
	SET ANSI_NULLS ON;
	SET QUOTED_IDENTIFIER ON;
	CREATE TABLE nodejs.dbo.Users (
		id                int  IDENTITY(1,1) NOT NULL,
		[name]	      nvarchar(30) NULL,
		email           nvarchar(30) NULL,
		username	nvarchar(30) NULL,
		[password]	        nvarchar(100) NULL
	) ON [PRIMARY];

end
*/