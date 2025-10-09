/*
 * Este archivo se puede usar como referencia para crear el controlador de
 * cualquier entidad del sistema.
 *
 * Por ejemplo, si se necesita crear un controlador para la entidad `Student`,
 * se sugiere hacer Copy & Paste de este archivo y nombrarlo como
 * `studentController.js`.
 *
 * No es necesario renombrar los métodos. A priori, la idea es que todos los
 * controladores tengan estos 5 métodos: index, show, store, update y destroy.
 *
 */

// Store a newly created resource in storage...
async function store(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  // Buscar usuario por email
  const user = await user.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const matchP = await bcrypt.compare(password, hashedPassword);
  if (!matchP) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  return res.status(200).json({ message: "Login exitoso" });

  // Lógica para crear un nuevo token.
  //res.status(201).json({ message: "Token created successfully" });
}

// Otros handlers...
// ...

module.exports = {
  store,
};
