const express=require('express');
const app=express();
const cesar=['Entrenar', 'Comer', 'Dormir', 'Entrenar', 'Solo entrenar'];
app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req,res)=>{
    res.render('index', {nombre: ' 卐Gabriel Arturo卐 ',cesar});
}
)

app.listen(3000, ()=>console.log("Servidor en http://localhost:3000"));