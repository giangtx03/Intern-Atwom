package com.pitchmanagement.config;

public class WebSecurityConfig {
<<<<<<< HEAD

    private final UserDetailsService userDetailsService;
    private final AuthEntryPointJwt unauthorizedHandler;
    private final AuthTokenFilter authTokenFilter;

    @Value("${api.prefix}")
    private String apiPrefix;

    private String[] whiteList;
    @PostConstruct
    public void init() {
        whiteList = new String[] {
                String.format("public/%s/products/**", apiPrefix),
                String.format("public/%s/users/**", apiPrefix),
                String.format("public/%s/categories/**", apiPrefix)
        };
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(authenticationProvider())
                .authorizeHttpRequests(request ->{
                    request
                            .requestMatchers(
                                    whiteList
                            ).permitAll()
                            .anyRequest().authenticated();
                })
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .cors(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){

        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());

        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {
        return configuration.getAuthenticationManager();
    }
=======
>>>>>>> 3392bdb00c301f4c71ae0eb16cd66461eb9e44b9
}
