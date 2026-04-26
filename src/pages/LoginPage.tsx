import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import authService from "../services/auth.service";
import { Button } from "../components/ui/Button";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Seo from '../components/Seo';
import Text from "../components/ui/Text";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

const schema = z.object({
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters").max(20, "Password must be less than 20 characters"),
});

type Inputs = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
    const [serverError, setServerError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setServerError("");
        setIsLoading(true);
        try {
            const res = await authService.login({ email: data.email, password: data.password });
            dispatch(
                setCredentials({
                    user: {
                        email: res.data.data.user.email,
                        name: res.data.data.user.name
                    },
                    accessToken: res.data.data.accessToken,
                    refreshToken: res.data.data.refreshToken,
                })
            );
            console.log("Response:", res.data);
            navigate("/features");
        } catch (err: unknown) {
            if (typeof err === "object" && err !== null && "response" in err) {
                const axiosErr = err as { response?: { data?: { message?: string } } };
                setServerError(axiosErr.response?.data?.message || "Login failed");
            } else {
                setServerError("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Seo title="Login | MediaShelf" description="Sign in to your MediaShelf account." />
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-full md:flex md:min-h-screen">
                    {/* Left side - Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="hidden md:flex md:w-1/2 bg-primary/5 items-center justify-center p-8"
                    >
                        <div className="max-w-md text-center">
                            <Text label="MediaShelf" className="text-4xl font-bold text-primary mb-6" />
                            <h2 className="text-3xl font-semibold text-foreground mb-4">
                                Welcome back to MediaShelf
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                Continue organizing your media collection. Sign in to access your personalized dashboard and discover new content.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right side - Login form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8"
                    >
                        <div className="w-full max-w-md">
                            <div className="text-center mb-8 md:hidden">
                                <Link to="/">
                                    <Text label="MediaShelf" className="text-3xl font-bold text-primary mb-2" />
                                </Link>
                                <h2 className="text-2xl font-semibold text-foreground">Sign in to your account</h2>
                                <p className="text-muted-foreground mt-2">Welcome back</p>
                            </div>

                            <div className="bg-card rounded-lg shadow-lg p-8">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <TextField
                                                id="email"
                                                label="Email address"
                                                type="email"
                                                placeholder="Enter your email"
                                                fullWidth
                                                variant="outlined"
                                                error={!!errors.email}
                                                helperText={errors.email?.message}
                                                {...register('email')}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        backgroundColor: 'var(--card)',
                                                        '& fieldset': {
                                                            borderColor: 'var(--border)',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: 'var(--ring)',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: 'var(--ring)',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'var(--foreground)',
                                                        '&.Mui-focused': {
                                                            color: 'var(--ring)',
                                                        },
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        color: 'var(--foreground)',
                                                    },
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <TextField
                                                id="password"
                                                label="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter your password"
                                                fullWidth
                                                variant="outlined"
                                                error={!!errors.password}
                                                helperText={errors.password?.message}
                                                {...register("password")}
                                                slotProps={{
                                                    input: {
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                                    edge="end"
                                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                                >
                                                                    {showPassword ? <HiOutlineEyeSlash className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                                                            sx={{
                                                                                '& .MuiOutlinedInput-root': {
                                                                                    backgroundColor: 'var(--card)',
                                                                                    '& fieldset': {
                                                                                        borderColor: 'var(--border)',
                                                                                    },
                                                                                    '&:hover fieldset': {
                                                                                        borderColor: 'var(--ring)',
                                                                                    },
                                                                                    '&.Mui-focused fieldset': {
                                                                                        borderColor: 'var(--ring)',
                                                                                    },
                                                                                },
                                                                                '& .MuiInputLabel-root': {
                                                                                    color: 'var(--foreground)',
                                                                                    '&.Mui-focused': {
                                                                                        color: 'var(--ring)',
                                                                                    },
                                                                                },
                                                                                '& .MuiInputBase-input': {
                                                                                    color: 'var(--foreground)',
                                                                                },
                                                                            }}
                                                                        />
                                        </div>
                                    </div>

                                    {serverError && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-destructive text-sm text-center"
                                        >
                                            {serverError}
                                        </motion.p>
                                    )}

                                    <Button 
                                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <ClipLoader size={16} color="#ffffff" />
                                                Signing in...
                                            </div>
                                        ) : (
                                            "Sign in"
                                        )}
                                    </Button>

                                </form>

                                <p className="mt-6 text-center text-sm text-muted-foreground">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="font-medium text-primary hover:text-primary/80">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
