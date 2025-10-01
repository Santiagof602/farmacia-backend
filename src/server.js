const pp = express();
4;
app.use(express.json());
app.get("/", (req, res) => res.json, { ok: true, Message: "API ok" });
{
  app.use("/api/users", userRoutes);
  app.use("/api/articles", articleRoutes);
  const PORT = process.env.PORT || 3000;
  (async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection a MYSQL");
      await sequelize.sync({ force: false });
      console.log("Modleos Sincronizados");
      app.listen(PORT, () => console.log(`Server on port ${PORT}`));
    } catch (error) {
      console.log("Error: no se puede inisia3 la app ", error);
      process.exit(1);
    }
  })();
}
