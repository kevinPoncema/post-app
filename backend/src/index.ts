import  app  from './app'; // Importar la app configurada

const port = 3003;
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
