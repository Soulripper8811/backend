import { StoreUrlSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUrlStore } from "@/stores/useUrlStore";
import { z } from "zod";

const UrlForm = () => {
  const { storeUrl, loadingUrl, getAllUrls } = useUrlStore();

  const form = useForm<z.infer<typeof StoreUrlSchema>>({
    resolver: zodResolver(StoreUrlSchema),
    defaultValues: {
      originalUrl: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof StoreUrlSchema>) => {
    try {
      await storeUrl(data);
      form.reset();
      getAllUrls();

      // router("/");
    } catch (error) {
      console.error("Error in onSubmit", error);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-4 shadow-lg rounded-lg">
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Enter URL" {...form.register("originalUrl")} />
          <Button type="submit" className="w-full">
            {loadingUrl ? "Adding..." : "Add"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UrlForm;
