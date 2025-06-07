package com.Login.Backend.auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.Login.Backend.auth.exceptions.RESTAuthenticationEntryPoint;
import com.Login.Backend.auth.helper.JWTTokenHelper;

import static org.springframework.security.config.Customizer.withDefaults;

// Configuración de seguridad de la aplicación Spring Boot que combina autenticación JWT y OAuth2
@Configuration // Indica que esta clase contiene configuraciones de Spring
@EnableWebSecurity // Habilita la configuración personalizada de seguridad web
public class WebSecurityConfig {

        @Autowired
        private UserDetailsService userDetailsService;

        @Autowired
        private JWTTokenHelper jwtTokenHelper;

        @Autowired
        private RESTAuthenticationEntryPoint restAuthenticationEntryPoint;

        // Rutas públicas que no reuieren autenticación
        private static final String[] publicApis = {
                        "/api/auth/**"
        };

        // Configuración del filtro de seguridad
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http.cors(withDefaults())

                                .csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests((authorize) -> authorize
                                                .requestMatchers("/v3/api-docs/**", "/swagger-ui.html",
                                                                "/swagger-ui/**", "/test/**")
                                                .permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/products/**", "/api/category/**",
                                                                "/api/discounts/**", "api/brands/**",
                                                                "/admin/**", "/api/admin/config/**", "/api/address/**")
                                                .permitAll()
                                                .requestMatchers(HttpMethod.POST, "/api/products", "/api/category",
                                                                "/api/discounts", "api/brands",
                                                                "/api/admin/config/**", "/api/address/**")
                                                .permitAll()
                                                .requestMatchers(HttpMethod.DELETE, "/api/products/**",
                                                                "/api/category/**", "/api/discounts/**",
                                                                "api/brands/**",
                                                                "/api/admin/config/**", "/api/address/**")
                                                .permitAll()
                                                .requestMatchers(HttpMethod.PUT, "/api/products/**", "/api/category/**",
                                                                "/api/discounts/**", "api/brands/**",
                                                                "/api/admin/config/**", "/api/address/**")
                                                .permitAll()
                                                .requestMatchers("/oauth2/success").permitAll()
                                                .anyRequest().authenticated())
                                .exceptionHandling(exception -> exception
                                                .authenticationEntryPoint(restAuthenticationEntryPoint))
                                .oauth2Login((oauth2login) -> oauth2login
                                                .defaultSuccessUrl("/oauth2/success")
                                                .loginPage("/oauth2/authorization/google"))
                                .addFilterBefore(new JWTAuthenticationFilter(jwtTokenHelper, userDetailsService),
                                                UsernamePasswordAuthenticationFilter.class);
                return http.build();
        }

        // Excluye completamente las rutas públicas del sistema de seguridad
        @Bean
        public WebSecurityCustomizer webSecurityCustomizer() {
                return (web) -> web.ignoring().requestMatchers(publicApis);
        }

        // Configura el proveedor de autenticación con:
        // UserDetailsService (para cargar usuarios)
        // PasswordEncoder (para verificar contraseñas)
        @Bean
        public AuthenticationManager authenticationManager() {
                DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
                daoAuthenticationProvider.setUserDetailsService(userDetailsService);
                daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
                return new ProviderManager(daoAuthenticationProvider);
        }

        // Provee un encoder de contraseñas moderno y flexible
        @Bean
        public PasswordEncoder passwordEncoder() {
                return PasswordEncoderFactories.createDelegatingPasswordEncoder();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.addAllowedOrigin("http://localhost:3000"); // URL del fronted
                configuration.addAllowedMethod("*"); // GET, POST, OPTIONS, PUT, DELETE
                configuration.addAllowedHeader("*"); // Authorization, Content-Type, etc.
                configuration.setAllowCredentials(true); // Si usás cookies o auth headers

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}
