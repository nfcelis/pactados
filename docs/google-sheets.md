# Google Sheets (solo datos importantes)

Se guardan solo 9 columnas clave para operar el bot de WhatsApp.

## 1) Encabezados de la hoja `Registros`

Pon estos encabezados en **A1:I1** (exactamente):

1. `fecha_iso`
2. `reto_titulo`
3. `reto_meta_diaria`
4. `reto_duracion_dias`
5. `creador_nombre_apodo`
6. `creador_telefono`
7. `num_participantes`
8. `participantes_info`
9. `consecuencia_texto`

## 2) Apps Script (Code.gs)

```javascript
function doPost(e) {
  try {
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    const incomingSecret = (e && e.parameter && e.parameter.secret) || "";

    if (expectedSecret && incomingSecret !== expectedSecret) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const payload = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registros");
    if (!sheet) throw new Error("No existe la hoja 'Registros'");

    sheet.appendRow([
      payload.fecha_iso || "",
      payload.reto_titulo || "",
      payload.reto_meta_diaria || "",
      payload.reto_duracion_dias || "",
      payload.creador_nombre_apodo || "",
      payload.creador_telefono || "",
      payload.num_participantes || "",
      payload.participantes_info || "",
      payload.consecuencia_texto || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3) Variables de entorno

```bash
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/XXXX/exec"
GOOGLE_SHEETS_WEBHOOK_SECRET="tu_secreto"
```

