import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { username?: string; email?: string; password?: string } = {};

    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // тут можна викликати API для реєстрації
      console.log("Registered:", { username, email, password });

      // після успішної реєстрації переводимо користувача
      navigate("/user");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "black",
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={0} sx={{ p: 4, bgcolor: "#141414", color: "white" }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: "red", fontWeight: "bold" }}>
            Register
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Username"
              variant="filled"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={Boolean(errors.username)}
              helperText={errors.username}
              sx={{
                "& .MuiFilledInput-root": { bgcolor: "#1f1f1f", color: "white" },
                "& .MuiInputLabel-root": { color: "#aaa" },
              }}
            />

            <TextField
              label="Email"
              type="email"
              variant="filled"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
              sx={{
                "& .MuiFilledInput-root": { bgcolor: "#1f1f1f", color: "white" },
                "& .MuiInputLabel-root": { color: "#aaa" },
              }}
            />

            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              sx={{
                "& .MuiFilledInput-root": { bgcolor: "#1f1f1f", color: "white" },
                "& .MuiInputLabel-root": { color: "#aaa" },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: "red",
                "&:hover": { bgcolor: "#cc0000" },
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
