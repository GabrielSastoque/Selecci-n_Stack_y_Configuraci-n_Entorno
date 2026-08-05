const express=require('express');
const app=express();
const cesar=['Entrenar', 'Comer', 'Dormir', 'Entrenar', 'Solo entrenar'];
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
    res.render('index', {nombre: 'Gabriel Arturo',cesar});
}
)

app.listen(3000, ()=>console.log("Servidor en http://localhost:3000"));