"use client";

import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PHONE_CODES } from "@/lib/phone-codes";

const participanteSchema = z.object({
  nombre: z.string().min(2, "Nombre requerido"),
  telefono_codigo: z.string().min(2, "Codigo requerido"),
  telefono_numero: z.string().min(6, "Telefono requerido").regex(/^[\d\s\-()]+$/, "Telefono no valido"),
});

const schema = z
  .object({
    reto_titulo: z.string().min(3, "Nombre del reto requerido"),
    reto_meta_diaria: z.string().min(5, "Meta diaria requerida"),
    reto_duracion: z.number().min(1, "Minimo 1 dia").max(365, "Maximo 365 dias"),
    nombre_apodo: z.string().min(2, "Ingresa tu nombre o apodo"),
    telefono_codigo: z.string().min(2, "Selecciona un codigo"),
    telefono_numero: z
      .string()
      .min(6, "Ingresa un numero valido")
      .regex(/^[\d\s\-()]+$/, "Numero no valido"),
    num_participantes: z.number().min(1).max(30),
    participantes: z.array(participanteSchema).min(1),
    consecuencia_monto: z.number().min(1000, "Minimo 1000"),
    consecuencia_frecuencia: z.string().min(3, "Selecciona frecuencia"),
  })
  .superRefine((data, ctx) => {
    if (data.participantes.length !== data.num_participantes) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Debes completar ${data.num_participantes} participantes`,
        path: ["participantes"],
      });
    }
  });

type FormData = z.infer<typeof schema>;

const fieldClass =
  "w-full rounded-xl border px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-[#F26430] focus:ring-2 focus:ring-[#F26430]/25";

const fieldStyle = {
  backgroundColor: "#FFFFFF",
  borderColor: "#DDD6C8",
  fontFamily: "var(--font-dm-sans)",
};

const labelClass = "mb-2 block text-sm font-medium text-gray-700";

function buildParticipantRows(
  count: number,
  current: { nombre: string; telefono_codigo: string; telefono_numero: string }[]
) {
  if (count <= 0) return [];
  return Array.from({ length: count }, (_, index) =>
    current[index] || { nombre: "", telefono_codigo: "+57", telefono_numero: "" }
  );
}

export function FormRetoPersonalizado() {
  const [estado, setEstado] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      telefono_codigo: "+57",
      num_participantes: 1,
      participantes: [{ nombre: "", telefono_codigo: "+57", telefono_numero: "" }],
      reto_duracion: 30,
      consecuencia_monto: 5000,
      consecuencia_frecuencia: "cada_falla",
    },
  });

  const numParticipantes = watch("num_participantes");
  const nombreApodo = watch("nombre_apodo");
  const telefonoCodigo = watch("telefono_codigo");
  const telefonoNumero = watch("telefono_numero");
  const safeCount = Math.max(1, Math.min(30, Number(numParticipantes) || 1));

  useEffect(() => {
    const current = getValues("participantes") || [];
    setValue("participantes", buildParticipantRows(safeCount, current), { shouldValidate: true });
  }, [safeCount, getValues, setValue]);

  useEffect(() => {
    const current = getValues("participantes") || [];
    if (current.length === 0) return;
    const next = [...current];
    next[0] = {
      nombre: nombreApodo || "",
      telefono_codigo: telefonoCodigo || "+57",
      telefono_numero: telefonoNumero || "",
    };
    setValue("participantes", next, { shouldValidate: true });
  }, [nombreApodo, telefonoCodigo, telefonoNumero, getValues, setValue]);

  async function getApiErrorMessage(res: Response) {
    try {
      const data = await res.json();
      if (data && typeof data.error === "string") return data.error;
    } catch {
      // ignore json parse errors
    }
    try {
      const text = await res.text();
      if (text) return text.slice(0, 180);
    } catch {
      // ignore text parse errors
    }
    return `Error ${res.status}`;
  }

  async function onSubmit(data: FormData) {
    setEstado("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/registrar-participante", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reto_slug: "personalizado",
          reto_titulo: data.reto_titulo,
          reto_meta_diaria: data.reto_meta_diaria,
          reto_duracion: data.reto_duracion,
          nombre_apodo: data.nombre_apodo,
          telefono_codigo: data.telefono_codigo,
          telefono_numero: data.telefono_numero,
          num_participantes: data.num_participantes,
          participantes: data.participantes,
          consecuencia_monto: data.consecuencia_monto,
          consecuencia_frecuencia: data.consecuencia_frecuencia,
        }),
      });

      if (!res.ok) {
        throw new Error(await getApiErrorMessage(res));
      }

      setEstado("success");
    } catch (err) {
      setEstado("error");
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado");
    }
  }

  if (estado === "success") {
    return (
      <div className="rounded-2xl border p-10 text-center" style={{ backgroundColor: "#FFFDF9", borderColor: "#E8DCCA" }}>
        <div className="mb-4 flex justify-center">
          <div className="rounded-2xl p-3" style={{ backgroundColor: "#FCEDE6" }}>
            <Rocket className="h-10 w-10" style={{ color: "#F26430" }} />
          </div>
        </div>
        <h3 className="mb-2 text-4xl uppercase" style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}>
          Reto creado
        </h3>
        <p className="text-gray-600" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Ya tenemos todo para crear el grupo de WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <section className="rounded-2xl border p-4 sm:p-6" style={{ borderColor: "#E9E1D4", backgroundColor: "#FFFCF8" }}>
        <h2 className="mb-4 text-3xl uppercase" style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}>
          1. Tu reto
        </h2>

        <div className="space-y-4">
          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>Nombre del reto *</label>
            <input {...register("reto_titulo")} placeholder="Ej: 30 dias sin azucar" className={fieldClass} style={fieldStyle} />
            {errors.reto_titulo && <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>{errors.reto_titulo.message}</p>}
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>Meta diaria *</label>
            <input {...register("reto_meta_diaria")} placeholder="Ej: Correr minimo 2 km diarios" className={fieldClass} style={fieldStyle} />
            {errors.reto_meta_diaria && <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>{errors.reto_meta_diaria.message}</p>}
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>Duracion (dias) *</label>
            <input {...register("reto_duracion", { valueAsNumber: true })} type="number" min={1} max={365} className={fieldClass} style={fieldStyle} />
            {errors.reto_duracion && <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>{errors.reto_duracion.message}</p>}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border p-4 sm:p-6" style={{ borderColor: "#E9E1D4", backgroundColor: "#FFFFFF" }}>
        <h2 className="mb-4 text-3xl uppercase" style={{ fontFamily: "var(--font-bebas)", color: "#1A1A1A" }}>
          2. Participantes y apuesta
        </h2>

        <div className="space-y-4">
          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>Nombre o apodo *</label>
            <input {...register("nombre_apodo")} placeholder="Tu nombre o apodo" className={fieldClass} style={fieldStyle} />
            {errors.nombre_apodo && <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>{errors.nombre_apodo.message}</p>}
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>WhatsApp *</label>
            <div className="grid grid-cols-5 gap-3">
              <select {...register("telefono_codigo")} className={`${fieldClass} col-span-2`} style={fieldStyle}>
                {PHONE_CODES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.label}
                  </option>
                ))}
              </select>
              <input
                {...register("telefono_numero")}
                type="tel"
                placeholder="3001234567"
                className={`${fieldClass} col-span-3`}
                style={fieldStyle}
              />
            </div>
            {(errors.telefono_codigo || errors.telefono_numero) && (
              <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {errors.telefono_codigo?.message || errors.telefono_numero?.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>Cantidad total de participantes *</label>
            <input {...register("num_participantes", { valueAsNumber: true })} type="number" min={1} max={30} className={fieldClass} style={fieldStyle} />
            {errors.num_participantes && <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>{errors.num_participantes.message}</p>}
          </div>

          <div>
            <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>
              Participantes ({safeCount}) *
            </label>
            <div className="space-y-3">
              {Array.from({ length: safeCount }).map((_, index) => (
                <div key={index} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    {...register(`participantes.${index}.nombre` as const)}
                    placeholder={`Nombre participante ${index + 1}`}
                    className={fieldClass}
                    style={fieldStyle}
                    readOnly={index === 0}
                  />
                  <div className="grid grid-cols-5 gap-2">
                    <select
                      {...register(`participantes.${index}.telefono_codigo` as const)}
                      className={`${fieldClass} col-span-2`}
                      style={fieldStyle}
                      disabled={index === 0}
                    >
                      {PHONE_CODES.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                    <input
                      {...register(`participantes.${index}.telefono_numero` as const)}
                      placeholder={`Telefono participante ${index + 1}`}
                      className={`${fieldClass} col-span-3`}
                      style={fieldStyle}
                      readOnly={index === 0}
                    />
                  </div>
                  {(errors.participantes?.[index]?.nombre ||
                    errors.participantes?.[index]?.telefono_codigo ||
                    errors.participantes?.[index]?.telefono_numero) && (
                    <p className="sm:col-span-2 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      {errors.participantes?.[index]?.nombre?.message ||
                        errors.participantes?.[index]?.telefono_codigo?.message ||
                        errors.participantes?.[index]?.telefono_numero?.message}
                    </p>
                  )}
                  {index === 0 && (
                    <p className="sm:col-span-2 text-xs text-gray-500" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      Participante 1 se completa automaticamente con tus datos.
                    </p>
                  )}
                </div>
              ))}
            </div>
            {errors.participantes?.message && (
              <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>{errors.participantes.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>Consecuencia economica (COP) *</label>
              <input {...register("consecuencia_monto", { valueAsNumber: true })} type="number" min={1000} step={1000} className={fieldClass} style={fieldStyle} />
              {errors.consecuencia_monto && <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>{errors.consecuencia_monto.message}</p>}
            </div>
            <div>
              <label className={labelClass} style={{ fontFamily: "var(--font-dm-sans)" }}>Frecuencia de inversion *</label>
              <select {...register("consecuencia_frecuencia")} className={fieldClass} style={fieldStyle}>
                <option value="cada_falla">Cada vez que falle</option>
                <option value="diaria">Diaria</option>
                <option value="semanal">Semanal</option>
              </select>
              {errors.consecuencia_frecuencia && <p className="mt-1 text-sm text-red-500" style={{ fontFamily: "var(--font-dm-sans)" }}>{errors.consecuencia_frecuencia.message}</p>}
            </div>
          </div>
        </div>
      </section>

      {errorMsg && (
        <div className="rounded-xl p-4 text-sm text-red-500" style={{ backgroundColor: "#FFF1F1", border: "1px solid #FECACA", fontFamily: "var(--font-dm-sans)" }}>
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={estado === "loading"}
        className="w-full rounded-xl py-4 text-lg font-bold text-white transition-all duration-200 hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:scale-100"
        style={{
          background: "linear-gradient(135deg, #F26430, #E03228)",
          fontFamily: "var(--font-dm-sans)",
          boxShadow: "0 14px 24px rgba(224,50,40,0.25)",
        }}
      >
        {estado === "loading" ? "Enviando..." : "Crear reto y grupo ->"}
      </button>
    </form>
  );
}
