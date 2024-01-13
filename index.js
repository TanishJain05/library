import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import pg from 'pg';
import path from 'path';
import {join} from 'path';


const app=express();
const db=new  pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'library',
    password: '#Tj0805@no2855',
    port: 5432
})
db.connect();
app.use('/static',express.static(join(process.cwd(),"/public")));
app.use(bodyParser.urlencoded({ extended: true }));
const port =3000;

app.get("/",async (req,res)=>{
    console.log(req.query);
    let isbnNumber;
    if(req.query.rating==='true'){
        isbnNumber=await db.query("Select isbn,title,date,rating from readed_books order by rating desc");
    }
    if(req.query.recency==='true'){
        isbnNumber=await db.query("Select isbn,title,date,rating from readed_books order by date desc");
    }
    if(req.query.rating!=='true' && req.query.recency!==true){
        isbnNumber=await db.query("Select isbn,title,date,rating from readed_books");
    }
    res.render("index.ejs",{images: isbnNumber.rows});
})
app.post("/add",async (req,res)=>{
    const result=req.body.name;
    const isbn=req.body.name[0];
    const title=req.body.name[1];
    const date=req.body.name[2];
    const rating=req.body.name[3];
    const author=req.body.name[4];
    const notes=req.body.name[5];
    try{
        await db.query("INSERT INTO readed_books (isbn,title,date,rating,author) VALUES ($1,$2,$3,$4,$5)",[isbn,title,date,rating,author]);
        await db.query("INSERT INTO book_detail (isbn,notes) VALUES ($1,$2)",[isbn,notes]);
        res.redirect("/");
    }
    catch(error){
        console.log(error);
    }
   
    
})
app.get("/add",async (req,res)=>{
    res.render("add.ejs");
})
app.get("/details/:id",async (req,res)=>{
    const result=await db.query("SELECT r.isbn,r.title,r.date,r.rating,r.author,b.notes from readed_books r JOIN book_detail b ON  r.isbn=b.isbn WHERE r.isbn=$1",[req.params.id]);
    res.render("details.ejs",{item: result.rows[0]});
})
app.post("/edit/:id",async (req,res)=>{
    const isbn=req.params.id;
    const query=req.body.query;
    const updatedValue=req.body.updatedValue;
    try{        
        if(query==='notes'){
            await db.query("UPDATE book_detail SET "+query+"=$1 WHERE isbn=$2",[updatedValue,isbn]);
        }else{
            await db.query("UPDATE readed_books SET "+query+"=$1 WHERE isbn=$2",[updatedValue,isbn]);
        }
        res.redirect("/details/"+isbn);
    }catch(error){
        console.log(error);
    }
})
app.get("/delete/:id",async (req,res)=>{
    const isbn=req.params.id;
    console.log(isbn);
    try{
        await db.query("DELETE FROM book_detail WHERE isbn=$1",[isbn]);
        await db.query("DELETE FROM readed_books WHERE isbn=$1",[isbn]);
        res.redirect("/");
    }catch(error){
        console.log(error);
    }
    
})
app.listen(port,(req,res)=>{
    console.log(`Listening on the port ${port}`);
})