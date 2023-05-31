

sequelize model:generate --name users --attributes firstName:string,lastName:string,password:string,email:string
sequelize model:generate --name blogs --attributes title:string,body:text,userID:integer,is_published:boolean