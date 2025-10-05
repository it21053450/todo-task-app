IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TodoDb')
BEGIN
    CREATE DATABASE TodoDb;
END
GO

USE TodoDb;
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Task]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Task](
        [Id] [int] IDENTITY(1,1) NOT NULL,
        [Title] [nvarchar](100) NOT NULL,
        [Description] [nvarchar](500) NULL,
        [CreatedAt] [datetime2](7) NOT NULL,
        [IsCompleted] [bit] NOT NULL,
        CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED ([Id] ASC)
    );
END
GO