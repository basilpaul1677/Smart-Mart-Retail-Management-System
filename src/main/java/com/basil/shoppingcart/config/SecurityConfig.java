package com.basil.shoppingcart.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.basil.shoppingcart.security.JwtAuthenticationEntryPoint;
import com.basil.shoppingcart.security.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig 
{
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationEntryPoint authenticationEntryPoint;

        @Bean
        SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception 
        {

        http.csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session ->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .authorizeHttpRequests(auth -> auth
                    .requestMatchers(
                            "/api/auth/**",
                            "/swagger-ui/**",
                            "/swagger-ui.html",
                            "/v3/api-docs/**"
                    ).permitAll()
                    .anyRequest().authenticated())
                    .authenticationProvider(authenticationProvider)
                    .addFilterBefore(jwtAuthenticationFilter,UsernamePasswordAuthenticationFilter.class)
                    .httpBasic(httpBasic -> httpBasic.disable())
                    .formLogin(form -> form.disable());

                return http.build();
        }

}