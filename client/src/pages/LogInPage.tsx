import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Updated path
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Import button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import card
import { LoginSchema } from "@/types/schema";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const naviagte = useNavigate();
  const { login, loading } = useAuthStore();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      await login(values);
      form.reset();
      naviagte("/");
    } catch (error: any) {
      toast.error(error.repsonse.data.message || "Something went wrong");
    }
  };

  return (
    <div className=" flex items-center justify-center  p-4 ">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogInPage;
