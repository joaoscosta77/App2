from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/analisar")
def analisar(lat: float, lng: float, cultura: str = ""):
    # Simulação da lógica de análise
    taxa = 65 + (hash(cultura + str(lat)) % 35)
    fatores = ["Clima favorável", "Solo neutro", "Boa exposição solar"]
    return {"taxa_sucesso": taxa, "fatores": fatores}
