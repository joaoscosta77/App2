import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

function LocationPicker({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
}

export default function GISCropSuccessApp() {
  const [location, setLocation] = useState(null);
  const [crop, setCrop] = useState("");
  const [successRate, setSuccessRate] = useState(null);

  const handleAnalyze = () => {
    // Simulação de cálculo - substituído por chamada real no futuro
    const simulatedRate = Math.floor(Math.random() * 51) + 50; // 50-100%
    setSuccessRate({
      rate: simulatedRate,
      factors: [
        "pH do solo favorável",
        "Clima adequado",
        "Baixo risco de pragas",
      ],
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-4 space-y-4 bg-gray-100">
        <h1 className="text-xl font-bold">Análise de Sucesso Agrícola</h1>

        <div>
          <label className="block mb-1 font-medium">Localização</label>
          <p className="text-sm text-gray-500 mb-2">
            Clica no mapa para selecionar
          </p>
          {location && (
            <p className="text-sm">
              Lat: {location.lat.toFixed(4)} | Lng: {location.lng.toFixed(4)}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Cultura (opcional)</label>
          <Select onValueChange={setCrop}>
            <SelectTrigger>
              <SelectValue placeholder="Escolher cultura" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="milho">Milho</SelectItem>
              <SelectItem value="soja">Soja</SelectItem>
              <SelectItem value="trigo">Trigo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleAnalyze} disabled={!location}>
          Analisar Sucesso
        </Button>

        {successRate && (
          <Card className="mt-4">
            <CardContent className="space-y-2">
              <h2 className="text-lg font-semibold">Resultado</h2>
              <p className="text-2xl font-bold text-green-600">
                {successRate.rate}%
              </p>
              <ul className="list-disc list-inside text-sm">
                {successRate.factors.map((factor, index) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="w-2/3">
        <MapContainer
          center={[-33.4489, -70.6693]}
          zoom={6}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationPicker onSelect={setLocation} />
          {location && <Marker position={location} />}
        </MapContainer>
      </div>
    </div>
  );
}
