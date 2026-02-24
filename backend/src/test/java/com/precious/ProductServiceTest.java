package com.precious;

import com.precious.model.Product;
import com.precious.repository.ProductRepository;
import com.precious.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product product;

    @BeforeEach
    void setUp() {
        product = Product.builder()
                .id(1L)
                .name("Diamond Ring")
                .description("18k gold diamond ring")
                .price(new BigDecimal("9999.99"))
                .category("Jewelry")
                .available(true)
                .build();
    }

    @Test
    void getAllProducts_returnsList() {
        when(productRepository.findByAvailableTrue()).thenReturn(List.of(product));

        List<Product> result = productService.getAvailableProducts();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getName()).isEqualTo("Diamond Ring");
    }

    @Test
    void getProductById_returnsProduct() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        Product result = productService.getProductById(1L);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
    }

    @Test
    void createProduct_savesAndReturns() {
        when(productRepository.save(product)).thenReturn(product);

        Product result = productService.createProduct(product);

        assertThat(result.getName()).isEqualTo("Diamond Ring");
        verify(productRepository, times(1)).save(product);
    }

    @Test
    void deleteProduct_callsRepository() {
        doNothing().when(productRepository).deleteById(1L);

        productService.deleteProduct(1L);

        verify(productRepository, times(1)).deleteById(1L);
    }
}
