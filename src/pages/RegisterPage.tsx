import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import authService from "../services/auth.service";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { cn } from "../lib/utils";
import Seo from '../components/Seo';
import Text from "../components/ui/Text";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters").max(20, "Password must be less than 20 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters").max(20, "Confirm password must be less than 20 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type Inputs = z.infer<typeof schema>;

const RegisterPage: React.FC = () => {
    const [serverError, setServerError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
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
            const res = await authService.register({ name: data.name, email: data.email, password: data.password });
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
                setServerError(axiosErr.response?.data?.message || "Registration failed");
            } else {
                setServerError("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Seo title="Register | MediaShelf" description="Create your MediaShelf account." />
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
                                Start your journey with MediaShelf
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                Join thousands of users who trust MediaShelf for their media collection. Create your account and organize your digital library today.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right side - Register form */}
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
                                <h2 className="text-2xl font-semibold text-foreground">Create your account</h2>
                                <p className="text-muted-foreground mt-2">Join our growing community</p>
                            </div>

                            <div className="bg-card rounded-lg shadow-lg p-8">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                                                Name
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="name"
                                                    className={cn(
                                                        "w-full transition-all duration-200",
                                                        errors.name
                                                            ? "border-destructive focus-visible:ring-destructive pr-10"
                                                            : "focus-visible:ring-primary"
                                                    )}
                                                    placeholder="Enter your name"
                                                    type="text"
                                                    {...register('name')}
                                                />
                                                {errors.name && (
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            {errors.name && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-destructive text-sm mt-1.5 flex items-center gap-1.5"
                                                >
                                                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.name.message}
                                                </motion.p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                                                Email address
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="email"
                                                    className={cn(
                                                        "w-full transition-all duration-200",
                                                        errors.email
                                                            ? "border-destructive focus-visible:ring-destructive pr-10"
                                                            : "focus-visible:ring-primary"
                                                    )}
                                                    placeholder="Enter your email"
                                                    type="email"
                                                    {...register('email')}
                                                />
                                                {errors.email && (
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            {errors.email && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-destructive text-sm mt-1.5 flex items-center gap-1.5"
                                                >
                                                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.email.message}
                                                </motion.p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    className={cn(
                                                        "w-full transition-all duration-200",
                                                        errors.password
                                                            ? "border-destructive focus-visible:ring-destructive pr-10"
                                                            : "focus-visible:ring-primary"
                                                    )}
                                                    placeholder="Create a password"
                                                    type="password"
                                                    {...register("password")}
                                                />
                                                {errors.password && (
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            {errors.password && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-destructive text-sm mt-1.5 flex items-center gap-1.5"
                                                >
                                                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.password.message}
                                                </motion.p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="confirmPassword"
                                                    className={cn(
                                                        "w-full transition-all duration-200",
                                                        errors.confirmPassword
                                                            ? "border-destructive focus-visible:ring-destructive pr-10"
                                                            : "focus-visible:ring-primary"
                                                    )}
                                                    placeholder="Confirm your password"
                                                    type="password"
                                                    {...register("confirmPassword")}
                                                />
                                                {errors.confirmPassword && (
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            {errors.confirmPassword && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-destructive text-sm mt-1.5 flex items-center gap-1.5"
                                                >
                                                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.confirmPassword.message}
                                                </motion.p>
                                            )}
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
                                                Creating account...
                                            </div>
                                        ) : (
                                            "Create account"
                                        )}
                                    </Button>

                                </form>

                                <p className="mt-6 text-center text-sm text-muted-foreground">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                                        Sign in
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

export default RegisterPage;
