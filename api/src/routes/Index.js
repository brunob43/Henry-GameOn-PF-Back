//<<<<<<< rama-4









soy la modificación de franco
=======
router.put("/:id", async (req, res) => {
  try {
    const { ID, ID_Usuario, Nombre, Email, Imagen, Type } = req.body;

    await Videogame.update(
      {
        ID,
        ID_Usuario,
        Nombre,
        Apellido,
        Email,
        Imagen,
        Type,
      },
    );
    res.status(200).send("se actualizo tu juego");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//hola
//>>>>>>> develop
