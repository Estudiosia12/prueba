package com.amasarte.CommandLineRunner;
import com.amasarte.model.Producto;
import com.amasarte.repository.ProductoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final ProductoRepository productoRepository;

    public DataLoader(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public void run(String... args) {
        if (productoRepository.count() == 0) { // Verifica si no existen productos en la DB
            Producto p1 = new Producto();
            p1.setNombre("Pan Francés");
            p1.setDescripcion("Pan crocante tradicional");
            p1.setPrecio(0.5);
            p1.setImagenUrl("img/PanFrances.jpg");

            Producto p2 = new Producto();
            p2.setNombre("Pan Leña");
            p2.setDescripcion("Pan hecho al horno de leña");
            p2.setPrecio(0.7);
            p2.setImagenUrl("img/pan-leña.jpg");

            Producto p3 = new Producto();
            p3.setNombre("Pan Ciabatta");
            p3.setDescripcion("Pan de estilo italiano");
            p3.setPrecio(1.2);
            p3.setImagenUrl("img/Pan-ciabatta.jpg");

            Producto p4 = new Producto();
            p4.setNombre("Pan Chancay");
            p4.setDescripcion("Pan dulce tradicional");
            p4.setPrecio(0.8);
            p4.setImagenUrl("img/PanChancay.jpg");

            Producto p5 = new Producto();
            p5.setNombre("Torta Chocolate");
            p5.setDescripcion("Deliciosa torta de chocolate");
            p5.setPrecio(35.0);
            p5.setImagenUrl("img/Chocolate.jpeg");

            Producto p6 = new Producto();
            p6.setNombre("Torta Chantilly");
            p6.setDescripcion("Torta con crema chantilly");
            p6.setPrecio(38.0);
            p6.setImagenUrl("img/Chantilly.png");

            Producto p7 = new Producto();
            p7.setNombre("Torta Tres Leches");
            p7.setDescripcion("Bizcocho con tres leches");
            p7.setPrecio(40.0);
            p7.setImagenUrl("img/torta-3-leches.jpg");

            Producto p8 = new Producto();
            p8.setNombre("Budín");
            p8.setDescripcion("Postre tradicional de pan");
            p8.setPrecio(15.0);
            p8.setImagenUrl("img/Budin.jpg");

            // Guarda todos los productos en la base de datos
            productoRepository.saveAll(List.of(p1, p2, p3, p4, p5, p6, p7, p8));
            System.out.println("🟢 Productos insertados en la base de datos.");
        }
    }
}
