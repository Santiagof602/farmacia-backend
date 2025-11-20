import React, { useState, useEffect } from 'react';
import ProductoCarrousel from '../Components/ProductoCarrousel';
import CarrouselPubli from '../Components/CarrouselPubli';
import BannerCarrousel from '../Components/BannerCarrousel';
import { articleService } from '../services/api';

function Inicio() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar productos desde el backend
    const fetchProductos = async () => {
      try {
        const articles = await articleService.getAll();
        // Transformar los artículos al formato esperado por ProductoCarrousel
        const productosFormateados = articles.map(article => ({
          id: article.id,
          image: article.image,
          name: article.name,
          price: article.price
        }));
        setProductos(productosFormateados);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        alert('No se pudieron cargar los productos. Asegúrate de que el backend esté corriendo.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  return (
    <>
      <CarrouselPubli />

      <ProductoCarrousel
        title="Productos Disponibles"
        products={productos}
      />

      <BannerCarrousel />

      {productos.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">
            📦 Mostrando {productos.length} producto(s) de ejemplo.
            <br />
            
          </p>
        </div>
      )}
    </>
  );
}

export default Inicio;
