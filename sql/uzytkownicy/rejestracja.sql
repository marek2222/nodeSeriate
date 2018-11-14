insert nodejs.dbo.[_b_Uzytkownicy] ( nazwa,email,uzytkownik,haslo) 
select                                                  nazwa,email,uzytkownik,haslo  from @tabela

/*  Add table uzytkownicy do DB  */
/*
IF OBJECT_ID (N'_b_Uzytkownicy', N'U') IS NULL 
begin
	SET ANSI_NULLS ON;
	SET QUOTED_IDENTIFIER ON;
	CREATE TABLE nodejs.[dbo].[_b_Uzytkownicy](
		id		int  IDENTITY(1,1) NOT NULL,
		nazwa	nvarchar(30) NULL,
		email	   nvarchar(30) NULL,
		uzytkownik	    nvarchar(30) NULL,
		haslo	    nvarchar(100) NULL
	) ON [PRIMARY];

end
*/
