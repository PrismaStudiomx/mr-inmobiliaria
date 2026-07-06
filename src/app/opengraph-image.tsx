import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0B0B0B",
          color: "#FFFDF8",
          padding: "72px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C9A24A",
            marginBottom: 32,
          }}
        >
          MR Inmobiliaria
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          Compra, venta y renta de propiedades
        </div>

        <div
          style={{
            fontSize: 30,
            lineHeight: 1.4,
            color: "#F7F3EA",
            marginTop: 32,
            maxWidth: 900,
          }}
        >
          Asesoría profesional en Nuevo León, Tamaulipas, Yucatán, Campeche y Quintana Roo.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}