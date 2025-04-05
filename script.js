package com.seuprojeto;

import java.io.IOException;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class LoginServlet extends HttpServlet {

    // Configurações do banco
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/consultoria";
    private static final String JDBC_USER = "root";
    private static final String JDBC_PASS = "sua_senha";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASS);

            String sql = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, username);
            stmt.setString(2, password);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                // Login válido
                HttpSession session = request.getSession();
                session.setAttribute("usuario", username);
                response.sendRedirect("dashboard.jsp"); // ou página inicial protegida
            } else {
                // Login inválido
                response.sendRedirect("index.html?erro=1");
            }

            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect("index.html?erro=2");
        }
    }
}
