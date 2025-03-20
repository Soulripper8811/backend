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
import { useUrlStore } from "@/stores/useUrlStore";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [qrValue, setQrValue] = useState("");
  const { urls, getAllUrls, loadingUrl } = useUrlStore();
  console.log(urls);
  useEffect(() => {
    getAllUrls();
  }, []);

  if (loadingUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="text-center mx-auto">
        <h2 className="text-2xl font-bold"> Urls</h2>
      </div>
      <div className="border max-w-md mx-auto">
        <UrlForm />
      </div>
      <div className="max-w-4xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ShortUrl</TableHead>
              <TableHead>CretedBy</TableHead>
              <TableHead className="">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell className="font-medium">
                  {url.shortenedUrl}
                </TableCell>
                <TableCell>{url.user.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setQrValue(url.originalUrl);
                      }}
                    >
                      Qr code
                    </Button>
                    <Button>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {qrValue && (
        <div className="flex justify-center mt-4  border">
          <QRCodeSVG value={qrValue} size={400} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
