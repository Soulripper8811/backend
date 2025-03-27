import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UrlForm from "@/components/UrlForm";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUrlStore } from "@/stores/useUrlStore";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [qrValue, setQrValue] = useState("");
  const { urls, getAllUrls, loadingUrl, deleteUrl } = useUrlStore(); // Added deleteUrl function
  const { authUser } = useAuthStore();

  useEffect(() => {
    getAllUrls();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">URL Shortener</h2>
      </div>

      <div className="mb-6">
        <UrlForm />
      </div>

      {loadingUrl ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Short URL</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {urls.length > 0 ? (
                urls.map((url) => (
                  <TableRow key={url.id}>
                    <TableCell className="font-medium">
                      {url.shortenedUrl}
                    </TableCell>
                    <TableCell>
                      {url.user ? url.user.name : "Unknown"} {/* Safe check */}
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        onClick={() => setQrValue(url.originalUrl)}
                      >
                        QR Code
                      </Button>
                      {authUser?.id === url.user?.id && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteUrl({ shortenedUrlId: url?.id })}
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No URLs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {qrValue && (
        <div className="flex justify-center mt-4 border p-4">
          <QRCodeSVG value={qrValue} size={200} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
